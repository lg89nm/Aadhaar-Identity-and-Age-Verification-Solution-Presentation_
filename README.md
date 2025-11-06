🔐 Aadhar-Based Identity and Age Verification System
A full-stack application that verifies user identity and age by extracting information from Aadhar cards and comparing facial features using advanced ML models.
📋 Table of Contents

Features
Demo
Architecture
Tech Stack
Prerequisites
Installation
Usage
API Documentation
Project Structure
How It Works
Configuration
Troubleshooting
Contributing
License
Acknowledgments

✨ Features

📷 Live Webcam Capture - Capture selfies directly from browser
🎯 Face Detection & Matching - Uses FaceNet (PyTorch) with MTCNN for accurate face comparison
🔍 OCR Extraction - Extracts Date of Birth from Aadhar cards using Tesseract OCR
✅ Age Verification - Automatically checks if user is 18 years or older
🎨 Modern UI - Beautiful, responsive React interface with Tailwind CSS
🚀 Fast API Backend - RESTful API built with FastAPI
🔒 Privacy First - All processing done locally, no data stored permanently
⚡ Real-time Feedback - Instant verification results with detailed metrics

🎥 Demo
Show Image
🏗️ Architecture
┌─────────────┐         HTTP/REST          ┌─────────────┐
│             │ ◄──────────────────────── │             │
│   React     │                            │   FastAPI   │
│  Frontend   │ ─────────────────────────► │   Backend   │
│             │         JSON/Files         │             │
└─────────────┘                            └──────┬──────┘
                                                  │
                                                  │
                                    ┌─────────────┴─────────────┐
                                    │                           │
                              ┌─────▼─────┐            ┌────────▼────────┐
                              │ Tesseract │            │   FaceNet +     │
                              │    OCR    │            │      MTCNN      │
                              └───────────┘            └─────────────────┘
🛠️ Tech Stack
Frontend

React 18+ - UI framework
Tailwind CSS - Styling
Lucide React - Icons
Axios - HTTP client

Backend

FastAPI - Web framework
PyTorch - Deep learning framework
FaceNet (facenet-pytorch) - Face recognition
MTCNN - Face detection
Tesseract OCR - Text extraction
OpenCV - Image processing
Pillow - Image handling

📦 Prerequisites
Before you begin, ensure you have the following installed:

Python 3.10 or higher
Node.js 16+ and npm
Tesseract OCR - Download here
Git - For cloning the repository
Webcam - For capturing selfies

Install Tesseract OCR
Windows:

Download installer from GitHub
Install to C:\Program Files\Tesseract-OCR
Add to PATH or update path in backend/utils/ocr.py

macOS:
bashbrew install tesseract
Linux (Ubuntu/Debian):
bashsudo apt-get update
sudo apt-get install tesseract-ocr
🚀 Installation
1. Clone the Repository
bashgit clone https://github.com/yourusername/aadhar-verification.git
cd aadhar-verification
2. Backend Setup
bashcd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
backend/requirements.txt:
txtfastapi==0.104.1
uvicorn==0.24.0
python-multipart==0.0.6
torch==2.1.0
torchvision==0.16.0
facenet-pytorch==2.5.3
opencv-python==4.8.1.78
pytesseract==0.3.10
Pillow==10.1.0
numpy==1.24.3
3. Frontend Setup
bashcd ../frontend

# Install dependencies
npm install
4. Configure Tesseract Path
Update the Tesseract path in backend/utils/ocr.py:
python# Windows
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# macOS/Linux
pytesseract.pytesseract.tesseract_cmd = r"/usr/local/bin/tesseract"
🎯 Usage
Start the Backend Server
bashcd backend
python app.py
The API will be available at http://localhost:8000
Start the Frontend Development Server
Open a new terminal:
bashcd frontend
npm start
The React app will open at http://localhost:3000
Using the Application

Upload Aadhar Card - Click on the upload area and select your Aadhar card image
Capture Selfie - Click "Click to open camera" and allow camera permissions
Take Photo - Click "Capture" when ready
Verify - Click "Verify Identity" to process
View Results - See verification status, age check, and face match score

📚 API Documentation
Base URL
http://localhost:8000
Endpoints
1. Health Check
httpGET /api/health
Response:
json{
  "status": "ok"
}
2. Verify Identity
httpPOST /api/verify
Request:

Content-Type: multipart/form-data
Body:

aadhar_image: File (JPG/PNG)
selfie_image: File (JPG/PNG)



Success Response (200):
json{
  "success": true,
  "dob": "15/08/1995",
  "is_adult": true,
  "face_match": true,
  "similarity_score": 0.8542,
  "age_verified": true
}
Error Response (400/500):
json{
  "success": false,
  "error": "Could not extract DOB from Aadhar card"
}
Interactive API Docs
Once the backend is running, visit:

Swagger UI: http://localhost:8000/docs
ReDoc: http://localhost:8000/redoc

📁 Project Structure
aadhar-verification/
│
├── backend/
│   ├── app.py                      # FastAPI application
│   ├── requirements.txt            # Python dependencies
│   ├── temp_uploads/               # Temporary file storage (auto-created)
│   └── utils/
│       ├── __init__.py
│       ├── age_check.py            # Age verification logic
│       ├── face_compare.py         # Face embedding & similarity
│       ├── face_detect.py          # MTCNN face detection
│       └── ocr.py                  # Tesseract OCR for DOB extraction
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js                  # Main React component
│   │   ├── index.js                # React entry point
│   │   └── index.css               # Tailwind styles
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
├── LICENSE
└── README.md
🔍 How It Works
1. OCR Processing (backend/utils/ocr.py)
python# Extracts text from Aadhar card
# Searches for DOB pattern: DD/MM/YYYY
# Returns extracted DOB string
2. Age Verification (backend/utils/age_check.py)
python# Parses DOB string to date object
# Calculates age from current date
# Returns True if age >= 18
3. Face Detection (backend/utils/face_detect.py)
python# Uses MTCNN to detect faces
# Extracts face region from image
# Returns normalized face tensor (160x160)
4. Face Comparison (backend/utils/face_compare.py)
python# Generates embeddings using FaceNet (512-dimensional)
# Calculates cosine similarity between embeddings
# Returns similarity score (0-1 range)
# Threshold: 0.6 for match
Face Matching Algorithm

Face Detection: MTCNN detects face bounding boxes
Alignment: Faces are aligned and resized to 160×160
Embedding: FaceNet generates 512-dimensional embeddings
Similarity: Cosine similarity computed between embeddings
Decision: Score > 0.6 indicates a match
