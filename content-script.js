chrome.storage.sync.get(['focusEnabled'], (result) => {
  if (result.focusEnabled) {
    const blockedSites = [
      'x.com',
      'facebook.com',
      'instagram.com',
      'tiktok.com'
    ];

    if (blockedSites.some(site => location.hostname.includes(site))) {
      // Show notification
      chrome.runtime.sendMessage({
        type: "showNotification",
        title: "Focus Mode Activated 🔒",
        message: `${location.hostname} is blocked during work hours`
      });

      // Blocked page content
      document.body.innerHTML = `
        <div class="blocked-page">
          <img src="${chrome.runtime.getURL('icons/icon128.png')}" 
               alt="FocusForge" 
               class="blocked-logo">
          <h1 class="blocked-title">Time to Focus! ⏳</h1>
          <p class="blocked-text">${location.hostname} is restricted</p>
          
          <div class="affiliate-grid">
            <a href="https://amzn.to/4hJCxyL" class="affiliate-card">
              <img src="${chrome.runtime.getURL('icons/amazon-icon.png')}" 
                   alt="Amazon">
              <div class="affiliate-content">
                <h3>Productivity Essentials</h3>
                <p>Curated by FocusForge</p>
              </div>
            </a>
            
            <a href="https://www.vpncity.com/ref/67a901299ec32756" class="affiliate-card">
              <img src="${chrome.runtime.getURL('icons/vpn-icon.png')}" 
                   alt="VPNCity">
              <div class="affiliate-content">
                <h3>Secure Browsing</h3>
                <p>Military-Grade Encryption</p>
              </div>
            </a>
            
            <a href="https://trip.tp.st/Cj5Hy7Xj" class="affiliate-card">
              <img src="${chrome.runtime.getURL('icons/trip-icon.png')}" 
                   alt="Trip.com">
              <div class="affiliate-content">
                <h3>Travel Deals</h3>
                <p>Book flights & hotels</p>
              </div>
            </a>
            
            <a href="https://searadar.tp.st/GgqkSfG1" class="affiliate-card">
              <img src="${chrome.runtime.getURL('icons/searadar-icon.png')}" 
                   alt="Searadar">
              <div class="affiliate-content">
                <h3>Sea Adventures</h3>
                <p>Find cruises & boats</p>
              </div>
            </a>
          </div>
        </div>
      `;
    }
  }
});