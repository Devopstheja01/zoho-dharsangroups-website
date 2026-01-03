/**
 * Netlify Function: Fetch Products from Zoho Inventory
 * Endpoint: /.netlify/functions/zoho-products
 */

import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { fetchAllItems } from '../../lib/zoho-api';
import { mapZohoItemsToProducts } from '../../lib/zoho-mapper';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Content-Type': 'application/json',
    };

    // Handle preflight OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: '',
        };
    }

    // Only allow GET requests
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        console.log('Fetching items from Zoho Inventory...');

        // Fetch all items from Zoho
        const zohoItems = await fetchAllItems();

        console.log(`Fetched ${zohoItems.length} items from Zoho`);

        // Map to our Product interface
        const products = mapZohoItemsToProducts(zohoItems);

        // Filter out inactive items
        const activeProducts = products.filter(p => p.inStock || p.stockQuantity !== undefined);

        console.log(`Returning ${activeProducts.length} active products`);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                count: activeProducts.length,
                products: activeProducts,
                synced_at: new Date().toISOString(),
            }),
        };

    } catch (error: any) {
        console.error('Error fetching Zoho products:', error);

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                error: error.message || 'Failed to fetch products from Zoho',
                details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            }),
        };
    }
};

export { handler };
