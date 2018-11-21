import PropTypes from 'prop-types';

export const propTypes = {
  placeID: PropTypes.string,
  name: PropTypes.string,
  address: PropTypes.string,
  website: PropTypes.string,
  phoneNumber: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.string),
  latitude: PropTypes.number,
  longitude: PropTypes.number,
};

export const strictProps = {
  placeID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default {
  propTypes,
  strictProps,
};
