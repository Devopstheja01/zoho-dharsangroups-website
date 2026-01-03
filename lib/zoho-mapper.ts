/**
 * Maps Zoho Inventory items to our Product interface
 */

import { Product } from './data';

/**
 * Determine product category based on Zoho item data
 * You can customize this logic based on how you organize products in Zoho
 */
function determineCategory(zohoItem: any): 'men' | 'women' {
    // Strategy 0: Check SKU (Highest Priority)
    const sku = (zohoItem.sku || '').toUpperCase();
    if (sku.startsWith('MEN') || sku.includes('-MEN-')) return 'men';
    if (sku.startsWith('WOM') || sku.includes('-WOM-')) return 'women';

    // Strategy 1: Check custom fields
    if (zohoItem.custom_fields) {
        const genderField = zohoItem.custom_fields.find(
            (f: any) => f.label?.toLowerCase().includes('gender') || f.label?.toLowerCase().includes('category')
        );
        if (genderField) {
            const value = genderField.value?.toLowerCase();
            if (value?.includes('women') || value?.includes('female')) return 'women';
            if (value?.includes('men') || value?.includes('male')) return 'men';
        }
    }

    // Strategy 2: Check item group/category name
    const categoryName = (zohoItem.category_name || zohoItem.item_group_name || '').toLowerCase();
    if (categoryName.includes('women') || categoryName.includes('ladies') || categoryName.includes('saree')) {
        return 'women';
    }
    if (categoryName.includes('men') || categoryName.includes('gents')) {
        return 'men';
    }

    // Strategy 3: Check tags
    if (zohoItem.tags) {
        const tags = Array.isArray(zohoItem.tags) ? zohoItem.tags : [zohoItem.tags];
        const tagsStr = tags.join(' ').toLowerCase();
        if (tagsStr.includes('women') || tagsStr.includes('ladies')) return 'women';
        if (tagsStr.includes('men') || tagsStr.includes('gents')) return 'men';
    }

    // Strategy 4: Check product name
    const name = (zohoItem.name || '').toLowerCase();
    if (name.includes('saree') || name.includes('kurti') || name.includes('lehenga') || name.includes('anarkali')) {
        return 'women';
    }
    if (name.includes('shirt') || name.includes('pant') || name.includes('trouser') || name.includes('sherwani')) {
        return 'men';
    }

    // Default to men if undetermined
    return 'men';
}

/**
 * Extract subcategory from Zoho item
 */
function getSubcategory(zohoItem: any): string {
    // Use category name if available
    if (zohoItem.category_name) {
        return zohoItem.category_name;
    }

    // Use item group name
    if (zohoItem.item_group_name) {
        return zohoItem.item_group_name;
    }

    // Parse from item type
    if (zohoItem.item_type) {
        return zohoItem.item_type;
    }

    // Try to infer from name
    const name = (zohoItem.name || '').toLowerCase();
    if (name.includes('shirt')) return 'Shirts';
    if (name.includes('pant') || name.includes('trouser')) return 'Pants';
    if (name.includes('saree')) return 'Sarees';
    if (name.includes('dress')) return 'Dresses';
    if (name.includes('kurti')) return 'Kurtis';
    if (name.includes('jacket')) return 'Jackets';
    if (name.includes('ethnic') || name.includes('kurta')) return 'Ethnic';
    if (name.includes('wedding') || name.includes('sherwani') || name.includes('lehenga')) return 'Wedding';

    return 'General';
}

/**
 * Get product images from Zoho item
 */
function getImages(zohoItem: any): { image: string; images?: string[] } {
    const defaultImage = 'https://placehold.co/400x600/1a1a1a/FFF?text=No+Image';

    // Check for image_url or image_name
    if (zohoItem.image_url) {
        return {
            image: zohoItem.image_url,
            images: [zohoItem.image_url],
        };
    }

    if (zohoItem.image_name && zohoItem.image_document_id) {
        // Zoho stores images with document IDs - construct URL
        const imageUrl = `${process.env.ZOHO_API_DOMAIN}/inventory/v1/items/${zohoItem.item_id}/image`;
        return {
            image: imageUrl,
            images: [imageUrl],
        };
    }

    // Check for multiple images
    if (zohoItem.images && Array.isArray(zohoItem.images)) {
        const imageUrls = zohoItem.images
            .filter((img: any) => img.url)
            .map((img: any) => img.url);

        if (imageUrls.length > 0) {
            return {
                image: imageUrls[0],
                images: imageUrls,
            };
        }
    }

    return { image: defaultImage };
}

/**
 * Map Zoho Inventory item to our Product interface
 */
export function mapZohoItemToProduct(zohoItem: any): Product {
    const category = determineCategory(zohoItem);
    const { image, images } = getImages(zohoItem);

    return {
        id: `zoho_${zohoItem.item_id}`,
        name: zohoItem.name || 'Unnamed Product',
        price: parseFloat(zohoItem.rate || zohoItem.selling_price || '0'),
        originalPrice: zohoItem.purchase_rate ? parseFloat(zohoItem.purchase_rate) : undefined,
        category,
        subcategory: getSubcategory(zohoItem),
        image,
        images,
        description: zohoItem.description || undefined,
        brand: zohoItem.brand || undefined,
        sku: zohoItem.sku || zohoItem.item_id,
        inStock: (zohoItem.stock_on_hand || 0) > 0 && zohoItem.status === 'active',
        stockQuantity: zohoItem.stock_on_hand || 0,
        onlineSales: 0, // We'll track this separately
        offlineSales: 0, // We'll track this separately

        // Additional fields from Zoho
        zoho_item_id: zohoItem.item_id,
        zoho_sku: zohoItem.sku,
        zoho_category_id: zohoItem.category_id,
        last_synced: new Date().toISOString(),

        // Optional fields
        sizes: zohoItem.attributes?.find((a: any) => a.name?.toLowerCase() === 'size')?.values || undefined,
        colors: zohoItem.attributes?.find((a: any) => a.name?.toLowerCase() === 'color')?.values || undefined,
        rating: undefined, // Not available in Zoho, keep local
        reviewCount: undefined,
        customStitchingAvailable: false, // Set based on custom field if needed
    };
}

/**
 * Map multiple Zoho items to products
 */
export function mapZohoItemsToProducts(zohoItems: any[]): Product[] {
    return zohoItems.map(mapZohoItemToProduct);
}

/**
 * Filter Zoho items by category
 */
export function filterItemsByCategory(
    products: Product[],
    category: 'men' | 'women'
): Product[] {
    return products.filter(p => p.category === category);
}
