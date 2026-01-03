import { Handler } from '@netlify/functions';
import crypto from 'crypto';

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    if (!RAZORPAY_KEY_SECRET) {
        return { statusCode: 500, body: 'Server Configuration Error' };
    }

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = JSON.parse(event.body || '{}');

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return { statusCode: 400, body: 'Missing required parameters' };
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            return {
                statusCode: 200,
                body: JSON.stringify({ status: 'success', verified: true })
            };
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({ status: 'failure', verified: false, error: 'Invalid Signature' })
            };
        }

    } catch (error) {
        console.error('Razorpay Verify Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Verification failed' })
        };
    }
};
