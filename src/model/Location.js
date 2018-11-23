import PropTypes from 'prop-types';

export const propTypes = {
  placeID: PropTypes.string,
  name: PropTypes.string,
  address: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.string),
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  east: PropTypes.number,
  north: PropTypes.number,
  west: PropTypes.number,
  south: PropTypes.number,
};

export const strictProps = {
  placeID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  east: PropTypes.number.isRequired,
  north: PropTypes.number.isRequired,
  west: PropTypes.number.isRequired,
  south: PropTypes.number.isRequired,
};

export default {
  propTypes,
  strictProps,
};
