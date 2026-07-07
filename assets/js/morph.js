const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@._-";

function morph(element, target) {
    clearInterval(element._timer);

    const start = element.textContent;
    const length = Math.max(start.length, target.length);

    let progress = 0;

    element._timer = setInterval(() => {
        progress += 0.05;

        const currentLength = Math.round(
            start.length + (target.length - start.length) * progress
        );

        let output = "";

        for (let i = 0; i < currentLength; i++) {
            if (progress > i / currentLength + 0.2 && target[i]) {
                output += target[i];
            } else {
                output += CHARS[Math.floor(Math.random() * CHARS.length)];
            }
        }

        element.textContent = output;

        if (progress >= 1) {
            clearInterval(element._timer);
            element.textContent = target;
        }
    }, 15);
}

for (const link of document.querySelectorAll(".morph")) {
    const original = link.textContent;
    const alternate = link.dataset.alt;

    link.addEventListener("mouseenter", () => morph(link, alternate));
    link.addEventListener("mouseleave", () => morph(link, original));
}
