from fastapi import FastAPI, File, UploadFile, Request
from fastapi.responses import JSONResponse
from slowapi import Limiter
from slowapi.errors import RateLimitExceeded
import openai
import os
from dotenv import load_dotenv
import base64

# Load environment variables from .env file
load_dotenv()

# Initialize OpenAI API
openai.api_key = os.getenv("OPENAI_API_KEY")

prompt = '''
Analyze [STOCK/CRYPTO TICKER] or price action from the provided chart:

If TICKER is valid in the image given:

Current price, recent trends, and historical comparison.
Key financial ratios and insights (P/E, EPS, ROE, etc.).
Support/resistance levels and directional indicators.
20-day, 50-day, and 200-day SMAs with trend analysis.
Recent earnings, revenue growth, and EPS vs. estimates.
Industry comparison and peer standing.
Analyst ratings, target prices, upgrades/downgrades.
Major news affecting valuation.
Summary: Buy, Hold, or Sell with reasoning.

If the image is not a stock/crypto chart:
Provide an error message (e.g., 'Ticker not found. Please check the symbol.').

If TICKER symbol is not given and only chart is given:
Focus on price action, key levels (support/resistance), and trend analysis based on candlestick patterns, moving averages, and volume data."

Output Rules:

Always summarize each section in no more than 2 concise statements.
Ensure consistent formatting for readability.
If no valid data is available, state: 'Insufficient data to perform analysis.'
Example Output for a Valid Ticker:
Analysis for [TICKER] as of [DATE]:

Current Price and Trends: [Concise 2-sentence summary].
Key Financial Ratios: [Concise 2-sentence summary].
Technical Levels and Momentum: [Concise 2-sentence summary].
Analyst Sentiment and Risks: [Concise 2-sentence summary].
'''

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
        # Read the image file
        contents = await file.read()

        # Encode the image bytes to Base64
        image_base64 = base64.b64encode(contents).decode('utf-8')

        # Send the image to OpenAI for analysis
        response = openai.chat.completions.create(
            model="gpt-4o-mini",  # Use the appropriate model for image analysis
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{image_base64}"
                            },
                        },
                    ],
                }
            ],
            max_tokens=300,  # Adjust based on your needs
        )

        # Extract the analysis result from the response
        analysis_result = response.choices[0].message.content

        return {"analysis": analysis_result}

    except Exception as e:
        return JSONResponse(
            {"error": f"Failed to process image: {str(e)}"}, 
            status_code=500
        )

@app.get("/")
async def root():
    return {"message": "FastAPI server is running"}