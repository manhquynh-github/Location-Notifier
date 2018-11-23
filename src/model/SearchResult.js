import PropTypes from 'prop-types';

export const propTypes = {
  placeID: PropTypes.string,
  fullText: PropTypes.string,
  primaryText: PropTypes.string,
  secondaryText: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.string),
};

export const strictProps = {
  placeID: PropTypes.string.isRequired,
  fullText: PropTypes.string.isRequired,
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default {
  propTypes,
  strictProps,
};
