document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("submitButton").addEventListener("click", async () => {
        const userInput = document.getElementById("userInput").value;

        if (!userInput) {
            alert("Please enter a query!");
            return;
        }

        // Make a POST request to the Flask API
        const response = await fetch("http://127.0.0.1:5000/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: userInput }),
        });

        const resultDiv = document.getElementById("result");
        if (response.ok) {
            const data = await response.json();
            const p = data.title
          
            console.log(data)
            console.log(p)
            let printHtml = `
                    <p><span class="key">Title:</span> <span class="value">${data.title}</span></p>
                    <p><span class="key">Truthness:</span> <span class="value">${data.bool}</span></p>
                    <p><span class="key">T-Score:</span> <span class="value">${data.t_score}</span></p>
                    <p><span class="key">Conclusion:</span> <span class="value">${data.concl}</span></p>
                    <p><span class="key">Sources:</span></p>
                `;

                data.source.forEach((src, index) => {
                printHtml += `
                    <div class="source">
                        <p><span class="key">Source ${index + 1}:</span> <a href="${src.url}" target="_blank">${src.url}</a></p>
                        <p><span class="key">T-Score:</span> <span class="value">${src.t_score}</span></p>
                    </div>
                `;
            });
                resultDiv.innerHTML = printHtml;

           
        } else {
            resultDiv.textContent = "Error: Could not fetch data.";
        }
    });
});
