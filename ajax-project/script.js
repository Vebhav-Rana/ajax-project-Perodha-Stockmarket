// NAVIGATION LOGIC
function showPage(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

// TRENDING STOCKS AJAX
document.getElementById("loadStocksBtn").addEventListener("click", loadTrendingStocks);

function loadTrendingStocks() {
    const output = document.getElementById("stockResult");
    output.innerHTML = "<p>Loading data...</p>";

    const xhr = new XMLHttpRequest();

    xhr.open("GET", "trending.json", true);

    xhr.onreadystatechange = function () {
        console.log("ReadyState:", xhr.readyState);

        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                let html = "<h2>Top Trending Stocks</h2>";

                html += `<table border="1" width="100%" cellpadding="10" style="border-collapse:collapse;">
                            <tr>
                                <th>Symbol</th>
                                <th>Company</th>
                                <th>Price (₹)</th>
                                <th>Change</th>
                                <th>Volume</th>
                            </tr>`;

                data.stocks.forEach(stock => {
                    html += `
                        <tr>
                            <td>${stock.symbol}</td>
                            <td>${stock.company}</td>
                            <td>₹${stock.price}</td>
                            <td style="color:${stock.change.startsWith('+') ? 'lightgreen' : 'red'};">
                                ${stock.change}
                            </td>
                            <td>${stock.volume}</td>
                        </tr>`;
                });

                html += "</table>";
                output.innerHTML = html;

            } else if (xhr.status === 404) {
                output.innerHTML = "<p style='color:red;'>Error 404: File not found.</p>";
            } else {
                output.innerHTML = `<p style='color:red;'>Error: Status ${xhr.status}</p>`;
            }
        }
    };

    xhr.send();
}
