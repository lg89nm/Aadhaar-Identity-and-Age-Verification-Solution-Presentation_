# 🛂 Aadhar-Based Identity and Age Verification App

This application verifies user identity by:
1. Extracting the user's Date of Birth (DOB) from an uploaded Aadhar card using OCR (Tesseract)
2. Capturing a live selfie via webcam
3. Detecting and comparing faces between Aadhar and selfie images using FaceNet (facenet-pytorch)
4. Providing real-time feedback on image clarity and lighting
5. Checking if the user is 18 years or older

## ✅ Features

* 📷 Webcam Selfie Capture
* 🧠 Face Detection + Matching (via PyTorch MTCNN + FaceNet)
* 🔍 DOB Extraction using Tesseract OCR
* ⚠️ Warnings for blurry or dark selfies
* 🎨 Available in both Streamlit and React versions

## 🧠 How It Works

* Users upload an image of their Aadhar card
* Users take a live selfie
* The system:
   * Extracts DOB from Aadhar
   * Verifies age (>=18)
   * Detects and compares faces
   * Shows face match confidence

## 📦 Setup Instructions

### ✅ Prerequisites

* Python 3.10+
* Node.js 16+ (for React version)
* Anaconda (recommended)
* Tesseract OCR installed from [here](https://github.com/tesseract-ocr/tesseract)

After installing Tesseract, update the path in `ocr.py` if needed.

### 🧰 Backend Setup

Create & activate environment:

```bash
conda env create -f environment.yml
conda activate zynga_env
```

Or install manually:
```bash
pip install torch torchvision torchaudio facenet-pytorch opencv-python pytesseract streamlit fastapi uvicorn python-multipart
```

### 🚀 Run the App

**Option 1: Streamlit Version (Original)**
```bash
streamlit run main.py
```
Then open your browser at http://localhost:8501

**Option 2: React + FastAPI Version**

Terminal 1 - Start Backend:
```bash
cd backend
python app.py
```
Backend runs on http://localhost:8000

Terminal 2 - Start Frontend:
```bash
cd frontend
npm install
npm start
```
Frontend runs on http://localhost:3000

## 📁 Folder Structure

### Streamlit Version
```
Zynga/
│
├── main.py                      # Streamlit frontend
├── environment.yml   
├── utils/
│   ├── age_check.py             # Age verification logic
│   ├── face_compare.py          # Embedding + similarity logic
│   ├── face_detect.py           # Face extraction using MTCNN
│   ├── ocr.py                   # OCR to extract DOB
```

### React Version
```
project/
│
├── backend/
│   ├── app.py                   # FastAPI server
│   ├── requirements.txt
│   └── utils/                   # Same utility files as above
│
└── frontend/
    ├── src/
    │   └── App.js               # React UI component
    ├── package.json
    └── public/
```

## ⚠️ Notes

* Make sure your webcam permissions are enabled in your browser
* Tesseract must be installed and its path set correctly
* No personal data is stored — everything is done locally for demo purposes
* For React version, ensure CORS is configured properly in `backend/app.py`
