import PropTypes from 'prop-types';

export const propTypes = {
  placeID: PropTypes.string,
  primaryText: PropTypes.string,
  fullText: PropTypes.string,
  secondaryText: PropTypes.string,
  phoneNumber: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.string),
  latitude: PropTypes.number,
  longitude: PropTypes.number
};

export const strictProps = {
  placeID: PropTypes.string.isRequired,
  primaryText: PropTypes.string.isRequired,
  fullText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired
};

export default {
  propTypes,
  strictProps,
};
