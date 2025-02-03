const historyKey = 'calcHistory';

export function addToHistory(expression, result) {
    let history = JSON.parse(localStorage.getItem(historyKey)) || [];
    history.unshift({ expression, result });
    if (history.length > 10) history.pop();
    localStorage.setItem(historyKey, JSON.stringify(history));
}

export function updateHistoryDisplay(historyContent) {
    let history = JSON.parse(localStorage.getItem(historyKey)) || [];
    historyContent.innerHTML = history.map(entry => `
        <div class="history-item">
            <div>${entry.expression}</div>
            <div class="history-result">= ${entry.result}</div>
        </div>
    `).join('');
}
