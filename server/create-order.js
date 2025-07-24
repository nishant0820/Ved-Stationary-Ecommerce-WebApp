//  /server/api.js
import express from 'express';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import cors from 'cors';

const app = express();

// CORS configuration with optimized settings
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173', 'https://ved-stationary-ecommerce-web-app.vercel.app'],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Optimize JSON parsing
app.use(express.json({ limit: '10mb' }));

// Add compression for better performance
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache');
  next();
});

dotenv.config();

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error('Razorpay credentials missing in environment variables');
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET

});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Razorpay server is running' });
});

// Create order endpoint
app.post('/create-order/api', async (req, res) => {
  try {
    const startTime = Date.now();
    const { amount, currency = 'INR', receipt } = req.body;

    // Validate input
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount provided' });
    }

    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: {
        created_at: new Date().toISOString()
      }
    };

    console.log('Creating Razorpay order with options:', options);
    const order = await razorpay.orders.create(options);
    
    const endTime = Date.now();
    console.log(`Order created successfully in ${endTime - startTime}ms:`, order.id);
    
    res.json(order);
  } catch (error) {
    console.error('Razorpay order error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/create-order/validate" , async(req , res) =>{
  try {
    const {razorpay_order_id, razorpay_payment_id , razorpay_signature} = req.body ;
    
    console.log('Validation request received:', {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    });

    const sha = crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET );

    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)
    const digest = sha.digest("hex");
    
    if(digest !== razorpay_signature){
      console.log('Payment validation failed');
      return res.status(400).json({msg : "Transaction is not valid!"})
    }

    console.log('Payment validated successfully');
    res.json({
      msg : "success",
      orderID: razorpay_order_id,
      paymentId : razorpay_payment_id
    })

  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({ error: error.message });
  }
})

// Start server
const PORT = process.env.CREATE_ORDER_PORT;
app.listen(PORT, () => {
  console.log(`Razorpay API server running on port ${PORT}`);
});