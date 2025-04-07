function updateData() {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            document.getElementById('moisture').innerText = data.moisture + '%';
            document.getElementById('pump').innerText = data.pump ? 'ON' : 'OFF';
            document.getElementById('mode').innerText = data.autoMode ? 'Automatic' : 'Manual';
            document.getElementById('modeSwitch').innerText = data.autoMode ? "Switch to Manual Mode" : "Switch to Automatic Mode";
        });
}
setInterval(updateData, 1000);
