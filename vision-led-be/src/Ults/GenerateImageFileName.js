function generateImageFileName() {
    const uniqueId = Date.now().toString(36);
    const randomString = Math.random().toString(36).substring(2, 8);
    return `image-${uniqueId}-${randomString}.jpg`;
}

module.exports = generateImageFileName;