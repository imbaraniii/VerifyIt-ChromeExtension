// content.js
function injectAnalyzeButton() {
    // Create analyze button
    const analyzeButton = document.createElement('button');
    analyzeButton.textContent = 'Analyze Article';
    analyzeButton.style.position = 'fixed';
    analyzeButton.style.top = '10px';
    analyzeButton.style.right = '10px';
    analyzeButton.style.zIndex = '9999';
    analyzeButton.style.padding = '10px';
    analyzeButton.style.backgroundColor = '#007BFF';
    analyzeButton.style.color = 'white';
    analyzeButton.style.border = 'none';
    analyzeButton.style.borderRadius = '5px';
    analyzeButton.style.cursor = 'pointer';
  
    // Add click event listener
    analyzeButton.addEventListener('click', async () => {
      try {
        const title = document.title;
        const bodyContent = document.body.innerText || document.body.textContent; // Extract body content
  
        const response = await fetch('http://127.0.0.1:5000/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: title, content: bodyContent, url: window.location.href })
        });
  
        if (response.ok) {
          const data = await response.json();
          
          // Create result overlay
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
  
          // Populate overlay with analysis results
          overlay.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto; background: #333; padding: 20px; border-radius: 10px;">
              <h2>Article Analysis</h2>
              <p><strong>Title:</strong> ${data.title}</p>
              <p><strong>Truthfulness:</strong> ${data.bool}</p>
              <p><strong>Trust Score:</strong> ${data.t_score}</p>
              <p><strong>Conclusion:</strong> ${data.concl}</p>
              <h3>Sources:</h3>
              ${data.source.map((src, index) => `
                <div>
                  <p>Source ${index + 1}: <a href="${src.url}" style="color: #4CAF50;">${src.url}</a></p>
                  <p>Source Trust Score: ${src.t_score}</p>
                </div>
              `).join('')}
              <button id="close-overlay" style="margin-top: 20px; padding: 10px; background-color: #f44336; color: white; border: none; border-radius: 5px;">Close</button>
            </div>
          `;
  
          // Add close button functionality
          overlay.querySelector('#close-overlay').addEventListener('click', () => {
            document.body.removeChild(overlay);
          });
  
          document.body.appendChild(overlay);
        } else {
          alert('Failed to analyze article');
        }
      } catch (error) {
        console.error('Analysis error:', error);
        alert('Error analyzing article');
      }
    });
  
    // Append button to document body
    document.body.appendChild(analyzeButton);
}
  
// Run the injection when the page loads
injectAnalyzeButton();
