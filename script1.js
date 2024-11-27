function openGift() {
    let giftBox = document.getElementById("giftBox");
    giftBox.classList.add("open-animation");
    
    let music = document.getElementById("music");
    music.muted = false;
    music.volume = 0.2;

    setTimeout(() => {
        window.location.href = "index3.html";
    }, 1500);  // Transition after animation
}
