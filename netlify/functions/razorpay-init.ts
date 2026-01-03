import { Handler } from '@netlify/functions';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
        console.error('Razorpay keys missing in environment variables');
        return { statusCode: 500, body: 'Server Configuration Error' };
    }

    try {
        const { amount, currency = 'INR', receipt } = JSON.parse(event.body || '{}');

        if (!amount) {
            return { statusCode: 400, body: 'Amount is required' };
        }

        // Razorpay API Basic Auth
        const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');

        const response = await fetch('https://api.razorpay.com/v1/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            },
            body: JSON.stringify({
                amount: Math.round(amount * 100), // Convert to paise
                currency,
                receipt,
                payment_capture: 1
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Razorpay API Error:', data);
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: data.error })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };

    } catch (error) {
        console.error('Razorpay Init Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to create order' })
        };
    }
};
