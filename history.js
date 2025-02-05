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


export function addToHistory(expression, result) {
    calculationHistory.unshift({ expression, result });
    if (calculationHistory.length > 10) calculationHistory.pop();

    historyContent.innerHTML = calculationHistory
        .map(entry => `
                <div class="history-entry">
                    <div class="history-expression">${entry.expression}</div>
                    <div class="history-result">= ${entry.result}</div>
                </div>
            `)
        .join('');
}
