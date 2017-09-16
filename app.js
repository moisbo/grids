function toggle(name, id, o) {
  const help = document.getElementById(id);
  if (help.className === 'show') {
    help.className = 'hide';
    o.innerHTML = 'Show ' + name;
  } else {
    help.className = 'show';
    o.innerHTML = 'Hide ' + name;
  }
}

function grid(o) {
  //grid
  const grid = document.getElementById('grid');
  const gridDim = {width: grid.getAttribute('width'), height: grid.getAttribute('height')};
  grid.setAttribute('width', o.gridDimWidth || gridDim.width);
  grid.setAttribute('height', o.gridDimHeight || gridDim.height);
  //gridPath
  const path = document.getElementById('gridPath');
  const d = path.getAttribute('d');
  const ds = d.split(/\s/);
  o.A = o.gridDimWidth || o.A;
  o.F = o.gridDimHeight || o.F;
  const newD = `M ${o.A || ds[1]} ${o.B || ds[2]} L ${o.C || ds[4]} ${o.D || ds[5]} ${o.E || ds[6]} ${o.F || ds[7]}`;
  path.setAttribute('d', newD);
  //stroke-width
  const strokeWidth = path.getAttribute('stroke-width');
  path.setAttribute('stroke-width', o.strokeWidth || strokeWidth);
  //color
  if (o.color) {
    const strokeColor = path.getAttribute('stroke');
    path.setAttribute('stroke', o.color.toRGBString() || strokeColor);
  }
  //rect
  const rect = document.getElementById('rect');
  const rectDim = {width: rect.getAttribute('width'), height: rect.getAttribute('height')};
  rect.setAttribute('width', o.gridDimWidth || rectDim.width);
  rect.setAttribute('height', o.gridDimHeight || rectDim.height);
}

function smallGrid(o) {
  //smallPath
  const path = document.getElementById('smallPath');
  const d = path.getAttribute('d');
  const ds = d.split(/\s/);
  o.A = o.gridDimWidth || o.A;
  o.F = o.gridDimHeight || o.F;
  const newD = `M ${o.A || ds[1]} ${o.B || ds[2]} L ${o.C || ds[4]} ${o.D || ds[5]} ${o.E || ds[6]} ${o.F || ds[7]}`;
  path.setAttribute('d', newD);
  //stroke-width
  const strokeWidth = path.getAttribute('stroke-width');
  path.setAttribute('stroke-width', o.strokeWidth || strokeWidth);
  //color
  if (o.color) {
    const strokeColor = path.getAttribute('stroke');
    path.setAttribute('stroke', o.color.toRGBString() || strokeColor);
  }
  //rect
  const rect = document.getElementById('smallRect');
  const rectDim = {width: rect.getAttribute('width'), height: rect.getAttribute('height')};
  rect.setAttribute('width', o.rectDimWidth || rectDim.width);
  rect.setAttribute('height', o.rectDimHeight || rectDim.height);
  //smallGrid
  const grid = document.getElementById('smallGrid');
  const gridDim = {width: grid.getAttribute('width'), height: grid.getAttribute('height')};
  grid.setAttribute('width', o.gridDimWidth || gridDim.width);
  grid.setAttribute('height', o.gridDimHeight || gridDim.height);
}

function stich(o) {
  const widthSmallGrid = document.getElementById('widthSmallGrid');
  const width = Math.round(377 / o.value);
  widthSmallGrid.value = width;
  const widthGrid = document.getElementById('widthGrid');
  widthGrid.value = width * 5;
  smallGrid({gridDimWidth: width});
  grid({gridDimWidth: width * 5});
}

function row(o) {
  const heightSmallGrid = document.getElementById('heightSmallGrid');
  const height = Math.round(377 / o.value);
  heightSmallGrid.value = height;
  const heightGrid = document.getElementById('heightGrid');
  heightGrid.value = height * 5;
  smallGrid({gridDimHeight: height});
  grid({gridDimHeight: height * 5});
}

function resize() {
  const svg = document.getElementById('svg');
  const width = document.getElementById('width');
  const height = document.getElementById('height');
  svg.setAttribute('width', width.value + 'mm');
  svg.setAttribute('height', height.value + 'mm');
}


function generateSVG() {
  //get svg element.
  const svg = document.getElementById("svg");

  //get svg source.
  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svg);

  //add name spaces.
  if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
    source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  }

  //add xml declaration
  source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

  //convert svg source to URI data scheme.
  const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

  //set url value to a element's href attribute.
  document.getElementById("link").href = url;
  document.getElementById("link").className = "show"
  //you can download svg file by right click menu.
}
