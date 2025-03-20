chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        let url = new URL(details.url);

        // Ensure it's a DuckDuckGo URL
        if (url.hostname.includes("duckduckgo.com")) {
            let needsUpdate = false;

            if (url.searchParams.get("kbg") !== "-1") {
                url.searchParams.set("kbg", "-1");
                needsUpdate = true;
            }
            if (url.searchParams.get("kbe") !== "0") {
                url.searchParams.set("kbe", "0");
                needsUpdate = true;
            }

            // Only redirect if changes were made
            if (needsUpdate) {
                return { redirectUrl: url.toString() };
            }
        }
    },
    { urls: ["*://*.duckduckgo.com/*"] }, // Match all DuckDuckGo links
    ["blocking"]
);