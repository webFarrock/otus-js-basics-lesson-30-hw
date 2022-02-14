const API_KEY = "AIzaSyBx0xC5JHjnOL8wu8UHKjjLIhxmqRDlbVM";
const MAP_BASIC_URL = "//maps.googleapis.com/maps/api/staticmap";
const MAP_ZOOM = 12;
const MAP_WIDTH = 400;
const MAP_HEIGHT = 400;

const makeMapSrc = (lat: number, lon: number): string => {
  return `${MAP_BASIC_URL}?key=${API_KEY}&center=${lat},${lon}&zoom=${MAP_ZOOM}&size=${MAP_WIDTH}x${MAP_HEIGHT}`;
};

const createMapImage = (lat: number, lon: number): HTMLImageElement => {
  const img = new Image(MAP_WIDTH, MAP_HEIGHT);
  img.src = makeMapSrc(lat, lon);
  return img;
};

export { createMapImage };
