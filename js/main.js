const N = 200;
const N_NEIGHBORS = 30;
let points;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();
  points = Array.from(Array(N)).map((_, idx) =>
    makePoint(Math.random() * windowWidth, Math.random() * windowHeight, idx)
  );
}
window.addEventListener('resize', setup);

function draw() {
  background(36);
  const cursorPoint = makePoint(mouseX, mouseY);
  const root = makeTree(points);
  const neighbors = naiveNNS(N_NEIGHBORS)(points, cursorPoint);
  drawSpider(cursorPoint, neighbors);
  points.forEach(p => drawPoint(p));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
