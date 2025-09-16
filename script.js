
// Basic calculator logic for the presale page
document.addEventListener('DOMContentLoaded', () => {
  const usdInput = document.getElementById('usdAmount');
  const maticAmountEl = document.getElementById('maticAmount');
  const currentRateEl = document.getElementById('currentRate');
  const tokenPriceEl = document.getElementById('tokenPrice');
  const tokenReceiveEl = document.getElementById('tokenReceive');

  // Parse numeric values from text content
  const parsePrice = (str) => parseFloat(str.replace(/[^0-9.]/g, ''));
  const maticRate = parsePrice(currentRateEl.textContent) || 0;
  const tokenPrice = parsePrice(tokenPriceEl.textContent) || 1;

  // Update displayed amounts based on current input value
  function updateValues() {
    const usd = parseFloat(usdInput.value);
    if (!isNaN(usd) && usd >= 0 && maticRate > 0 && tokenPrice > 0) {
      const maticAmount = usd / maticRate;
      const tokenAmount = usd / tokenPrice;
      maticAmountEl.textContent = `${maticAmount.toFixed(3)} MATIC`;
      tokenReceiveEl.textContent = `${tokenAmount.toFixed(2)} VeriFyz tokens`;
    } else {
      maticAmountEl.textContent = '0 MATIC';
      tokenReceiveEl.textContent = '0 VeriFyz tokens';
    }
  }

  // Recalculate whenever the user enters a new USD amount
  usdInput.addEventListener('input', updateValues);

  // Initialize display with default values
  updateValues();
});
