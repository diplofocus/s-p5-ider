const k = 2;
const axes = ['x', 'y'];

/*
   In reality, a KDTree in JS doesn't yield many performance benefits,
   especially when taking in to account that all of these particles
   will be moving at some point, thus forcing a new tree to be constructed
   on every frame. This was mostly a learning exercise, turned in to a fun
   visual programming project.
 */

function makeTree(points, depth = 0) {
  const n = points.length;

  // A KD-tree with no points has no point.
  if (n === 0) {
    return null;
  }

  const axis = axes[depth % k];
  const medianIdx = Math.floor(n / 2);

  // Sort elements by direction of axis we're on
  // Also clone the array, because JS sorts in place.
  const sorted = [...points].sort((a, b) => a[axis] - b[axis]);

  const left = sorted.slice(0, medianIdx);
  const right = sorted.slice(medianIdx + 1, n);

  return {
    point: sorted[medianIdx],
    left: makeTree(left, depth + 1),
    right: makeTree(right, depth + 1),
  };
}

// This has is a greedy implementation with edge cases that return
// the wrong answer. Subtrees with better answers can get discarded.
function naiveNS(root, point, depth = 0, best = null) {
  if (root === null) {
    return best;
  }

  const axis = axes[depth % k];

  const nextBest =
    best === null || getDistance(point, best) > getDistance(point, root.point)
      ? root.point
      : best;
  const nextBranch = point[axis] < root.point[axis] ? root.left : root.right;
  return naiveNNS(nextBranch, point, depth + 1, nextBest);
}

function closer(pivot, p1, p2) {
  if (!p1) {
    return p2;
  }
  if (!p2) {
    return p1;
  }

  const d1 = getDistance(pivot, p1);
  const d2 = getDistance(pivot, p2);

  return d1 < d2 ? p1 : p2;
}

function kdtreeNearestNeighbor(root, point, depth = 0) {
  if (root === null) {
    return null;
  }
  const axis = axes[depth % k];

  let nextBranch = null;
  let oppositeBranch = null;
  if (point[axis] < root.point[axis]) {
    nextBranch = root.left;
    oppositeBranch = root.right;
  } else {
    nextBranch = root.right;
    oppositeBranch = root.left;
  }

  let best = closer(
    point,
    kdtreeNearestNeighbor(nextBranch, point, depth + 1),
    root.point
  );

  if (getDistance(point, best) > Math.abs(point[axis] - root.point[axis])) {
    best = closer(
      point,
      kdtreeNearestNeighbor(oppositeBranch, point, depth + 1),
      best
    );
  }

  return best;
}

// TODO: Implement this in a sensible way
// Gets N nearest neighbors, in a naive approach.
const naiveNNS = maxNeighbors => (points, target) => {
  if (maxNeighbors > points.length) {
    console.error('tried finding more neighbors than there are points');
    return null;
  }

  const neighbors = [];
  let pointsToSearch = points;
  while (neighbors.length < maxNeighbors) {
    const root = makeTree(pointsToSearch);
    const neighbor = kdtreeNearestNeighbor(root, target);
    /* const neighbor = bruteNS(pointsToSearch, target); */
    pointsToSearch = pointsToSearch.filter(x => x.id !== neighbor.id);
    neighbors.push(neighbor);
  }

  return neighbors;
};

// Reference implementation
const bruteNS = (points, target) => {
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
