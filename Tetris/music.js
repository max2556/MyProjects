const audio = document.getElementById("audio");
audio.volume = 0.1;
document.onmousemove = () => {
    audio.play();
    audio.muted = false;
}