// Function to get the current active tab's domain info
function getActiveTabInfo() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const tab = tabs[0];
        const domain = new URL(tab.url).hostname; // Extract the domain from the URL
        let brandColor;
        let supportedSite = false;

        if (domain.includes("google.com")) {
          supportedSite = true;
          brandColor = 'rgb(83, 131, 236)';
        } else if (domain.includes('duckduckgo.com')) {
          supportedSite = true;
          brandColor = 'rgb(206, 97, 63)';
        }

        if (supportedSite) {
          resolve({ domain, brandColor }); // Resolve the promise with domain and brandColor
        } else {
          reject("Site not supported");
        }
      } else {
        reject("No active tab found");
      }
    });
  });
}

// Get the status and badge elements
const statusElement = document.getElementById('status');
const badgeElement = document.getElementById('status-badge');

// Call getTabInfo() when the popup is opened
getActiveTabInfo()
  .then((response) => {
    if (response) {
      // Update the status text and the badge (span)
      statusElement.textContent = "Block AI is currently enabled on ";
      badgeElement.textContent = response.domain; // Set the domain in the badge
      badgeElement.style.backgroundColor = response.brandColor;
      badgeElement.style.display = 'inline';
    }
  })
  .catch((error) => {
    // If an error occurs (e.g., no active tab or site not supported)
    statusElement.textContent = "Block AI does not support this site.";
    badgeElement.textContent = ''; // Clear the badge
    badgeElement.style.display = 'none';
    console.error(error);
  });