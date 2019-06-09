const makePoint = (x, y, id) => ({
  id,
  x,
  y,
});

const getDistance = (p1, p2) =>
  Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);

const drawPoint = ({ x, y }, closest, size = 3) => {
  fill(closest ? color(255, 0, 0) : color(255, 20));
  ellipse(x, y, size, size);
};

// Because of implementation, points are already sorted by distance
const drawSpider = (cursor, points) => {
  const distances = points.map(x => getDistance(cursor, x));
  const n = points.length;
  points.forEach(p => {
    const distance = getDistance(cursor, p);
    const opacity = map(distance, distances[0], distances[n - 1], 255, 10);
    const col = color(255, opacity);
    stroke(col);
    line(cursor.x, cursor.y, p.x, p.y);
  });
};
