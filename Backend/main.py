import os
import random
from dotenv import load_dotenv
from fastapi import FastAPI, Request, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse
from pydantic import BaseModel

# Load environment variables
load_dotenv()

# Initialize the API
app = FastAPI(title="E-Commerce API Architecture", version="1.0")

# --- CORS CONFIGURATION ---
# Allows your Netlify frontend to communicate with this server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace "*" with your GoDaddy domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- DATA MODELS ---
class OrderRequest(BaseModel):
    cart_items: list
    total_amount: float

# --- 1. SYSTEM HEALTH CHECK ---
@app.get("/")
async def root():
    return {"status": "Online", "message": "FastAPI mock backend is operational."}

# --- 2. FRONTEND API: CREATE ORDER ---
@app.post("/api/create-order")
async def create_order(order: OrderRequest):
    print(f"[ORDER] Checkout initiated for amount: ₹{order.total_amount}")
    
    # Mocking the Razorpay Order ID generation
    mock_order_id = f"order_mock_{random.randint(10000, 99999)}"
    
    return {
        "success": True,
        "order_id": mock_order_id
    }

# --- 3. RAZORPAY WEBHOOK LISTENER ---
@app.post("/webhooks/razorpay")
async def razorpay_webhook(request: Request):
    payload = await request.json()
    print(f"[RAZORPAY] Webhook event received: {payload.get('event')}")
    
    # TODO: Verify X-Razorpay-Signature header here
    # TODO: Update database status
    
    return {"status": "OK"}

# --- 4. WHATSAPP CLOUD API WEBHOOKS ---

# Meta verification (GET)
@app.get("/webhooks/whatsapp", response_class=PlainTextResponse)
async def verify_whatsapp(
    mode: str = Query(None, alias="hub.mode"),
    token: str = Query(None, alias="hub.verify_token"),
    challenge: str = Query(None, alias="hub.challenge")
):
    verify_token = os.getenv("WHATSAPP_VERIFY_TOKEN")
    
    if mode and token:
        if mode == "subscribe" and token == verify_token:
            print("[META] WhatsApp Webhook Verified.")
            # Meta requires the raw challenge string returned, not JSON
            return challenge
        else:
            raise HTTPException(status_code=403, detail="Verification token mismatch")
    raise HTTPException(status_code=400, detail="Missing parameters")

# Meta message receiver (POST)
@app.post("/webhooks/whatsapp")
async def receive_whatsapp(request: Request):
    print("[WHATSAPP] Incoming message payload detected.")
    
    # Read the raw JSON payload
    payload = await request.json()
    
    # Uncomment to inspect the full Meta payload matrix:
    # print(payload)
    
    # TODO: Parse 'entry[0].changes[0].value.messages' and trigger bot logic
    
    # Fast 200 OK to prevent Meta from retrying the webhook
    return {"status": "EVENT_RECEIVED"}