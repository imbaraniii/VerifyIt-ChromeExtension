function createLoadingOverlay() {
  const loadingOverlay = document.createElement('div');
  loadingOverlay.style.position = 'fixed';
  loadingOverlay.style.top = '0';
  loadingOverlay.style.left = '0';
  loadingOverlay.style.width = '100%';
  loadingOverlay.style.height = '100%';
  loadingOverlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
  loadingOverlay.style.zIndex = '10001';
  loadingOverlay.style.display = 'flex';
  loadingOverlay.style.justifyContent = 'center';
  loadingOverlay.style.alignItems = 'center';
  loadingOverlay.innerHTML = `
      <div style="text-align: center; color: white;">
          <div style="font-size: 2em; margin-bottom: 20px;">🔍</div>
          <div style="font-size: 1.2em;">Analyzing content...</div>
      </div>
  `;
  document.body.appendChild(loadingOverlay);
  return loadingOverlay;
}

function createResultOverlay(data, loadingOverlay) {
  loadingOverlay.remove();
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
  overlay.style.zIndex = '10000';
  overlay.style.color = 'white';
  overlay.style.padding = '20px';
  overlay.style.overflowY = 'auto';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';

  overlay.innerHTML = `
      <div style="max-width: 600px; background: #2c2c2c; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #4CAF50; margin-bottom: 20px; text-align: center;">Text Analysis</h2>
          <div style="background: #3c3c3c; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
              <p><strong style="color: #4CAF50;">Title:</strong> ${data.title}</p>
              <p><strong style="color: #4CAF50;">Truthfulness:</strong> ${data.bool}</p>
              <p><strong style="color: #4CAF50;">Trust Score:</strong> ${data.t_score}</p>
              <p><strong style="color: #4CAF50;">Conclusion:</strong> ${data.concl}</p>
          </div>
          <h3 style="color: #4CAF50; margin-bottom: 10px;">Sources:</h3>
          <div style="max-height: 300px; overflow-y: auto;">
              ${data.source.map((src, index) => `
                  <div style="background: #3c3c3c; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
                      <p><strong style="color: #4CAF50;">Source ${index + 1}:</strong> <a href="${src.url}" style="color: #4CAF50;" target="_blank">${src.url}</a></p>
                      <p><strong style="color: #4CAF50;">Source Trust Score:</strong> ${src.t_score}</p>
                  </div>
              `).join('')}
          </div>
          <div style="text-align: center; margin-top: 20px;">
              <button id="close-overlay" style="padding: 10px 20px; background-color: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>
          </div>
      </div>
  `;

  overlay.querySelector('#close-overlay').addEventListener('click', () => {
      document.body.removeChild(overlay);
  });

  document.body.appendChild(overlay);
}

function analyzeContent(query) {
  const loadingOverlay = createLoadingOverlay();
  
  fetch('http://127.0.0.1:5000/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: query })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to analyze content');
  })
  .then(data => {
    createResultOverlay(data, loadingOverlay);
  })
  .catch(error => {
    console.error('Analysis error:', error);
    alert('Error analyzing content');
    loadingOverlay.remove();
  });
}

function injectAnalyzeButton() {
  const analyzeButton = document.createElement('button');
  analyzeButton.innerHTML = '📊 Analyze';
  analyzeButton.style.position = 'fixed';
  analyzeButton.style.top = '10px';
  analyzeButton.style.right = '10px';
  analyzeButton.style.zIndex = '9999';
  analyzeButton.style.padding = '10px 15px';
  analyzeButton.style.backgroundColor = '#007BFF';
  analyzeButton.style.color = 'white';
  analyzeButton.style.border = 'none';
  analyzeButton.style.borderRadius = '5px';
  analyzeButton.style.cursor = 'pointer';
  analyzeButton.style.display = 'flex';
  analyzeButton.style.alignItems = 'center';
  analyzeButton.style.gap = '5px';

  analyzeButton.addEventListener('click', () => {
    analyzeContent(window.location.href);
  });

  document.body.appendChild(analyzeButton);
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "analyzeSelectedText") {
    analyzeContent(request.selectedText);
  }
});

injectAnalyzeButton();