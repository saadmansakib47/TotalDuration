document.getElementById('calculateButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: calculateTotalDuration
        });
    });
});

function calculateTotalDuration() {
    function getDurationInSeconds(duration) {
        const parts = duration.split(':').reverse();
        let seconds = 0;

        if (parts[0]) {
            seconds += parseInt(parts[0]);
        }
        if (parts[1]) {
            seconds += parseInt(parts[1]) * 60;
        }
        if (parts[2]) {
            seconds += parseInt(parts[2]) * 3600;
        }

        return seconds;
    }

    const durations = document.querySelectorAll('ytd-thumbnail-overlay-time-status-renderer');
    let totalDuration = 0;

    durations.forEach((durationElement) => {
        const durationText = durationElement.innerText.trim();
        const durationInSeconds = getDurationInSeconds(durationText);
        totalDuration += durationInSeconds;
    });

    const hours = Math.floor(totalDuration / 3600);
    const minutes = Math.floor((totalDuration % 3600) / 60);
    const seconds = totalDuration % 60;

    const totalDurationText = `${hours}h ${minutes}m ${seconds}s`;

    const resultElement = document.createElement('div');
    resultElement.style.fontSize = '18px';
    resultElement.style.fontWeight = 'bold';
    resultElement.style.margin = '10px 0';
    resultElement.textContent = `Total Playlist Duration: ${totalDurationText}`;

    document.body.appendChild(resultElement);
}
