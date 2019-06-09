const pointCoords = [[100, 200], [200, 330], [150, 80], [18, 360]];

const points = pointCoords.map((x, idx) => makePoint(...x, idx));

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(36);
  const { id } = bruteNNS(points, makePoint(mouseX, mouseY));
  points.forEach(p => drawPoint(p, id === p.id));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
