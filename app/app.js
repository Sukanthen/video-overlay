function onCvLoaded() {
    console.log('cv', cv);
    cv.onRuntimeInitialized = onReady;
}

const video = document.getElementById('video');
const actionBtn = document.getElementById('actionBtn');
const FPS = 30;

let stream;
let streaming = false;

function onReady() {
    console.log('ready');
    let src;
    let dst;
    let cap;

    video.controls = true;
    video.addEventListener('play', start);
    video.addEventListener('pause', stop);
    video.addEventListener('ended', stop);

    function start() {
        console.log('playing...');
        streaming = true;
        const width = video.width;
        const height = video.height;
        src = new cv.Mat(height, width, cv.CV_8UC4);
        dst = new cv.Mat(height, width, cv.CV_8UC1);
        cap = new cv.VideoCapture(video);
        setTimeout(processVideo, 0);
    }

    function stop() {
        console.log('paused or ended');
        streaming = false;
    }

    function processVideo() {
        if (!streaming) {
            src.delete();
            dst.delete();
            return;
        }
        const begin = Date.now();
        cap.read(src)
        cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
        cv.imshow('canvasOutput', dst);
        const delay = 1000 / FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
    }
}

