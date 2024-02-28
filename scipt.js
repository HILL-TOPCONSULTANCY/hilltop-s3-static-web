document.addEventListener('DOMContentLoaded', () => {
    const titles = ["My Love", "My Heartbeat", "My Everything"];
    let currentIndex = 0;

    const updateTitle = () => {
        document.getElementById('dynamicTitle').innerText = titles[currentIndex];
        currentIndex = (currentIndex + 1) % titles.length;
    };

    setInterval(updateTitle, 3000); // Change title every 3 seconds
});
