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
        // YeBeKhe
        'https://raw.githubusercontent.com/yebekhe/TelegramV2rayCollector/main/sub/base64/donated',
        'https://raw.githubusercontent.com/yebekhe/TelegramV2rayCollector/main/sub/base64/vmess',
        'https://raw.githubusercontent.com/yebekhe/TelegramV2rayCollector/main/sub/base64/vless',
        'https://raw.githubusercontent.com/yebekhe/TelegramV2rayCollector/main/sub/base64/reality',
        'https://raw.githubusercontent.com/yebekhe/TelegramV2rayCollector/main/sub/normal/trojan',
        // MahdiBland
        'https://raw.githubusercontent.com/mahdibland/ShadowsocksAggregator/master/Eternity.txt',
        // Other
        'https://zebelkhan10.fallahpour25.workers.dev/sub/74f829f3-480b-4e7f-8039-9418d055375b',
        'https://tackserver-code.ir/api/json/VpnMaan.json',
        'https://raw.githubusercontent.com/yaney01/telegram-collector/main/subscribe/networks/grpc',
        'https://raw.githubusercontent.com/yaney01/telegram-collector/main/subscribe/networks/http',
        'https://raw.githubusercontent.com/yaney01/telegram-collector/main/subscribe/networks/ws',
        'https://raw.githubusercontent.com/yaney01/telegram-collector/main/subscribe/networks/tcp',
        'https://raw.githubusercontent.com/yaney01/telegram-collector/main/subscribe/security/tls',
        // MahdiBland
        'https://raw.githubusercontent.com/yaney01/telegram-collector/main/subscribe/layers/ipv6',
        // Other
        'https://raw.githubusercontent.com/yaney01/telegram-collector/main/subscribe/security/non-tls',
        'https://raw.githubusercontent.com/yaney01/telegram-collector/main/subscribe/layers/ipv4',
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
