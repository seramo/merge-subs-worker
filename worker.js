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

    // Fetch data from all URLs concurrently and store in an array
    const validResponses = await Promise.all(
        subscriptionUrls.map(async (url) => {
            const response = await fetch(url);
            if (response.status === 200) {
                return response.text();
            }
            return null; // Ignore failed requests
        })
    );

    // Filter out null values (failed requests) and merge the responses
    const mergedData = validResponses.filter(Boolean).join('\r\n');

    // Create a response with the merged data
    return new Response(mergedData, {
        status: 200,
    });
}