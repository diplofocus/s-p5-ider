const makePoint = (x, y, id) => ({
  id,
  x,
  y,
});

const getDistance = (p1, p2) =>
  Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);

const drawPoint = ({ x, y }, closest, size = 10) => {
  fill(closest ? '#f00' : '#fff');
  ellipse(x, y, size, size);
};
