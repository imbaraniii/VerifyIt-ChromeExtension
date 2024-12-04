document.getElementById('checkHistory').addEventListener('click', () => {
    let historyDiv = document.getElementById('historyDiv');
    const body = document.body;
    body.style.minWidth = '400px';
    if (!historyDiv) {
        historyDiv = document.createElement('div');
        historyDiv.id = 'historyDiv';
        historyDiv.className = 'history-div';
        historyDiv.style.marginTop = '20px';

        // Retrieve history from chrome storage
        chrome.storage.local.get('history', function (result) {
            const history = result.history || [];

            // Check if there are items in the history
            if (history.length > 0) {
                // Loop through history and create a button for each item
                history.forEach(item => {
                    const button = document.createElement('button');
                    button.className = 'historyButton';
                    button.textContent = item.title;

                    // Add event listener to open the overlay with item details
                    button.addEventListener('click', () => {
                        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                            chrome.scripting.executeScript({
                                target: { tabId: tabs[0].id },
                                func: showOverlayOnPage,
                                args: [item]
                            });
                        });
                    });

                    historyDiv.appendChild(button);
                });
            } else {
                historyDiv.innerHTML = "<center><p>No history available</p></center>";
            }
        });

        document.body.appendChild(historyDiv);
    }
});

function showOverlayOnPage(data) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
    overlay.style.zIndex = '10000';
    overlay.style.color = 'white';
    overlay.style.padding = '20px';
    overlay.style.overflowY = 'auto';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';

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
            ">${src.url}</a>
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

    document.body.appendChild(overlay);
}
