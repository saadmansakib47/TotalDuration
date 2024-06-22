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

function calculateTotalDuration() {
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

    const totalDurationElement = document.createElement('div');
    totalDurationElement.style.fontSize = '18px';
    totalDurationElement.style.fontWeight = 'bold';
    totalDurationElement.style.margin = '10px 0';
    totalDurationElement.textContent = `Total Playlist Duration: ${totalDurationText}`;

    const parentElement = document.querySelector('#page-manager ytd-playlist-sidebar-renderer');
    if (parentElement) {
        parentElement.appendChild(totalDurationElement);
    }
}

calculateTotalDuration();
