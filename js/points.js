const drawPoint = ({ x, y }, closest, size = 10) => {
  fill(closest ? '#f00' : '#fff');
  ellipse(x, y, size, size);
};
