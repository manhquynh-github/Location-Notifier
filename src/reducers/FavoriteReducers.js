import { ADD_FAVORITE, REMOVE_FAVORITE } from '../constants/ActionTypes';

const sampleData = [
  {
    favoriteID: 0,
    label: 'Home',
    placeID:'ChIJczqvGDgpdTERi8wKGNEWjc0',
    name: 'Khách sạn 5 sao',
    address: '123 Đường 456',
    latitude: 10.801465900000002,
    longitude: 106.65259739999999,
  },
  {
    favoriteID: 1,
    label: 'School',
    placeID:'ChIJiQNpfm-sNTERrlkkElKydjU',
    name: 'Trường Đại học Công nghệ thông tin',
    address: 'Khu phố 6 P, Phường Linh Trung, Thủ Đức, Hồ Chí Minh, Vietnam',
    latitude: 10.801465900000002,
    longitude: 106.65259739999999,
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
        item.favoriteID = newState.favorites[arrLength - 1].favoriteID + 1;
      } else {
        item.favoriteID = 0;
      }
      newState.favorites.concat(item);
      return newState;
    }

    case REMOVE_FAVORITE: {
      const favoriteID = action.payload.favoriteID;
      // reassign new array
      newState.favorites = [...state.favorites];
      // look for array index
      let arrIdx = newState.favorites.findIndex(
        (e) => e.favoriteID == favoriteID
      );
      if (arrIdx < 0) {
        throw 'ERR: No such favoriteID to remove.\n' + favoriteID;
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
