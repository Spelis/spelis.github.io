const displacement = document.getElementById("displacement");
const noise = document.getElementById("noise");


var nextFunc = () => {}
function transitionOut(callback) {
    document.body.style.filter = "url(#transition)"
    const src = new Number(displacement.getAttribute("scale"));
    noise.setAttribute("seed",Math.random() * 1000)
    if (src < 100) {
        displacement.setAttribute("scale", src + 20 + src);
        nextFunc = () => transitionOut(callback)
        requestAnimationFrame(nextFunc)
    } else {
        setTimeout(() =>{
            document.body.style.filter = ""
        },1000);
        callback()
    }
}

function transitionIn() {
    document.body.style.filter = "url(#transition)"
    const src = new Number(displacement.getAttribute("scale"));
    noise.setAttribute("seed",Math.random() * 1000)
    if (src > 0) {
        displacement.setAttribute("scale", src - 1 - (Math.max(src,1)/4));
        nextFunc = () => transitionIn();
        requestAnimationFrame(nextFunc)
    } else {
        displacement.setAttribute("scale", 0);
        document.body.style.filter = ""
    }
}

if (noise && displacement) {
    displacement.setAttribute("scale", 200);
    transitionIn()
    const links = document.querySelectorAll("a");
    links.forEach(l => {    
        if (l.hasAttribute("no-transition")) return;
        if (l.href.startsWith(location.origin)) {
            l.addEventListener("click", (e)=>{
                e.preventDefault()
                displacement.setAttribute("scale", 0);
                transitionOut(() => {
                    location.href = l.href
                });
            })
        }
    })
} else {
    console.log("Can't do transitions!!")
}

// for when going forwards or back
window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
        displacement.setAttribute("scale", 200);
        transitionIn();
    }
});
