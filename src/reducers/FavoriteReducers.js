import { ADD_FAVORITE, REMOVE_FAVORITE } from '../constants/ActionTypes';

const sampleData = [
  {
    id: 0,
    label: 'Home',
    address: '123 Đường 456',
  },
  {
    id: 1,
    label: 'School',
    address: 'Khu phố 6 P, Phường Linh Trung, Thủ Đức, Hồ Chí Minh, Vietnam',
  },
];

const initialState = {
  favorites: sampleData,
};

const favoriteReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ADD_FAVORITE: {
      const item = action.payload.favorite;
      const arrLength = newState.favorites.length;
      if (arrLength > 0) {
        item.id = newState.favorites[arrLength - 1].id + 1;
      } else {
        item.id = 0;
      }
      newState.favorites.concat(item);
      return newState;
    }

    case REMOVE_FAVORITE: {
      const id = action.payload.id;
      // reassign new array
      newState.favorites = [...state.favorites];
      // look for array index
      let arrIdx = newState.favorites.findIndex((e) => e.id == id);
      if (arrIdx < 0) {
        throw 'ERR: No such id to remove.\n' + id;
      }
      // remove old index
      newState.favorites.splice(arrIdx, 1);
      return newState;
    }
    default: {
      return newState;
    }
  }
};

export default favoriteReducer;
