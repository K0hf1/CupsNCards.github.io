const track = document.getElementById("image-track");
let nextPercentage = 0;

const maxPercentage = 100;

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
    track.dataset.prevPercentage = nextPercentage;
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.percentage = nextPercentage;

    updateImagePositions();
}

window.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * 100;
    nextPercentage = parseFloat(track.dataset.prevPercentage) - percentage;

    nextPercentage = Math.max(-maxPercentage, Math.min(maxPercentage, nextPercentage));

    track.dataset.percentage = nextPercentage;

    track.animate(
        { transform: `translate(${nextPercentage}%, 0%)` },
        { duration: 1200, fill: "forwards" }
    );

    updateImagePositions();
}

function updateImagePositions() {
    for (const [index, image] of [...track.getElementsByClassName("image")].entries()) {
        const imagePercentage = nextPercentage * (index + 1);

        image.animate(
            { objectPosition: `${100 + nextPercentage}% center` },
            { duration: 1200, fill: "forwards" }
        );
    }
}
