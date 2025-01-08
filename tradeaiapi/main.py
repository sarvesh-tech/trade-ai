from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from PIL import Image
import io
from uuid import uuid4

app = FastAPI()

@app.post("/process-image/")  # Ensure this is a POST method
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

        return result

    except Exception as e:
        return JSONResponse({"error": f"Failed to process image: {str(e)}"}, status_code=500)

#tester route yo
@app.get("/")
async def root():
    return {"message": "FastAPI server is running"}