import os
import random
import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, Request, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Initialize Environment
load_dotenv()

app = FastAPI(title="Stark E-Commerce Backend", version="1.0")

# --- CORS CONFIGURATION (THE BRIDGE) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to "https://your-netlify-domain.com"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- DATA MODELS ---
class OrderRequest(BaseModel):
    cart_items: list
    total_amount: float

# --- TELEGRAM ENGINE ---
async def send_telegram_alert(chat_id: int, message_text: str):
    bot_token = os.getenv("TELEGRAM_BOT_TOKEN")
    if not bot_token:
        print("[SYSTEM ERROR] Telegram token missing.")
        return

    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    payload = {"chat_id": chat_id, "text": message_text}

    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=payload)
        if response.status_code == 200:
            print(f"[JARVIS] Alert successfully transmitted to Admin.")
        else:
            print(f"[SYSTEM ERROR] Transmission failed: {response.text}")

# --- SYSTEM HEALTH ---
@app.get("/")
async def root():
    return {"status": "Online", "system": "FastAPI Core Active"}

# --- THE CHECKOUT ENDPOINT ---
@app.post("/api/create-order")
async def create_order(order: OrderRequest, background_tasks: BackgroundTasks):
    print(f"[ORDER DETECTED] Amount: ₹{order.total_amount}")
    
    # 1. Generate Mock Razorpay ID
    mock_order_id = f"pay_mock_{random.randint(100000, 999999)}"
    
    # 2. Trigger Telegram Admin Alert
    admin_id = os.getenv("ADMIN_CHAT_ID")
    if admin_id:
        items_str = ", ".join(order.cart_items)
        alert_text = f"🚨 *NEW ORDER RECEIVED*\n\n🛒 Items: {items_str}\n💰 Total: ₹{order.total_amount}\n🧾 Order ID: {mock_order_id}"
        background_tasks.add_task(send_telegram_alert, int(admin_id), alert_text)
    
    # 3. Respond to Frontend
    return {
        "success": True,
        "order_id": mock_order_id
    }