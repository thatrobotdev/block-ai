const statusElement = document.getElementById('status');
const badgeElement = document.getElementById('status-badge');

// Set initial state
statusElement.textContent = "Block AI does not support this site.";
badgeElement.textContent = ''; // Clear any previous content
badgeElement.style.display = 'none';

browser.runtime.sendMessage({ action: 'getDomainInfo' })
  .then((response) => {
    console.log(response);
    if (response) {
      // Update the status text and the badge (span)
      statusElement.textContent = "Block AI is currently enabled on ";
      badgeElement.textContent = response.domain; // Set the domain in the badge
      badgeElement.style.backgroundColor = response.brandColor;
      badgeElement.style.display = 'inline';
    } else {
      // If no domain is found or it's not supported
      statusElement.textContent = "Block AI does not support this site.";
      badgeElement.textContent = ''; // Clear the badge
      badgeElement.style.display = 'none';
    }
  })
  .catch((error) => {
    // In case of error (e.g., permissions issue)
    statusElement.textContent = "Block AI does not support this site.";
    badgeElement.textContent = ''; // Clear the badge
    badgeElement.style.display = 'none';
  });