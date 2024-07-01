document.addEventListener('DOMContentLoaded', function () {
    const openPopupButton = document.getElementById('openPopup');
    const closePopupButton = document.getElementById('closePopup');
    const videoPopup = document.getElementById('videoPopup');
    const videoPlayer = document.getElementById('videoPlayer');

    openPopupButton.addEventListener('click', function () {
        videoPopup.style.display = 'block';
        videoPlayer.play();
    });

    closePopupButton.addEventListener('click', function () {
        videoPopup.style.display = 'none';
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    });

    window.addEventListener('click', function (event) {
        if (event.target == videoPopup) {
            videoPopup.style.display = 'none';
            videoPlayer.pause();
            videoPlayer.currentTime = 0;
        }
    });
});