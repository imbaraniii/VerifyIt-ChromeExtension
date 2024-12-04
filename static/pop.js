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
                        showOverlay(item);
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

function showOverlay(data) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '90%';
    overlay.style.height = '90%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
    overlay.style.zIndex = '10000';
    overlay.style.color = 'white';
    overlay.style.padding = '20px';
    overlay.style.overflowY = 'auto';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';

    overlay.innerHTML = 
        `<div style="max-width: 600px; background: #2c2c2c; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h2 style="color: #4CAF50; margin-bottom: 20px; text-align: center;">Text Analysis</h2>
          <div style="background: #3c3c3c; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
              <p><strong style="color: #4CAF50;">Title:</strong> ${data.title}</p>
              <p><strong style="color: #4CAF50;">Truthfulness:</strong> ${data.bool}</p>
              <p><strong style="color: #4CAF50;">Trust Score:</strong> ${data.t_score}</p>
              <p><strong style="color: #4CAF50;">Conclusion:</strong> ${data.concl}</p>
          </div>
          <h3 style="color: #4CAF50; margin-bottom: 10px;">Sources:</h3>
          <div style="max-height: 300px; overflow-y: auto;">
              ${data.source.map((src, index) => 
                  `<div style="background: #3c3c3c; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
                      <p><strong style="color: #4CAF50;">Source ${index + 1}:</strong> <a href="${src.url}" style="color: #4CAF50;" target="_blank">${src.url}</a></p>
                      <p><strong style="color: #4CAF50;">Source Trust Score:</strong> ${src.t_score}</p>
                  </div>`
              ).join('')}
          </div>
          <div style="text-align: center; margin-top: 20px;">
              <button id="close-overlay" style="padding: 10px 20px; background-color: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>
          </div>
      </div>`;

    overlay.querySelector('#close-overlay').addEventListener('click', () => {
        document.body.removeChild(overlay);
    });

    document.body.appendChild(overlay);
}
