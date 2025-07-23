const fileInput = document.getElementById('file-input');
const resultText = document.getElementById('result-text');
const modifyButton = document.getElementById('modify-button');
const historyList = document.getElementById('history-list');

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    // Simple detection logic (placeholder)
    const isAiGenerated = file.name.toLowerCase().includes('ai') || file.name.toLowerCase().includes('generated');

    resultText.textContent = isAiGenerated ? 'AI Generated' : 'Not AI Generated';

    if (isAiGenerated) {
        modifyButton.style.display = 'block';
    } else {
        modifyButton.style.display = 'none';
    }

    addToHistory(file.name, isAiGenerated);
});

modifyButton.addEventListener('click', () => {
    alert('File modification is not yet implemented.');
});

function addToHistory(fileName, isAiGenerated) {
    const listItem = document.createElement('li');
    listItem.textContent = `${fileName} - ${isAiGenerated ? 'AI Generated' : 'Not AI Generated'}`;
    historyList.appendChild(listItem);
}
