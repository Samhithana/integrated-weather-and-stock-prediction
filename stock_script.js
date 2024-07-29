document.addEventListener('DOMContentLoaded', function() {
    document.body.style.backgroundImage = "url('stock.jpg')"; // Add your image path here
    document.body.style.backgroundSize = "cover"; // Adjust this as needed
    document.body.style.backgroundRepeat = "no-repeat"; // Prevents repeating of the image
});
document.getElementById('stock-search-btn').addEventListener('click', searchStock);

function showStockError(message) {
  const errorMessage = document.getElementById('stock-error-message');
  errorMessage.innerHTML = message;
  errorMessage.style.display = 'block';
}

function clearStockError() {
  const errorMessage = document.getElementById('stock-error-message');
  errorMessage.innerHTML = '';
  errorMessage.style.display = 'none';
}

function searchStock() {
  const stockSymbol = document.getElementById('stock-input').value;
  const apiKey = 'YOUR_ALPHA_VANTAGE_API_KEY'; // Replace with your Alpha Vantage API key

  if (!stockSymbol) {
    showStockError("Please enter a stock symbol");
    return;
  }

  clearStockError();

  fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=5min&apikey=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Stock symbol not found');
      }
      return response.json();
    })
    .then(data => {
      const stockInfo = document.getElementById('stock-info');
      const timeSeries = data['Time Series (5min)'];
      const latestTime = Object.keys(timeSeries)[0];
      const latestData = timeSeries[latestTime];

      stockInfo.innerHTML = `
        <h2>${stockSymbol.toUpperCase()}</h2>
        <p>Last Updated: ${latestTime}</p>
        <p>Open: ${latestData['1. open']}</p>
        <p>High: ${latestData['2. high']}</p>
        <p>Low: ${latestData['3. low']}</p>
        <p>Close: ${latestData['4. close']}</p>
        <p>Volume: ${latestData['5. volume']}</p>
      `;
    })
    .catch(error => {
      showStockError('Error: ' + error.message);
    });
    body.style.backgroundImage = "url('stock.jpg')";
}
