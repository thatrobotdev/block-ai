// Utility function to get the current active tab
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await browser.tabs.query(queryOptions);
    return tab;
}

// Listen for a message from the popup script
browser.runtime.onMessage.addListener((message, sendResponse) => {
    // Provides domain, brandColor, to the popup script
    if (message.action === 'getDomainInfo') {
        getCurrentTab().then((tab) => {
            const domain = new URL(tab.url).hostname;
            var brandColor = '';

            if (domain.includes("google.com")) {
                brandColor = 'rgb(83, 131, 236)';
            } else if (domain.includes('duckduckgo.com')) {
                brandColor = 'rgb(206, 97, 63)';
            }

            sendResponse({ domain: domain, brandColor: brandColor });
        });
        return true;
    }
});