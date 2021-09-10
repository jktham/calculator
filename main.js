const keys = Array.from(document.querySelectorAll(".key"));

keys.forEach(function(key) {
    key.addEventListener("mousedown", clicked);
});

function clicked(e) {
    let data = e.target.dataset;
    if (data.number) {
        console.log(data.number);
    }
    if (data.operator) {
        console.log(data.operator);
    }
    if (data.action) {
        console.log(data.action);
    }
}