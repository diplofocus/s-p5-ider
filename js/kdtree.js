const makePoint = (x, y, id) => ({
  id,
  x,
  y,
});

const getDistance = (p1, p2) =>
  Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);

const bruteNNS = (points, target) => {
  let smallestDist = Infinity;
  let closest = points[0];
  for (let p of points) {
    const currentDistance = getDistance(target, p);
    if (currentDistance < smallestDist) {
      closest = p;
      smallestDist = currentDistance;
    }
  }

  return closest;
};
