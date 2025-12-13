const fs = require('fs');
const path = require('path');

// Recursive copy function
function copyDir(src, dest) {
    // Create destination directory if it doesn't exist
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    // Read all files/folders in source
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// Copy images from public to .next/static/images
const publicImagesPath = path.join(__dirname, '..', 'public', 'images');
const nextStaticPath = path.join(__dirname, '..', '.next', 'static', 'images');

console.log('Copying images to Next.js static folder...');
console.log('From:', publicImagesPath);
console.log('To:', nextStaticPath);

try {
    if (fs.existsSync(publicImagesPath)) {
        copyDir(publicImagesPath, nextStaticPath);
        console.log('✓ Images copied successfully!');
    } else {
        console.log('⚠ Public images directory not found');
    }
} catch (error) {
    console.error('Error copying images:', error);
    process.exit(1);
}
