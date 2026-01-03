/**
 * Netlify Function: Zoho Webhook Handler
 * Handles real-time updates from Zoho Inventory
 * Endpoint: /.netlify/functions/zoho-webhook
 */

import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
    };

    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        const webhookData = JSON.parse(event.body || '{}');

        console.log('Received Zoho webhook:', {
            event_type: webhookData.event_type,
            module: webhookData.module,
            timestamp: new Date().toISOString(),
        });

        // Process different webhook events
        switch (webhookData.event_type) {
            case 'item.created':
            case 'item.updated':
            case 'item.deleted':
                console.log(`Item ${webhookData.event_type}:`, webhookData.item_id);
                // In a production app, you might:
                // 1. Invalidate cache
                // 2. Trigger a re-fetch
                // 3. Update a database
                // 4. Send notifications
                break;

            case 'stock.updated':
                console.log('Stock updated:', {
                    item_id: webhookData.item_id,
                    new_stock: webhookData.stock_on_hand,
                });
                break;

            case 'salesorder.created':
                console.log('Sales order created:', webhookData.salesorder_id);
                break;

            default:
                console.log('Unhandled event type:', webhookData.event_type);
        }

        // Return success response
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Webhook processed successfully',
                event_type: webhookData.event_type,
            }),
        };

    } catch (error: any) {
        console.error('Error processing webhook:', error);

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                error: error.message || 'Failed to process webhook',
            }),
        };
    }
};

export { handler };
