document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('focusToggle');
  
  // Load saved state
  chrome.storage.sync.get(['focusEnabled'], (result) => {
    toggle.checked = result.focusEnabled || false;
  });

  // Save state on toggle
  toggle.addEventListener('change', () => {
    chrome.storage.sync.set({ focusEnabled: toggle.checked });
    chrome.runtime.sendMessage({ command: "updateFocusMode" });
  });
});