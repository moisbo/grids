function toggleHelp(o) {
  const help = document.getElementById('help');
  if (help.className === 'show-help') {
    help.className = 'hide-help';
    o.innerHTML = 'Show Help';
  } else {
    help.className = 'show-help';
    o.innerHTML = 'Hide Help';
  }
}

function grid(o) {
  //grid
  const grid = document.getElementById('grid');
  const gridDim = {width: grid.getAttribute('width'), height: grid.getAttribute('height')};
  grid.setAttribute('width', o.gridDimWidth || gridDim.width);
  grid.setAttribute('height', o.gridDimWidth || gridDim.height);
  //gridPath
  const path = document.getElementById('gridPath');
  const d = path.getAttribute('d');
  const ds = d.split(/\s/);
  let s = o.A || o.F || o.gridDimWidth || o.gridDimWidth || o.rectDimWidth;
  const newD = `M ${s || ds[1]} ${o.B || ds[2]} L ${o.C || ds[4]} ${o.D || ds[5]} ${o.E || ds[6]} ${s || ds[7]}`;
  path.setAttribute('d', newD);
  //stroke-width
  const strokeWidth = path.getAttribute('stroke-width');
  path.setAttribute('stroke-width', o.strokeWidth || strokeWidth);
  //color
  const strokeColor = path.getAttribute('stroke');
  path.setAttribute('stroke', o.color || strokeColor);
  //rect
  const rect = document.getElementById('rect');
  const rectDim = {width: rect.getAttribute('width'), height: rect.getAttribute('height')};
  rect.setAttribute('width', o.gridDimWidth || rectDim.width);
  rect.setAttribute('height', o.gridDimWidth || rectDim.height);
}

function smallGrid(o) {
  //smallPath
  const path = document.getElementById('smallPath');
  const d = path.getAttribute('d');
  const ds = d.split(/\s/);
  let s = o.A || o.F || o.gridDimWidth;
  const newD = `M ${s || ds[1]} ${o.B || ds[2]} L ${o.C || ds[4]} ${o.D || ds[5]} ${o.E || ds[6]} ${s || ds[7]}`;
  path.setAttribute('d', newD);
  //stroke-width
  const strokeWidth = path.getAttribute('stroke-width');
  path.setAttribute('stroke-width', o.strokeWidth || strokeWidth);
  //color
  const strokeColor = path.getAttribute('stroke');
  path.setAttribute('stroke', o.color || strokeColor);
  //rect
  const rect = document.getElementById('smalRect');
  const rectDim = {width: rect.getAttribute('width'), height: rect.getAttribute('height')};
  rect.setAttribute('width', o.rectDimWidth || rectDim.width);
  rect.setAttribute('height', o.rectDimWidth || rectDim.height);
  //smallGrid
  const grid = document.getElementById('smallGrid');
  const gridDim = {width: grid.getAttribute('width'), height: grid.getAttribute('height')};
  grid.setAttribute('width', o.gridDimWidth || gridDim.width);
  grid.setAttribute('height', o.gridDimWidth || gridDim.height);
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
  document.getElementById("link").style = "display:inline;"
  //you can download svg file by right click menu.
}
