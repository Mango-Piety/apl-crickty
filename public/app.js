const EMOTION_COLORS = {
    "Euphoria": "#6ffbbe", // tertiary-fixed
    "Excitement": "#adc6ff", // secondary
    "Neutral": "#d0c6ab", // on-surface-variant
    "Frustration": "#ffb4ab", // error
    "Disbelief": "#ffdad6" // on-error-container
};

const EMOTION_EMOJIS = {
    "Euphoria": "🔥",
    "Excitement": "😃",
    "Neutral": "😐",
    "Frustration": "😤",
    "Disbelief": "😱"
};

let chartInstance = null;
const maxDataPoints = 15;

function initChart() {
    const ctx = document.getElementById('pulseChart').getContext('2d');

    // Gradient for the line
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(255, 215, 0, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 215, 0, 0.0)');

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Sentiment Score',
                data: [],
                borderColor: '#ffd700',
                backgroundColor: gradient,
                borderWidth: 3,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#ffd700',
                pointBorderWidth: 2,
                pointRadius: 4,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min: -1,
                    max: 1,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#94a3b8' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8' }
                }
            },
            plugins: {
                legend: { display: false }
            },
            animation: { duration: 800 }
        }
    });
}

function updateChart(score) {
    const timeLabel = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    chartInstance.data.labels.push(timeLabel);
    chartInstance.data.datasets[0].data.push(score);

    if (chartInstance.data.labels.length > maxDataPoints) {
        chartInstance.data.labels.shift();
        chartInstance.data.datasets[0].data.shift();
    }

    chartInstance.update();
}

function updateGauge(score, emotion) {
    const gaugeCircle = document.getElementById('emotion-gauge-circle');
    const scoreText = document.getElementById('emotion-score-text');
    const labelText = document.getElementById('emotion-label');

    // Score is -1 to 1. Convert to 0 to 100%
    const percentage = Math.round(((score + 1) / 2) * 100);
    scoreText.innerText = `${percentage}%`;

    // 691 is circumference. Dash offset: 691 (empty) to 0 (full)
    // Actually, we want a gauge from bottom left to bottom right. Let's just do standard mapping.
    // 691 * (1 - percentage/100)
    const dashoffset = 691 - (691 * (percentage / 100));
    gaugeCircle.style.strokeDashoffset = dashoffset;

    // Update color
    const color = EMOTION_COLORS[emotion] || "#e9c400";
    gaugeCircle.style.color = color;
    gaugeCircle.style.filter = `drop-shadow(0 0 8px ${color}80)`;
    scoreText.style.color = color;

    // Update text
    labelText.innerText = `${emotion} ${EMOTION_EMOJIS[emotion] || ""}`;
}

function updateFeed(samples, emotion) {
    const container = document.getElementById('live-feed-container');
    container.innerHTML = ""; // Clear current feed

    const color = EMOTION_COLORS[emotion] || "#e9c400";

    samples.forEach(sample => {
        const itemHtml = `
        <div class="p-4 bg-white/5 rounded-lg border-l-4 hover:bg-white/10 transition-all group" style="border-color: ${color}">
            <div class="flex justify-between items-start mb-2">
                <div class="flex items-center gap-2">
                    <span class="font-data-mono text-xs text-yellow-400">u/${sample.author}</span>
                    <span class="text-[10px] text-slate-500 font-body-md">${sample.time} via ${sample.source}</span>
                </div>
                <span class="px-2 py-0.5 text-[10px] font-bold rounded uppercase" style="background-color: ${color}20; color: ${color}">${emotion}</span>
            </div>
            <p class="text-sm font-body-md text-on-background leading-relaxed">${sample.text}</p>
        </div>
        `;
        container.innerHTML += itemHtml;
    });
}

async function fetchEmotion() {
    try {
        // REPLACE WITH YOUR JSONBIN BIN ID
        const BIN_ID = "69e8fa9e36566621a8de74b3";

        // If your JSONBin is public, you only need the URL.
        const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`);
        if (!response.ok) throw new Error("API failed");

        const json = await response.json();

        // JSONBin wraps data inside a "record" object
        const data = json.record;

        updateGauge(data.score, data.emotion);
        updateChart(data.score);
        updateFeed(data.samples, data.emotion);

    } catch (err) {
        console.error("Error fetching emotion:", err);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initChart();
    fetchEmotion(); // Initial fetch

    // Poll every 10 seconds
    setInterval(fetchEmotion, 10000);
});
