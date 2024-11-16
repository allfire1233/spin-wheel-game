function shuffle(array){
    var currentIndex = array.length,
    ramdomIndex;
    while(0 !== currentIndex){
    ramdomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex],array[ramdomIndex]] =  [
        array[currentIndex],
        array[currentIndex],
    ];
}
return array
}

function spin(){
    wheel.play();
    const box = document.getElementById("box");
    const element = document.getElementById("mainbox");
    let SelectedItem = "";
    
    let prize1 = shuffle ([1890, 2250, 2610]);
    let prize2 = shuffle ([1850, 2210, 2570]);
    let prize3 = shuffle ([1770, 2139, 2490]);
    let prize4 = shuffle ([1870, 2170, 2530]);
    let prize5 = shuffle ([1750, 2110, 2470]);
    let prize6 = shuffle ([1630, 1990, 2350]);
    let prize7 = shuffle ([1570, 1930, 2290]);

    let results = shuffle ([
        prize1[0],
        prize2[0],
        prize3[0],
        prize4[0],
        prize5[0],
        prize6[0],
        prize7[0],
    ]);


    if(prize1.includes(results[0])) SelectedItem = "Air conditioner";
    if(prize2.includes(results[0])) SelectedItem = "Camera sport Action";
    if(prize3.includes(results[0])) SelectedItem = "next time";
    if(prize4.includes(results[0])) SelectedItem = "Playstation";
    if(prize5.includes(results[0])) SelectedItem = "Headset Gaming";
    if(prize6.includes(results[0])) SelectedItem = "Drone Mini";
    if(prize7.includes(results[0])) SelectedItem = "Laptop Asus ROG";

    box.style.setProperty("transition", "all ease 5s");
    box.style.transform = "rotate(" + results[0] + "deg)";
    element.classList.remove("animate");
    setTimeout(function(){
        element.classList.add("animate");
    }, 5000),

    setTimeout(function(){
        applause.play();
        Swal.fire({
            title: "Horray...",
            html: 'you won ' + SelectedItem + ' | ' + '<a href="#">Claim Now</a>',
            imageUrl: "https://unsplash.it/400/200",
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "Custom image"
          });
    }, 5500)
    setTimeout(function(){
      box.style.setProperty("transition", "initial");
      box.style.transform = "rotate(90deg)";
    }, 6000)
}


const circle = document.querySelector('.circle');
const numDots = 65; // Số lượng đốm
const radiusBorder = 180; // Bán kính của vòng tròn (phải bằng một nửa chiều rộng/chiều cao của .circle)

for (let i = 0; i < numDots; i++) {
    const angle = (i / numDots) * 2 * Math.PI; // Tính góc cho mỗi đốm
    const x = radiusBorder + radiusBorder * Math.cos(angle); // Tính tọa độ x
    const y = radiusBorder + radiusBorder * Math.sin(angle); // Tính tọa độ y

    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    circle.appendChild(dot);
}


function toRad(deg) {
    return deg * (Math.PI / 180.0);
}
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function easeOutSine(x) {
    return Math.sin((x * Math.PI) / 2);
}
function getPercent(input, min, max) {
    return (((input - min) * 100) / (max - min)) / 100;
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = document.getElementById("canvas").width;
const height = document.getElementById("canvas").height;

const centerX = width / 2;
const centerY = height / 2;
const radius = width / 2;

let items = ["cat", "dog", "cow", "sheep", "chicken", "mike"];
let colors = [
    { r: 255, g: 244, b: 91 },
    { r: 255, g: 49, b: 26 }
];

let currentDeg = 0;
let step = 360 / items.length;

function draw() {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, toRad(0), toRad(360));
    ctx.lineTo(centerX, centerY);
    ctx.fill();

    let startDeg = currentDeg;
    for (let i = 0; i < items.length; i++, startDeg += step) {
        let endDeg = startDeg + step;
        let color = colors[i % 2];
        let colorStyle = `rgb(${color.r},${color.g},${color.b})`;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, toRad(startDeg), toRad(endDeg));
        let colorStyle2 = `rgb(${color.r - 30}, ${color.g - 30}, ${color.b - 0})`;
        ctx.fillStyle = colorStyle2;
        ctx.lineTo(centerX, centerY);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - 20, toRad(startDeg), toRad(endDeg));
        ctx.fillStyle = colorStyle;
        ctx.lineTo(centerX, centerY);
        ctx.fill();

        let colorStyle3 = `rgb(${color.r + 30}, ${color.g + 30}, ${color.b + 30})`;
        ctx.beginPath();
        ctx.arc(centerX, centerY, (radius - 50), toRad(startDeg), toRad(endDeg));
        ctx.fillStyle = colorStyle3;
        ctx.lineTo(centerX, centerY);
        ctx.fill();

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(toRad((startDeg + endDeg) / 2));
        ctx.textAlign = "center";
        ctx.fillStyle = color.r > 150 || color.g > 150 || color.b > 150 ? "#000" : "#fff";
        ctx.font = 'bold 24px serif';
        ctx.fillText(items[i], 130, 10);
        ctx.restore();

        if ((startDeg % 360 >= 180 && startDeg % 360 < 270)) {
            document.getElementById("winner").innerHTML = items[i];
        }
    }
}

draw();

let speed = 0;
let maxRotation = randomRange(360 * 3, 360 * 6);
let pause = false;

function animate() {
    if (pause) {
        return;
    }
    speed = easeOutSine(getPercent(currentDeg, maxRotation, 0)) * 20;
    if (speed < 0.01) {
        speed = 0;
        pause = true;
    }
    currentDeg += speed;
    draw();
    window.requestAnimationFrame(animate);
}

function spin() {
    if (speed != 0) {
        return;
    }
    currentDeg = 0;
    maxRotation = randomRange(360 * 3, 360 * 6);
    pause = false;
    window.requestAnimationFrame(animate);
}
