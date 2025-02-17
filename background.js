// Working Hours Configuration
const WORK_HOURS = {
  start: 9,  // 9 AM
  end: 17,   // 5 PM
  days: [1, 2, 3, 4, 5] // Monday to Friday
};

// Blocked Sites
const BLOCKED_SITES = [
  "*://*.x.com/*",
  "*://*.facebook.com/*",
  "*://*.instagram.com/*",
  "*://*.tiktok.com/*",
  "*://*.reddit.com/*",
  "*://*.youtube.com/*",
  "*://*.netflix.com/*",
  "*://*.pinterest.com/*",
  "*://*.linkedin.com/*",
  "*://*.whatsapp.com/*"
];

// Check if current time is within work hours
function isWorkTime() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentDay = now.getDay(); // 0 (Sunday) to 6 (Saturday)

  return (
    WORK_HOURS.days.includes(currentDay) &&
    currentHour >= WORK_HOURS.start &&
    currentHour < WORK_HOURS.end
  );
}

// Update blocking rules
function updateBlockingRules(enabled) {
  chrome.declarativeNetRequest.updateEnabledRulesets({
    enableRulesetIds: enabled ? ['block_distractions'] : [],
    disableRulesetIds: enabled ? [] : ['block_distractions']
  });
}

// Schedule check every minute
chrome.alarms.create('scheduleCheck', { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'scheduleCheck') {
    const shouldBlock = isWorkTime();
    updateBlockingRules(shouldBlock);
    
    // Update icon
    chrome.action.setIcon({
      path: shouldBlock ? "icons/icon-red48.png" : "icons/icon48.png"
    });
  }
});

// Initial check
updateBlockingRules(isWorkTime());