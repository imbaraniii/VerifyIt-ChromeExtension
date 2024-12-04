function createLoadingOverlay() {
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.top = '20px';
  popup.style.right = '20px';
  popup.style.width = '250px';
  popup.style.backgroundColor = '#f8f9fa';
  popup.style.border = '1px solid #e0e0e0';
  popup.style.borderRadius = '10px';
  popup.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
  popup.style.padding = '15px';
  popup.style.zIndex = '10000';
  popup.style.transition = 'all 0.3s ease';
  popup.style.display = 'flex';
  popup.style.alignItems = 'center';
  popup.style.animation = 'slideInRight 0.3s ease';

  popup.innerHTML = `
    <div style="
      width: 30px;
      height: 30px;
      border: 3px solid transparent;
      border-top: 3px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 15px;
    "></div>
    <div>
      <h4 style="
        margin: 0;
        color: #2c3e50;
        font-size: 14px;
        margin-bottom: 5px;
      ">Analyzing</h4>
      <p style="
        margin: 0;
        color: #7f8c8d;
        font-size: 12px;
      ">Processing your content...</p>
    </div>
    <style>
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes slideInRight {
        from { 
          transform: translateX(100%);
          opacity: 0;
        }
        to { 
          transform: translateX(0);
          opacity: 1;
        }
      }
    </style>
  `;

  document.body.appendChild(popup);
  return popup;
}

function createResultOverlay(data, loadingOverlay) {
  loadingOverlay.remove();
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  overlay.style.zIndex = '10000';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.backdropFilter = 'blur(5px)';

  const getTruthColor = (bool) => {
    return bool ? '#2ecc71' : '#e74c3c';
  };

  overlay.innerHTML = `
    <div style="
      background: white;
      border-radius: 15px;
      box-shadow: 0 15px 35px rgba(0,0,0,0.15);
      max-width: 700px;
      width: 100%;
      padding: 30px;
      position: relative;
      overflow: scroll;
    ">
      <div style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 5px;
        background: ${getTruthColor(data.bool)};
      "></div>
      
      <div style="text-align: center; margin-bottom: 25px;">
        <h2 style="
          color: #2c3e50;
          margin-bottom: 10px;
          font-size: 24px;
        ">Fact Check Results</h2>
        <p style="
          color: #7f8c8d;
          font-size: 14px;
        ">Comprehensive analysis of the provided content</p>
      </div>

      <div style="
        background: #f7f9f9;
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 20px;
      ">
        <div style="margin-bottom: 15px;">
          <p style="
            color: #2c3e50;
            font-weight: bold;
            margin-bottom: 5px;
          ">Title: </p>
          <div style="
            display: flex;
            align-items: center;
            gap: 10px;
          ">
            <span style="
              color: ${getTruthColor(data.bool)};
              font-weight: bold;
              font-size: 18px;
            ">
              ${data.title}
            </span>
          </div>
          <p style="
            color: #2c3e50;
            font-weight: bold;
            margin-bottom: 5px;
            margin-top: 5px;
          ">Claim Truthfulness</p>
          <div style="
            display: flex;
            align-items: center;
            gap: 10px;
          ">
            <span style="
              color: ${getTruthColor(data.bool)};
              font-weight: bold;
              font-size: 18px;
            ">
              ${data.bool ? 'True' : 'False'}
            </span>
            <div style="
              width: 50px;
              height: 6px;
              background: ${getTruthColor(data.bool)};
              border-radius: 3px;
            "></div>
          </div>
        </div>

        <div style="margin-bottom: 15px;">
          <p style="
            color: #2c3e50;
            font-weight: bold;
            margin-bottom: 5px;
          ">Trust Score</p>
          <div style="
            width: 100%;
            height: 10px;
            background: #e0e0e0;
            border-radius: 5px;
          ">
            <div style="
              width: ${data.t_score * 100}%;
              height: 100%;
              background: ${getTruthColor(data.bool)};
              border-radius: 5px;
            "></div>
          </div>
        </div>

        <div>
          <p style="
            color: #2c3e50;
            font-weight: bold;
            margin-bottom: 5px;
          ">Conclusion</p>
          <p style="
            color: #7f8c8d;
            font-size: 14px;
          ">${data.concl}</p>
        </div>
      </div>

      <div>
        <h3 style="
          color: #2c3e50;
          margin-bottom: 15px;
          font-size: 18px;
        ">Sources</h3>
        ${data.source.map((src, index) => `
          <div style="
            background: #f7f9f9;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          ">
            <div style="display:flex">
              <p style="
                color: #2c3e50;
                font-weight: bold;
                margin-bottom: 5px;
                font-size: 14px;
              ">Source ${index + 1}</p>
              <a href="${src.url}" target="_blank" style="
                color: #3498db;
                text-decoration: none;
                font-size: 13px;
                max-width: 300px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              ">${src.url}</a>
            </div>
            <span style="
              background: ${getTruthColor(src.t_score > 0.5)};
              color: white;
              padding: 5px 10px;
              border-radius: 15px;
              font-size: 12px;
            ">
              ${(src.t_score * 100).toFixed(0)}% Trust
            </span>
          </div>
        `).join('')}
      </div>

      <div style="text-align: center; margin-top: 20px;">
        <button id="close-overlay" style="
          background: #3498db;
          color: white;
          border: none;
          padding: 10px 25px;
          border-radius: 25px;
          cursor: pointer;
          transition: background 0.3s ease;
        ">Close Analysis</button>
      </div>
    </div>
  `;

  overlay.querySelector('#close-overlay').addEventListener('click', () => {
    document.body.removeChild(overlay);
  });

  // Hover effect for close button
  const closeButton = overlay.querySelector('#close-overlay');
  closeButton.addEventListener('mouseenter', () => {
    closeButton.style.background = '#2980b9';
  });
  closeButton.addEventListener('mouseleave', () => {
    closeButton.style.background = '#3498db';
  });

  document.body.appendChild(overlay);
}

function storeHistory(data) {
  chrome.storage.local.get('history', function (result) {
    let history = result.history || [];
    history.push(data);
    chrome.storage.local.set({ history: history });
  });
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
    storeHistory(data);
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
  analyzeButton.innerHTML = 'VerifyIt';
  analyzeButton.style.position = 'fixed';
  analyzeButton.style.bottom = '10px';
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
