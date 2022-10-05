
// You can change global variables here:
var radius = 540; // how big of the radius
var autoRotate = true; // auto rotate or not
var rotateSpeed = -60; // unit: seconds/360 degrees
var imgWidth = 240; // width of images (unit: px)
var imgHeight = 340; // height of images (unit: px)

var check = false;
// ===================== start =======================
// animation start after 1000 miliseconds
setTimeout(init, 1000);

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aVid = ospin.getElementsByTagName('video');
var aEle = [...aImg, ...aVid]; // combine 2 arrays
var imgg = document.getElementsByClassName("imggg");

// Size of images
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

// Size of ground - depend on radius
var ground = document.getElementById('ground');
ground.style.width = radius * 1 + "px";
ground.style.height = radius * 1 + "px";

function init(delayTime) {
    for (var i = 0; i < aEle.length; i++) {
        aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
        aEle[i].style.transition = "transform 1s";
        aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
    }
}

if (autoRotate) {
    rotateSpeed = -60
    var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
    ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}


function zoomm(tmp) {
    document.getElementById('modal').style.display = "flex"
    document.getElementById('modal_body').innerHTML = '<img onclick=\'outt("' + tmp + '")\' id = "' + tmp + '"  class="imggg" src="' + tmp + '" alt="">';
}
function outt(tmp) {
    document.getElementById('modal').style.display = "none"
    var child = document.getElementById(tmp);
    child.remove(tmp_delete);
}

function applyTranform(obj) {
    // Constrain the angle of camera (between 0 and 180)
    if (tY > 180) tY = 180;
    if (tY < 0) tY = 0;

    // Apply the angle
    obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
    ospin.style.animationPlayState = (yes ? 'running' : 'paused');
}

var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;

// setup events
document.onpointerdown = function (e) {
    clearInterval(odrag.timer);
    e = e || window.event;
    var sX = e.clientX,
        sY = e.clientY;

    this.onpointermove = function (e) {
        e = e || window.event;
        var nX = e.clientX,
            nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTranform(odrag);
        sX = nX;
        sY = nY;
    };

    this.onpointerup = function (e) {
        odrag.timer = setInterval(function () {
            desX *= 0.95;
            desY *= 0.95;
            tX += desX * 0.1;
            tY += desY * 0.1;
            applyTranform(odrag);
            playSpin(false);
            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                clearInterval(odrag.timer);
                playSpin(true);
            }
        }, 17);
        this.onpointermove = this.onpointerup = null;
    };

    return false;
};

document.onmousewheel = function (e) {
    e = e || window.event;
    var d = e.wheelDelta / 20 || -e.detail;
    radius += d;
    init(1);
};


var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    things = [],
    things2 = [],
    things3 = [],
    thingsCount = 25,
    mouse = {
        x: -100,
        y: -100
    },
    minDist = 150;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// object image
var image = new Image();
var image2 = new Image();
var image3 = new Image();
image.src = 'icon/icon1.png';
image2.src = 'icon/icon2.png';
image3.src = 'icon/icon3.png';
for (var i = 0; i < thingsCount; i++) {
    let opacity = Math.random() + 0.4;
    let thingWidth = (Math.floor(Math.random() * 20) + 20) * (opacity + 0.4);
    let thingHeight = image.naturalHeight / image.naturalWidth * thingWidth;
    let speed = Math.random() * 1 + 0.5;
    things.push({
        width: thingWidth,
        height: thingHeight,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - thingHeight,
        speed: speed,
        vY: speed,
        vX: 0,
        d: Math.random() * 1.2 - 0.6, // wind or something like that
        stepSize: (Math.random()) / 20,
        step: 0,
        angle: Math.random() * 180 - 90,
        rad: Math.random(),
        opacity: opacity,
        _ratate: Math.random() // ratate 正負
    });
    things2.push({
        width: thingWidth,
        height: thingHeight,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - thingHeight,
        speed: speed,
        vY: speed,
        vX: 0,
        d: Math.random() * 1.2 - 0.6, // wind or something like that
        stepSize: (Math.random()) / 20,
        step: 0,
        angle: Math.random() * 180 - 90,
        rad: Math.random(),
        opacity: opacity,
        _ratate: Math.random() // ratate 正負
    });
    things3.push({
        width: thingWidth,
        height: thingHeight,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - thingHeight,
        speed: speed,
        vY: speed,
        vX: 0,
        d: Math.random() * 1.2 - 0.6, // wind or something like that
        stepSize: (Math.random()) / 20,
        step: 0,
        angle: Math.random() * 180 - 90,
        rad: Math.random(),
        opacity: opacity,
        _ratate: Math.random() // ratate 正負
    });
}

function drawThings() {
    things.map((thing) => {
        ctx.beginPath();
        thing.rad = (thing.angle * Math.PI) / 180;
        ctx.save();
        var cx = thing.x + thing.width / 2;
        var cy = thing.y + thing.height / 2;
        ctx.globalAlpha = thing.opacity;
        ctx.setTransform(
            Math.cos(thing.rad),
            Math.sin(thing.rad),
            -Math.sin(thing.rad),
            Math.cos(thing.rad),
            cx - cx * Math.cos(thing.rad) + cy * Math.sin(thing.rad),
            cy - cx * Math.sin(thing.rad) - cy * Math.cos(thing.rad)
        );
        ctx.drawImage(image, thing.x, thing.y, thing.width, thing.height);
        ctx.restore();
    });
    things2.map((thing) => {
        ctx.beginPath();
        thing.rad = (thing.angle * Math.PI) / 180;
        ctx.save();
        var cx = thing.x + thing.width / 2;
        var cy = thing.y + thing.height / 2;
        ctx.globalAlpha = thing.opacity;
        ctx.setTransform(
            Math.cos(thing.rad),
            Math.sin(thing.rad),
            -Math.sin(thing.rad),
            Math.cos(thing.rad),
            cx - cx * Math.cos(thing.rad) + cy * Math.sin(thing.rad),
            cy - cx * Math.sin(thing.rad) - cy * Math.cos(thing.rad)
        );
        ctx.drawImage(image2, thing.x + 50, thing.y + 20, thing.width, thing.height);
        ctx.restore();
    });
    things3.map((thing) => {
        ctx.beginPath();
        thing.rad = (thing.angle * Math.PI) / 180;
        ctx.save();
        var cx = thing.x + thing.width / 2;
        var cy = thing.y + thing.height / 2;
        ctx.globalAlpha = thing.opacity;
        ctx.setTransform(
            Math.cos(thing.rad),
            Math.sin(thing.rad),
            -Math.sin(thing.rad),
            Math.cos(thing.rad),
            cx - cx * Math.cos(thing.rad) + cy * Math.sin(thing.rad),
            cy - cx * Math.sin(thing.rad) - cy * Math.cos(thing.rad)
        );
        ctx.drawImage(image3, thing.x + 50, thing.y + 20, thing.width, thing.height);
        ctx.restore();
    });
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawThings();
}

function update() {
    things.map((thing) => {
        var dist = Math.sqrt((thing.x - mouse.x) ** 2 + (thing.y - mouse.y) ** 2);

        if (dist < minDist) {
            var force = minDist / (dist * dist),
                xcomp = (mouse.x - thing.x) / dist,
                ycomp = (mouse.y - thing.y) / dist,
                deltaV = force * 2; // deplay when hover mouse

            thing.vX -= deltaV * xcomp;
            thing.vY -= deltaV * ycomp;

            if (thing.d * xcomp > 0) {
                thing.d = 0 - thing.d;
            }
        } else {
            thing.vX *= .98;

            if (thing.vY < thing.speed) {
                thing.vY = thing.speed
            }

            thing.vX += Math.cos(thing.step += (Math.random() * 0.05)) * thing.stepSize;
        }

        thing.y += thing.vY;
        thing.x += thing.vX + thing.d;

        var _angle = Math.random() + 0.2;
        // stuff.angle += _angle;
        if (thing._ratate == 0) {
            thing.angle += _angle;
        } else {
            thing.angle -= _angle;
        }

        if (thing.y > canvas.height) {
            reset(thing);
        }

        if (thing.x > canvas.width || thing.x < (0 - thing.width)) {
            reset(thing);
        }
    });
    things2.map((thing) => {
        var dist = Math.sqrt((thing.x - mouse.x) ** 2 + (thing.y - mouse.y) ** 2);

        if (dist < minDist) {
            var force = minDist / (dist * dist),
                xcomp = (mouse.x - thing.x) / dist,
                ycomp = (mouse.y - thing.y) / dist,
                deltaV = force * 2; // deplay when hover mouse

            thing.vX -= deltaV * xcomp;
            thing.vY -= deltaV * ycomp;

            if (thing.d * xcomp > 0) {
                thing.d = 0 - thing.d;
            }
        } else {
            thing.vX *= .98;

            if (thing.vY < thing.speed) {
                thing.vY = thing.speed
            }

            thing.vX += Math.cos(thing.step += (Math.random() * 0.05)) * thing.stepSize;
        }

        thing.y += thing.vY;
        thing.x += thing.vX + thing.d;

        var _angle = Math.random() + 0.2;
        // stuff.angle += _angle;
        if (thing._ratate == 0) {
            thing.angle += _angle;
        } else {
            thing.angle -= _angle;
        }

        if (thing.y > canvas.height) {
            reset(thing);
        }

        if (thing.x > canvas.width || thing.x < (0 - thing.width)) {
            reset(thing);
        }
    });
    things3.map((thing) => {
        var dist = Math.sqrt((thing.x - mouse.x) ** 2 + (thing.y - mouse.y) ** 2);

        if (dist < minDist) {
            var force = minDist / (dist * dist),
                xcomp = (mouse.x - thing.x) / dist,
                ycomp = (mouse.y - thing.y) / dist,
                deltaV = force * 2; // deplay when hover mouse

            thing.vX -= deltaV * xcomp;
            thing.vY -= deltaV * ycomp;

            if (thing.d * xcomp > 0) {
                thing.d = 0 - thing.d;
            }
        } else {
            thing.vX *= .98;

            if (thing.vY < thing.speed) {
                thing.vY = thing.speed
            }

            thing.vX += Math.cos(thing.step += (Math.random() * 0.05)) * thing.stepSize;
        }

        thing.y += thing.vY;
        thing.x += thing.vX + thing.d;

        var _angle = Math.random() + 0.2;
        // stuff.angle += _angle;
        if (thing._ratate == 0) {
            thing.angle += _angle;
        } else {
            thing.angle -= _angle;
        }

        if (thing.y > canvas.height) {
            reset(thing);
        }

        if (thing.x > canvas.width || thing.x < (0 - thing.width)) {
            reset(thing);
        }
    });
}

function reset(thing) {
    thing.opacity = Math.random() + 0.4;
    thing.width = (Math.floor(Math.random() * 20) + 20) * (thing.opacity + 0.4);
    thing.height = image.naturalHeight / image.naturalWidth * thing.width;
    thing.x = Math.floor(Math.random() * canvas.width);
    thing.y = 0 - thing.height;
    thing.speed = Math.random() * 1 + 0.5
    thing.vY = thing.speed;
    thing.vX = 0;
    // thing.angle = 0;
    // thing.size = 0;
    thing._ratate = Math.random();
}

canvas.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function tick() {
    draw();
    update();
    requestAnimationFrame(tick);
}

tick();

