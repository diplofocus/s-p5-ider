const N = 100;
let points;

function setup() {
  createCanvas(windowWidth, windowHeight);
  points = Array.from(Array(100)).map((_, idx) =>
    makePoint(Math.random() * windowWidth, Math.random() * windowHeight, idx)
  );
}

function draw() {
  background(36);
  const cursorPoint = makePoint(mouseX, mouseY);
  const root = makeTree(points);
  /* const { id } = kdtreeNearestNeighbor(root, cursorPoint); */
  const neighbors = naiveNNS(10)(points, cursorPoint);
  const neighborIds = neighbors.map(x => x.id);
  points.forEach(p => drawPoint(p, neighborIds.includes(p.id)));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
