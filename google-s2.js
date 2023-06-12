const S2 = require('s2-geometry').S2;

/* INDORE (Madhya Pradesh Locations) INDIA */
const geetaBhavan = [22.715047356112404, 75.88958829723394]; // Latitude, Longitude of the center point for the search
const savitriEmpire = [22.747839316030284, 75.89034523850981];
const bhavarkuaa = [22.692840843380978, 75.86759676813907];
const rauu = [22.642455376287398, 75.80342014624483];
const sayaji = [22.751417514236817, 75.88955653055247];
const radison = [22.750227897204734, 75.90276266814045];
const tulsinagar = [22.76015355256352, 75.9186873689058];

const savitriEmpireCellId = S2.latLngToKey(savitriEmpire[0], savitriEmpire[1], 8);
const geetaBhavanCellId = S2.latLngToKey(geetaBhavan[0], geetaBhavan[1], 8);
const bhavarkuaaCellId = S2.latLngToKey(bhavarkuaa[0], bhavarkuaa[1], 8);
const rauuCellId = S2.latLngToKey(rauu[0], rauu[1], 8);
const sayajiCellId = S2.latLngToKey(sayaji[0], sayaji[1], 8);
const radisonCellId = S2.latLngToKey(radison[0], radison[1], 8);
const tulsinagarCellId = S2.latLngToKey(tulsinagar[0], tulsinagar[1], 8);

console.log('savitri empire - ', savitriEmpireCellId);
console.log('geeta bhavan - ', geetaBhavanCellId);
console.log('bhavarkuaa - ', bhavarkuaaCellId);
console.log('rauu - ', rauuCellId);
console.log('sayaji - ', sayajiCellId);
console.log('radison - ', radisonCellId);
console.log('tulsinagar - ', tulsinagarCellId);

const neighboringCellIds = S2.latLngToNeighborKeys(geetaBhavan[0], geetaBhavan[1], 8);

console.log(neighboringCellIds);