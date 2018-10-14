const sampleData = [
  {
    id: 0,
    title: 'Home',
    coordinates: [ 0, 0 ],
    locationName: '123 Đường 456',
  },
  {
    id: 1,
    title: 'School',
    coordinates: [ 0, 0 ],
    locationName: '789 Đường XYZ',
  }
];

/**
 * DATABASE side
 */

function fetchData() {
  // TODO

  // sample data
  return sampleData;
}

function addItem(item) {
  // TODO

  // sample data
  sampleData.push(item);
}

function deleteItem(item) {
  // TODO

  // sample data
  sampleData.splice(index, 1);
}

/**
 * APP side 
 */

function validateItem(item) {
  if (item.id === undefined
    || item.id === null) {
    throw "ERR: id is required.\n" + item;
  }

  if (item.id < 0) {
    throw "ERR: id must not be a negative number.\n" + item;
  }
}

function assignNewItem(item) {
  const lastItem = sampleData[ sampleData.length - 1 ];
  item.id = lastItem.id + 1;
}

function findItemArrayIdx(id) {
  return sampleData.findIndex(e => e.id == id);
}

/**
 * API
 */

export function getFavorites() {
  return fetchData();
}

export function addFavorite(item) {
  assignNewItem(item);
  validateItem(item)
  addItem(item);
}

export function findFavorite(id) {
  return sampleData.find(e => e.id == id);
}

export function deleteFavorite(id) {
  let arrayIdx = findItemArrayIdx(id);
  if (index < 0) {
    throw "ERR: No such id to delete.\n" + id;
  }
  deleteItem(id);
}