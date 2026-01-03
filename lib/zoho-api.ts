/**
 * Zoho Inventory API Client Utilities
 * Handles authentication, token refresh, and API requests
 */

interface ZohoTokenResponse {
    access_token: string;
    expires_in: number;
    api_domain: string;
    token_type: string;
}

interface ZohoConfig {
    organizationId: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
    apiDomain: string;
}

// In-memory token cache (for serverless functions)
let cachedAccessToken: string | null = null;
let tokenExpiryTime: number = 0;

/**
 * Get Zoho configuration from environment variables
 */
export function getZohoConfig(): ZohoConfig {
    const config = {
        organizationId: process.env.ZOHO_ORGANIZATION_ID || '',
        clientId: process.env.ZOHO_CLIENT_ID || '',
        clientSecret: process.env.ZOHO_CLIENT_SECRET || '',
        refreshToken: process.env.ZOHO_REFRESH_TOKEN || '',
        apiDomain: process.env.ZOHO_API_DOMAIN || 'https://www.zohoapis.com',
    };

    // Validate required fields
    const missing = Object.entries(config)
        .filter(([_, value]) => !value)
        .map(([key]) => key);

    if (missing.length > 0) {
        throw new Error(`Missing Zoho configuration: ${missing.join(', ')}`);
    }

    return config;
}

/**
 * Get access token (refresh if needed)
 */
export async function getAccessToken(): Promise<string> {
    const now = Date.now();

    // Return cached token if still valid (with 5 min buffer)
    if (cachedAccessToken && tokenExpiryTime > now + 5 * 60 * 1000) {
        return cachedAccessToken;
    }

    // Refresh token
    const config = getZohoConfig();

    // Determine accounts domain based on API domain
    const accountsDomain = config.apiDomain.includes('.in')
        ? 'https://accounts.zoho.in'
        : config.apiDomain.includes('.eu')
            ? 'https://accounts.zoho.eu'
            : 'https://accounts.zoho.com';

    const params = new URLSearchParams({
        refresh_token: config.refreshToken,
        client_id: config.clientId,
        client_secret: config.clientSecret,
        grant_type: 'refresh_token',
    });

    const response = await fetch(`${accountsDomain}/oauth/v2/token?${params.toString()}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to refresh Zoho token: ${error}`);
    }

    const data: ZohoTokenResponse = await response.json();

    cachedAccessToken = data.access_token;
    tokenExpiryTime = now + data.expires_in * 1000;

    return cachedAccessToken;
}

/**
 * Make authenticated API request to Zoho Inventory
 */
export async function zohoRequest<T = any>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const config = getZohoConfig();
    const accessToken = await getAccessToken();

    const url = `${config.apiDomain}/inventory/v1${endpoint}${endpoint.includes('?') ? '&' : '?'
        }organization_id=${config.organizationId}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            'Authorization': `Zoho-oauthtoken ${accessToken}`,
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Zoho API error (${response.status}): ${error}`);
    }

    return response.json();
}

/**
 * Fetch all items from Zoho Inventory with pagination
 */
export async function fetchAllItems() {
    let allItems: any[] = [];
    let page = 1;
    let hasMorePages = true;

    while (hasMorePages) {
        const response = await zohoRequest(`/items?page=${page}&per_page=200`);

        if (response.items && response.items.length > 0) {
            allItems = allItems.concat(response.items);
            page++;

            // Check if there are more pages
            const pageContext = response.page_context;
            hasMorePages = pageContext && pageContext.has_more_page;
        } else {
            hasMorePages = false;
        }
    }

    return allItems;
}

/**
 * Get a single item by ID
 */
export async function getItemById(itemId: string) {
    const response = await zohoRequest(`/items/${itemId}`);
    return response.item;
}

/**
 * Create a sales order in Zoho
 */
export async function createSalesOrder(orderData: any) {
    const response = await zohoRequest('/salesorders', {
        method: 'POST',
        body: JSON.stringify(orderData),
    });
    return response.salesorder;
}

/**
 * Update item stock quantity
 */
export async function updateItemStock(itemId: string, quantity: number) {
    const response = await zohoRequest(`/items/${itemId}`, {
        method: 'PUT',
        body: JSON.stringify({
            stock_on_hand: quantity,
        }),
    });
    return response.item;
}
