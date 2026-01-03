/**
 * Netlify Function: Create Sales Order in Zoho
 * Endpoint: /.netlify/functions/zoho-create-order
 */

import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { createSalesOrder } from '../../lib/zoho-api';

interface OrderItem {
    product_id: string;
    zoho_item_id?: string;
    name: string;
    quantity: number;
    price: number;
}

interface OrderRequest {
    customer_name: string;
    customer_email: string;
    customer_phone?: string;
    shipping_address?: {
        address: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    items: OrderItem[];
    notes?: string;
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        const orderData: OrderRequest = JSON.parse(event.body || '{}');

        // Validate required fields
        if (!orderData.customer_name || !orderData.customer_email || !orderData.items || orderData.items.length === 0) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    success: false,
                    error: 'Missing required fields: customer_name, customer_email, items',
                }),
            };
        }

        // Map order items to Zoho format
        const lineItems = orderData.items.map(item => ({
            item_id: item.zoho_item_id || '', // Must have Zoho item ID
            name: item.name,
            rate: item.price,
            quantity: item.quantity,
            discount: 0,
        }));

        // Prepare Zoho sales order data
        const zohoOrderData = {
            customer_name: orderData.customer_name,
            contact_persons: [{
                email: orderData.customer_email,
                phone: orderData.customer_phone || '',
            }],
            line_items: lineItems,
            notes: orderData.notes || `Order from DharsanGroups E-commerce`,
            shipping_address: orderData.shipping_address ? {
                address: orderData.shipping_address.address,
                city: orderData.shipping_address.city,
                state: orderData.shipping_address.state,
                zip: orderData.shipping_address.zip,
                country: orderData.shipping_address.country,
            } : undefined,
        };

        console.log('Creating sales order in Zoho...');

        const salesOrder = await createSalesOrder(zohoOrderData);

        console.log('Sales order created:', salesOrder.salesorder_number);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                order: {
                    zoho_order_id: salesOrder.salesorder_id,
                    order_number: salesOrder.salesorder_number,
                    total: salesOrder.total,
                    status: salesOrder.status,
                },
            }),
        };

    } catch (error: any) {
        console.error('Error creating sales order:', error);

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                error: error.message || 'Failed to create sales order',
            }),
        };
    }
};

export { handler };
