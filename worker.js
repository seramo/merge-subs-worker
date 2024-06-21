/**
 * Cloudflare Worker to Merged Subscription URLs
 * Author: SeRaMo ( https://github.com/seramo/ )
 */

addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    // Define an array of subscription URLs
    const subscriptionUrls = [
        'https://raw.githubusercontent.com/yebekhe/TelegramV2rayCollector/main/sub/normal/donated',
        'https://raw.githubusercontent.com/yebekhe/TelegramV2rayCollector/main/sub/normal/vmess',
        'https://raw.githubusercontent.com/yebekhe/TelegramV2rayCollector/main/sub/normal/vless',
        'https://raw.githubusercontent.com/yebekhe/TelegramV2rayCollector/main/sub/normal/reality',
        'https://raw.githubusercontent.com/yebekhe/TelegramV2rayCollector/main/sub/normal/trojan',
        // Add more URLs as needed
    ];

    // Define an array of configs
    const staticConfigs = [
        '',
        // Add more configs as needed
    ];

    // Fetch data from all URLs concurrently and store in an array
    const validResponses = await Promise.all(
        subscriptionUrls.map(async (url) => {
            const response = await fetch(url);
            if (response.status === 200) {
                const text = await response.text();
                // Check if the content is a valid base64 encoded string and decode it
                if (isBase64(text)) {
                    const decodedText = atob(text);
                    return decodedText;
                }
                // If not base64, return the text as is
                return text;
            }
            return null; // Ignore failed requests
        })
    );

    // Filter out null values (failed requests)
    const filteredData = validResponses.filter(Boolean);

    // Merge the subscriptions data and static configs
    const mergedData = filteredData.concat(staticConfigs).join('\r\n');

    // Encode the merged data to base64
    const base64Data = encodeBase64(mergedData);

    // Create a response with the merged data
    return new Response(base64Data, {
        status: 200,
    });
}

// Helper function to check if a string is a valid base64 encoded string
function isBase64(str) {
    try {
        return btoa(atob(str)) === str;
    } catch (e) {
        return false;
    }
}

// Encodes a given string into base64 format, handling UTF-8 content correctly.
function encodeBase64(str) {
    // Encode a string into UTF-8, then base64
    const utf8Bytes = new TextEncoder().encode(str);
    return btoa(String.fromCharCode(...utf8Bytes));
}