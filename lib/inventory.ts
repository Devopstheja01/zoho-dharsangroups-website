// This is a mock service to simulate fetching stock from a third-party API
// In a real app, this would make an HTTP request to the external inventory system

export async function checkStock(productId: string): Promise<number> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock logic: Randomly return stock between 0 and 50
    // For specific demo IDs, we can force values
    if (productId === 'w2') return 0; // Force out of stock for demo

    return Math.floor(Math.random() * 50);
}

export async function syncInventory() {
    console.log('Syncing inventory with external provider...');
    // Logic to update local database with external stock levels
    return true;
}
