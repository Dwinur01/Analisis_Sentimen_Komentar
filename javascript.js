const platforms = {
    'Instagram': 'fa-instagram',
    'Facebook': 'fa-facebook',
    'Twitter': 'fa-twitter',
    'TikTok': 'fa-tiktok',
    'Threads': 'fa-at',
    'YouTube': 'fa-youtube',
    'LinkedIn': 'fa-linkedin'
};

const positiveWords = [
    'bagus', 'suka', 'baik', 'hebat', 'keren', 'mantap', 'indah',
    'senang', 'gembira', 'luar biasa', 'sempurna', 'wow', 'berhasil'
];

const negativeWords = [
    'jelek', 'buruk', 'benci', 'parah', 'hancur', 'gagal', 'kecewa',
    'marah', 'sedih', 'rugi', 'bodoh', 'payah', 'sampah'
];

// Initialize with one comment input
window.onload = function() {
    addCommentInput();
};

function createPlatformSelect() {
    const select = document.createElement('select');
    select.className = 'platform-select';
    
    Object.keys(platforms).forEach(platform => {
        const option = document.createElement('option');
        option.value = platform;
        option.textContent = platform;
        select.appendChild(option);
    });
    
    return select;
}

function addCommentInput() {
    const container = document.createElement('div');
    container.className = 'comment-input-container';

    const textarea = document.createElement('textarea');
    textarea.className = 'comment-input';
    textarea.placeholder = 'Tulis komentar disini...';

    const platformSelect = createPlatformSelect();

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-comment';
    removeButton.innerHTML = '<i class="fas fa-times"></i>';
    removeButton.onclick = () => {
        if (document.getElementsByClassName('comment-input-container').length > 1) {
            container.remove();
        }
    };

    container.appendChild(textarea);
    container.appendChild(platformSelect);
    container.appendChild(removeButton);

    document.getElementById('commentsContainer').appendChild(container);
}

function cleanText(text) {
    return text.toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .trim();
}

function analyzeSentiment(text) {
    const cleanedText = cleanText(text);
    const words = cleanedText.split(/\s+/);
    
    let positiveScore = 0;
    let negativeScore = 0;

    words.forEach(word => {
        if (positiveWords.includes(word)) positiveScore++;
        if (negativeWords.includes(word)) negativeScore++;
    });

    if (positiveScore > negativeScore) return 'Positif';
    if (negativeScore > positiveScore) return 'Negatif';
    return 'Netral';
}

function getCurrentDateTime() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit', 
        minute: '2-digit'
    };
    return now.toLocaleString('id-ID', options);
}

function getSentimentIcon(sentiment) {
    const icons = {
        'Positif': 'fa-smile',
        'Negatif': 'fa-frown',
        'Netral': 'fa-meh'
    };
    return icons[sentiment] || 'fa-comment';
}

function updateStats(results) {
    const stats = results.reduce((acc, curr) => {
        acc[curr.sentiment.toLowerCase()]++;
        return acc;
    }, { positif: 0, negatif: 0, netral: 0 });

    document.getElementById('totalComments').textContent = results.length;
    document.getElementById('positiveCount').textContent = stats.positif;
    document.getElementById('negativeCount').textContent = stats.negatif;
    document.getElementById('neutralCount').textContent = stats.netral;
}

function analyzeSentiments() {
    const containers = document.getElementsByClassName('comment-input-container');
    let tableContent = '';
    const results = [];

    Array.from(containers).forEach((container, index) => {
        const comment = container.querySelector('.comment-input').value.trim();
        if (!comment) return;

        const platform = container.querySelector('.platform-select').value;
        const sentiment = analyzeSentiment(comment);
        const sentimentClass = sentiment.toLowerCase();
        
        results.push({ sentiment });

        tableContent += `
            <tr>
                <td>${index + 1}</td>
                <td>${getCurrentDateTime()}</td>
                <td>${comment}</td>
                <td>
                    <span class="platform-badge">
                        <i class="fab ${platforms[platform]}"></i>
                        ${platform}
                    </span>
                </td>
                <td>
                    <span class="sentiment-badge ${sentimentClass}">
                        <i class="far ${getSentimentIcon(sentiment)}"></i>
                        ${sentiment}
                    </span>
                </td>
            </tr>
        `;
    });

    document.getElementById('resultsTableBody').innerHTML = tableContent;
    updateStats(results);
}