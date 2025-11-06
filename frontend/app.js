from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import shutil
import os
from utils.ocr import extract_text_and_dob
from utils.age_check import is_above_18
from utils.face_compare import compare_faces

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "temp_uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/api/verify")
async def verify_identity(
    aadhar_image: UploadFile = File(...),
    selfie_image: UploadFile = File(...)
):
    try:
        # Save uploaded files temporarily
        aadhar_path = os.path.join(UPLOAD_DIR, f"aadhar_{aadhar_image.filename}")
        selfie_path = os.path.join(UPLOAD_DIR, f"selfie_{selfie_image.filename}")
        
        with open(aadhar_path, "wb") as buffer:
            shutil.copyfileobj(aadhar_image.file, buffer)
        
        with open(selfie_path, "wb") as buffer:
            shutil.copyfileobj(selfie_image.file, buffer)
        
        # Extract DOB from Aadhar
        text, dob = extract_text_and_dob(aadhar_path)
        
        if not dob:
            raise HTTPException(status_code=400, detail="Could not extract DOB from Aadhar card")
        
        # Check age
        is_adult = is_above_18(dob)
        
        # Compare faces
        try:
            similarity_score = compare_faces(aadhar_path, selfie_path)
            face_match = similarity_score > 0.6  # Threshold
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
        
        # Clean up temp files
        os.remove(aadhar_path)
        os.remove(selfie_path)
        
        return JSONResponse({
            "success": True,
            "dob": dob,
            "is_adult": is_adult,
            "face_match": face_match,
            "similarity_score": float(similarity_score),
            "age_verified": is_adult and face_match
        })
        
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": str(e)}
        )

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
