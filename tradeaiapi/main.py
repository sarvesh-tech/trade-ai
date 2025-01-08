from fastapi import FastAPI, File, UploadFile, Request
from fastapi.responses import JSONResponse
from PIL import Image

from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

import io
from uuid import uuid4

limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.post("/process-image/")
@limiter.limit("6/minute")
async def process_image(request: Request, file: UploadFile = File(...)):  # Changed parameter name to 'file'
    print(f"Received file: {file.filename}")  # Updated to use 'file' instead of 'request'
    if not file.content_type.startswith("image/"):
        return JSONResponse({"error": "File is not an image"}, status_code=400)

    try:
        # Generate a unique ID for the image
        image_id = str(uuid4())

        # Save the image temporarily
        contents = await file.read()  # Updated to use 'file' instead of 'request'
        image = Image.open(io.BytesIO(contents))

        # Example: Simulate processing (replace with your actual image processing logic)
        # You can analyze the image here and generate results
        result = {
            "image_id": image_id,
            "width": image.width,
            "height": image.height,
            "message": "Image processed successfully"
        }

        return result

    except Exception as e:
        return JSONResponse({"error": f"Failed to process image: {str(e)}"}, status_code=500)

#tester route
@app.get("/")
async def root():
    return {"message": "FastAPI server is running"}
