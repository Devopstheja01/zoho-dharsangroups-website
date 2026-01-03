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

// In-memory token cache (keyed by domain)
const tokenCache: Record<string, { token: string; expiry: number }> = {};

/**
 * Get Zoho configuration
 */
export function getZohoConfig() {
    return {
        organizationId: process.env.ZOHO_ORGANIZATION_ID || '',
        clientId: process.env.ZOHO_CLIENT_ID || '',
        clientSecret: process.env.ZOHO_CLIENT_SECRET || '',
        refreshToken: process.env.ZOHO_REFRESH_TOKEN || '',
        // Default to .com, but allow override
        apiDomain: process.env.ZOHO_API_DOMAIN || 'https://www.zohoapis.com',
    };
}

/**
 * Get access token for a specific domain
 */
async function getAccessTokenForDomain(domain: string): Promise<string> {
    const now = Date.now();
    const cache = tokenCache[domain];

    // Return cached token if valid
    if (cache && cache.expiry > now + 300000) {
        return cache.token;
    }

    const config = getZohoConfig();

    // Convert API domain to Accounts domain
    // .com -> accounts.zoho.com
    // .in -> accounts.zoho.in
    const tld = domain.split('.').pop(); // 'com' or 'in' etc
    const accountsDomain = `https://accounts.zoho.${tld}`;

    console.log(`Refreshing token for DC: ${domain} (Auth: ${accountsDomain})`);

    const params = new URLSearchParams({
        refresh_token: config.refreshToken,
        client_id: config.clientId,
        client_secret: config.clientSecret,
        grant_type: 'refresh_token',
    });

    const response = await fetch(`${accountsDomain}/oauth/v2/token?${params.toString()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (!response.ok) {
        throw new Error(`Auth failed for ${domain}: ${await response.text()}`);
    }

    const data: ZohoTokenResponse = await response.json();

    if (data.access_token) {
        tokenCache[domain] = {
            token: data.access_token,
            expiry: now + (data.expires_in * 1000)
        };
        return data.access_token;
    }

    throw new Error(`No access token returned for ${domain}. Response: ${JSON.stringify(data)}`);
}

/**
 * Make authenticated API request with Auto-DC-Switching
 */
export async function zohoRequest<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const config = getZohoConfig();

    // Strategy: Try Configured Domain -> If Code 57 -> Try Alternative
    let currentDomain = config.apiDomain;
    let attempts = 0;
    const maxAttempts = 2; // Try primary, then secondary

    while (attempts < maxAttempts) {
        try {
            attempts++;
            const accessToken = await getAccessTokenForDomain(currentDomain);

            const url = `${currentDomain}/inventory/v1${endpoint}${endpoint.includes('?') ? '&' : '?'}organization_id=${config.organizationId}`;

            const response = await fetch(url, {
                ...options,
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            });

            const data = await response.json();

            // CHECK FOR CODE 57 (Org Mismatch / DC Mismatch)
            if (data.code === 57) {
                console.warn(`Org ID mismatch on ${currentDomain} (Code 57).`);

                // If we haven't tried the alternative yet, switch and retry
                if (attempts < maxAttempts) {
                    const altDomain = currentDomain.includes('.com')
                        ? 'https://www.zohoapis.in'
                        : 'https://www.zohoapis.com';

                    console.log(`Swapping DC: ${currentDomain} -> ${altDomain} and retrying...`);
                    currentDomain = altDomain;
                    continue; // Retry loop with new domain
                }
            }

            // Other errors or Success
            if (data.code && data.code !== 0) {
                throw new Error(`Zoho API Error (${data.code}): ${data.message}`);
            }

            return data;

        } catch (error: any) {
            // If it's the last attempt, throw
            if (attempts >= maxAttempts) throw error;
            console.error(`Attempt ${attempts} failed:`, error);
        }
    }

    throw new Error('All Data Center attempts failed');
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
