//  /server/api.js
import express from 'express';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error('Razorpay credentials missing in environment variables');
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET

});

// Create order endpoint
app.post('/create-order/api', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;

    const options = {
      // amount: amount * 100, // Convert to paise
      amount: Math.round(amount*100), // Convert to paise
      currency,
      receipt:`rcpt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Razorpay order error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/create-order/validate" , async(req , res) =>{

const {razorpay_order_id, razorpay_payment_id , razorpay_signature} = req.body ;

const sha = crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET );

sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)
const digest = sha.digest("hex");
if(digest !== razorpay_signature){
  return res.status(400).json({msg : "Transaction is not valid!"})
}

res.json({
  msg : "success",
  orderID: razorpay_order_id,
  paymentId : razorpay_payment_id
})


})

// Start server
const PORT = process.env.CREATE_ORDER_PORT;
app.listen(PORT, () => {
  console.log(`Razorpay API server running on port ${PORT}`);
});