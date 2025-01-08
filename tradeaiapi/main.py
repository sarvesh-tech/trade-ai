from fastapi import FastAPI, File, UploadFile, Request
from fastapi.responses import JSONResponse
from PIL import Image
from slowapi import Limiter
from slowapi.errors import RateLimitExceeded
import io
from uuid import uuid4

# Custom key function to get real IP address
def get_real_ip(request: Request) -> str:
    forwarded_for = request.headers.get("X-Forwarded-For")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    return request.client.host if request.client.host else "unknown"

limiter = Limiter(key_func=get_real_ip)
app = FastAPI()
app.state.limiter = limiter

# Fixed error handler without retry_after
@app.exception_handler(RateLimitExceeded)
async def custom_rate_limit_exceeded_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={
            "error": "Rate limit exceeded",
            "detail": "Too many requests. Please try again later.",
            "limit": "6 requests per minute"
        }
    )

@app.post("/process-image/")
@limiter.limit("6/minute")
async def process_image(request: Request, file: UploadFile = File(...)):
    client_ip = get_real_ip(request)
    print(f"Processing request from IP: {client_ip}")
    print(f"Received file: {file.filename}")
    
    if not file.content_type.startswith("image/"):
        return JSONResponse({"error": "File is not an image"}, status_code=400)

    try:
        image_id = str(uuid4())
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))

        result = {
            "image_id": image_id,
            "width": image.width,
            "height": image.height,
            "message": "Image processed successfully",
            "client_ip": client_ip
        }

        return result

    except Exception as e:
        return JSONResponse(
            {"error": f"Failed to process image: {str(e)}"}, 
            status_code=500
        )

@app.get("/")
async def root():
    return {"message": "FastAPI server is running"}