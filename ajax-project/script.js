// PAGE SWITCHING
function showPage(id) {
    let pages = document.querySelectorAll(".page");

    // Hide all pages
    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    // Show selected page
    document.getElementById(id).classList.add("active");
}

// BUTTON CLICK → LOAD STOCKS
document.getElementById("loadStocksBtn").onclick = function () {
    loadTrendingStocks();
};

// AJAX FUNCTION
function loadTrendingStocks() {
    let output = document.getElementById("stockResult");
    output.innerHTML = "Loading data...";

    let xhr = new XMLHttpRequest();

    // Step 1: Set URL & Method
    xhr.open("GET", "trending.json", true);

    // Step 2: Callback
    xhr.onreadystatechange = function () {

        // ReadyState 4 → Response Arrived
        if (xhr.readyState === 4) {

            // Status 200 → SUCCESS
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                let html = "<h2>Top Trending Stocks</h2>";

                html += `
                    <table border="1" width="100%" cellpadding="10" style="border-collapse:collapse;">
                        <tr>
                            <th>Symbol</th>
                            <th>Company</th>
                            <th>Price (₹)</th>
                            <th>Change</th>
                            <th>Volume</th>
                        </tr>
                `;

                data.stocks.forEach(function(stock) {

                    let color = (stock.change.startsWith("+")) ? "lightgreen" : "red";

                    html += `
                        <tr>
                            <td>${stock.symbol}</td>
                            <td>${stock.company}</td>
                            <td>₹${stock.price}</td>
                            <td style="color:${color};">${stock.change}</td>
                            <td>${stock.volume}</td>
                        </tr>
                    `;
                });

                html += "</table>";
                output.innerHTML = html;
            }

            // Status 404 → FILE NOT FOUND
            else if (xhr.status === 404) {
                output.innerHTML = "Error 404: File not found.";
            }

            // Any other status
            else {
                output.innerHTML = "Error: Status " + xhr.status;
            }
        }
    };

    // Step 3: Send Request
    xhr.send();
}
