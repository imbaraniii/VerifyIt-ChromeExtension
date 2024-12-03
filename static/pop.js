document.addEventListener("DOMContentLoaded", function() {
    const submitButton = document.getElementById("submitButton");
    const userInput = document.getElementById("userInput");
    const resultDiv = document.getElementById("result");

    submitButton.addEventListener("click", async () => {
        const input = userInput.value;

        if (!input) {
            alert("Please enter a query!");
            return;
        }

        // Loading state
        resultDiv.innerHTML = `
            <div class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2 text-muted">Analyzing content...</p>
            </div>
        `;

        try {
            const response = await fetch("http://127.0.0.1:5000/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: input }),
            });

            if (response.ok) {
                const data = await response.json();
                let printHtml = `
                    <div class="card mb-3">
                        <div class="card-header bg-primary text-white">
                            <h5 class="mb-0">Analysis Results</h5>
                        </div>
                        <div class="card-body">
                            <p><span class="key">Title:</span> ${data.title}</p>
                            <p><span class="key">Truthfulness:</span> 
                                <span class="${data.bool ? 'text-success' : 'text-danger'}">
                                    ${data.bool}
                                </span>
                            </p>
                            <p><span class="key">Trust Score:</span> ${data.t_score}</p>
                            <p><span class="key">Conclusion:</span> ${data.concl}</p>
                        </div>
                    </div>
                    <div class="sources-container">
                        <h6 class="text-primary mb-3">
                            <i class="bi bi-link-45deg me-2"></i>Sources
                        </h6>
                `;

                data.source.forEach((src, index) => {
                    printHtml += `
                        <div class="source-item">
                            <p class="mb-1">
                                <span class="key">Source ${index + 1}:</span> 
                                <a href="${src.url}" target="_blank" class="text-decoration-none">
                                    ${src.url}
                                </a>
                            </p>
                            <p class="mb-0">
                                <span class="key">Trust Score:</span> 
                                <span class="badge bg-info">${src.t_score}</span>
                            </p>
                        </div>
                    `;
                });

                printHtml += `</div>`;
                resultDiv.innerHTML = printHtml;
            } else {
                resultDiv.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        <i class="bi bi-exclamation-triangle me-2"></i>
                        Error: Could not fetch data
                    </div>
                `;
            }
        } catch (error) {
            resultDiv.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <i class="bi bi-exclamation-triangle me-2"></i>
                    Error: ${error.message}
                </div>
            `;
        }
    });
});