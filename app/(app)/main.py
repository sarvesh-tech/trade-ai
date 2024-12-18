from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from PIL import Image
import io
from uuid import uuid4
import shutil

app = FastAPI()

@app.post("/process-image/")
async def process_image(file: UploadFile = File(...)):
    print(f"Received file: {file.filename}")
    if not file.content_type.startswith("image/"):
        return JSONResponse({"error": "File is not an image"}, status_code=400)

    try:
        # Generate a unique ID for the image
        image_id = str(uuid4())

        # Save the image temporarily
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))

        # Example: Simulate processing (replace with your actual image processing logic)
        # You can analyze the image here and generate results
        result = {
            "image_id": image_id,
            "width": image.width,
            "height": image.height,
            "message": "Image processed successfully"
        }

        # You can store the result, process it, or do whatever you need here
        # For simplicity, returning a processed result immediately

        return result

    except Exception as e:
        return JSONResponse({"error": f"Failed to process image: {str(e)}"}, status_code=500)
