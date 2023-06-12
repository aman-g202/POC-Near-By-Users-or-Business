var BITS = [16, 8, 4, 2, 1];

var BASE32 = "0123456789bcdefghjkmnpqrstuvwxyz";
var NEIGHBORS = {
  right: { even: "bc01fg45238967deuvhjyznpkmstqrwx" },
  left: { even: "238967debc01fg45kmstqrwxuvhjyznp" },
  top: { even: "p0r21436x8zb9dcf5h7kjnmqesgutwvy" },
  bottom: { even: "14365h7k9dcfesgujnmqp0r2twvyx8zb" },
};
var BORDERS = {
  right: { even: "bcfguvyz" },
  left: { even: "0145hjnp" },
  top: { even: "prxz" },
  bottom: { even: "028b" },
};

NEIGHBORS.bottom.odd = NEIGHBORS.left.even;
NEIGHBORS.top.odd = NEIGHBORS.right.even;
NEIGHBORS.left.odd = NEIGHBORS.bottom.even;
NEIGHBORS.right.odd = NEIGHBORS.top.even;

BORDERS.bottom.odd = BORDERS.left.even;
BORDERS.top.odd = BORDERS.right.even;
BORDERS.left.odd = BORDERS.bottom.even;
BORDERS.right.odd = BORDERS.top.even;

function encodeGeoHash(latitude, longitude, precision) {
  var is_even = 1;
  var i = 0;
  var lat = [];
  var lon = [];
  var bit = 0;
  var ch = 0;
  var precision = precision ?? 12;
  geohash = "";

  lat[0] = -90.0;
  lat[1] = 90.0;
  lon[0] = -180.0;
  lon[1] = 180.0;

  while (geohash.length < precision) {
    if (is_even) {
      mid = (lon[0] + lon[1]) / 2;
      if (longitude > mid) {
        ch |= BITS[bit];
        lon[0] = mid;
      } else lon[1] = mid;
    } else {
      mid = (lat[0] + lat[1]) / 2;
      if (latitude > mid) {
        ch |= BITS[bit];
        lat[0] = mid;
      } else lat[1] = mid;
    }

    is_even = !is_even;
    if (bit < 4) bit++;
    else {
      geohash += BASE32[ch];
      bit = 0;
      ch = 0;
    }
  }
  return geohash;
}

function refine_interval(interval, cd, mask) {
  if (cd & mask) interval[0] = (interval[0] + interval[1]) / 2;
  else interval[1] = (interval[0] + interval[1]) / 2;
}

function decodeGeoHash(geohash) {
  var is_even = 1;
  var lat = [];
  var lon = [];
  lat[0] = -90.0;
  lat[1] = 90.0;
  lon[0] = -180.0;
  lon[1] = 180.0;
  lat_err = 90.0;
  lon_err = 180.0;

  for (i = 0; i < geohash.length; i++) {
    c = geohash[i];
    cd = BASE32.indexOf(c);
    for (j = 0; j < 5; j++) {
      mask = BITS[j];
      if (is_even) {
        lon_err /= 2;
        refine_interval(lon, cd, mask);
      } else {
        lat_err /= 2;
        refine_interval(lat, cd, mask);
      }
      is_even = !is_even;
    }
  }
  lat[2] = (lat[0] + lat[1]) / 2;
  lon[2] = (lon[0] + lon[1]) / 2;

  return { latitude: lat, longitude: lon };
}

function calculateAdjacent(srcHash, dir) {
  srcHash = srcHash.toLowerCase();
  var lastChr = srcHash.charAt(srcHash.length - 1);
  var type = srcHash.length % 2 ? "odd" : "even";
  var base = srcHash.substring(0, srcHash.length - 1);
  if (BORDERS[dir][type].indexOf(lastChr) != -1)
    base = calculateAdjacent(base, dir);
  return base + BASE32[NEIGHBORS[dir][type].indexOf(lastChr)];
}

/* INDORE (Madhya Pradesh Locations) INDIA */
const geetaBhavan = [22.715047356112404, 75.88958829723394]; // Consider this as center point to find neighboring hashes
const bhavarkuaa = [22.692840843380978, 75.86759676813907];
const rauu = [22.642455376287398, 75.80342014624483];
const sayaji = [22.751417514236817, 75.88955653055247];
const radison = [22.750227897204734, 75.90276266814045];
const tulsinagar = [22.76015355256352, 75.9186873689058];

const geetaBhavanGeoHash = encodeGeoHash(geetaBhavan[0], geetaBhavan[1], 5);
const bhavarkuaaGeoHash = encodeGeoHash(bhavarkuaa[0], bhavarkuaa[1], 5);
const rauuGeoHash = encodeGeoHash(rauu[0], rauu[1], 5);
const sayajiGeoHash = encodeGeoHash(sayaji[0], sayaji[1], 5);
const radisonGeoHash = encodeGeoHash(radison[0], radison[1], 5);
const tulsinagarGeoHash = encodeGeoHash(tulsinagar[0], tulsinagar[1], 5);

console.log("geeta bhavan - ", geetaBhavanGeoHash);
console.log("bhavarkuaa - ", bhavarkuaaGeoHash);
console.log("rauu - ", rauuGeoHash);
console.log("sayaji - ", sayajiGeoHash);
console.log("radison - ", radisonGeoHash);
console.log("tulsinagar - ", tulsinagarGeoHash);

this.neighbors = {};

this.neighbors.left = calculateAdjacent(geetaBhavanGeoHash, "left");
this.neighbors.right = calculateAdjacent(geetaBhavanGeoHash, "right");
this.neighbors.top = calculateAdjacent(geetaBhavanGeoHash, "top");
this.neighbors.bottom = calculateAdjacent(geetaBhavanGeoHash, "bottom");
this.neighbors.topLeft = calculateAdjacent(this.neighbors.left, "top");
this.neighbors.topRight = calculateAdjacent(this.neighbors.right, "top");
this.neighbors.bottomLeft = calculateAdjacent(this.neighbors.left, "bottom");
this.neighbors.bottomRight = calculateAdjacent(this.neighbors.right, "bottom");

console.log(" \nNeighboring Hash Values - ", this.neighbors);
