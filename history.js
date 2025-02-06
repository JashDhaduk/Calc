const historyButton = document.querySelector('.history-button');
const historyPanel = document.querySelector('.history-panel');
const closeHistoryButton = document.querySelector('.close-history');
const historyContent = document.querySelector('.history-content');

let calculationHistory = [];

historyButton.addEventListener('click', () => {
    historyPanel.classList.add('active');
});

closeHistoryButton.addEventListener('click', () => {
    historyPanel.classList.remove('active');
});

// Function to add calculation to history
export function addToHistory(expression, result) {
    calculationHistory.unshift({ expression, result });
    if (calculationHistory.length > 10) calculationHistory.pop();
    
    renderHistory();  // Update the history in the DOM
    saveHistory();  // Persist the history in localStorage
}

function renderHistory() {
    historyContent.innerHTML = calculationHistory
        .map(entry => `
            <div class="history-entry">
                <div class="history-expression">${entry.expression}</div>
                <div class="history-result">= ${entry.result}</div>
            </div>
        `)
        .join('');
}

function saveHistory() {
    localStorage.setItem('calculationHistory', JSON.stringify(calculationHistory));
}

// Load history from localStorage if available
function loadHistory() {
    const storedHistory = JSON.parse(localStorage.getItem('calculationHistory'));
    if (storedHistory && Array.isArray(storedHistory)) {
        calculationHistory = storedHistory;
        renderHistory();
    }
}

window.addEventListener('DOMContentLoaded', loadHistory);