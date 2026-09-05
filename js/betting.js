// Your money
let money = 1000;
let bet = 10;

// Make the betting UI
function addBettingUI() {
    // Show your money
    const moneyDisplay = document.createElement('div');
    moneyDisplay.id = 'money';
    moneyDisplay.textContent = `💰 $${money}`;
    moneyDisplay.style.cssText = 'color: gold; font-size: 24px; margin: 10px;';
    
    // Bet controls
    const betControls = document.createElement('div');
    betControls.innerHTML = `
        <button id="betDown">−</button>
        <span id="betAmount" style="margin:0 10px;color:white;">Bet: $${bet}</span>
        <button id="betUp">+</button>
        <button id="bet10" style="margin-left:10px;">$10</button>
        <button id="bet50">$50</button>
        <button id="bet100">$100</button>
    `;
    
    // Put it above the spin button
    const button = document.getElementById('handle');
    button.parentNode.insertBefore(moneyDisplay, button);
    button.parentNode.insertBefore(betControls, button);
    
    // Make buttons work
    document.getElementById('betDown').onclick = () => {
        if (bet > 1) bet -= 5;
        updateBetDisplay();
    };
    
    document.getElementById('betUp').onclick = () => {
        if (bet < money) bet += 5;
        updateBetDisplay();
    };
    
    document.getElementById('bet10').onclick = () => { bet = Math.min(10, money); updateBetDisplay(); };
    document.getElementById('bet50').onclick = () => { bet = Math.min(50, money); updateBetDisplay(); };
    document.getElementById('bet100').onclick = () => { bet = Math.min(100, money); updateBetDisplay(); };
}

function updateBetDisplay() {
    document.getElementById('betAmount').textContent = `Bet: $${bet}`;
}

// Handle the spin with betting
function spinWithBet() {
    if (bet > money) {
        alert("You don't have enough money!");
        return;
    }
    
    money -= bet;
    document.getElementById('money').textContent = `💰 $${money}`;
    
    // Watch for win/loss
    const checkResult = setInterval(() => {
        const msg = document.getElementById('message').textContent;
        if (msg === 'YOU WIN') {
            clearInterval(checkResult);
            money += bet * 3;
            document.getElementById('money').textContent = `💰 $${money}`;
            document.getElementById('message').textContent = `🎉 YOU WIN $${bet * 3}!`;
        } else if (msg === 'Try again') {
            clearInterval(checkResult);
            document.getElementById('message').textContent = `❌ Lost $${bet}`;
        }
    }, 100);
}

// Replace the spin button with our version
function setupBetting() {
    addBettingUI();
    
    // Remove old click and add new one
    const button = document.getElementById('handle');
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
    newButton.onclick = spinWithBet;
}

// Start when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupBetting);
} else {
    setupBetting();
}