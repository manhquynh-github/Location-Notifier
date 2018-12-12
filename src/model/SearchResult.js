import PropTypes from 'prop-types';

export const propTypes = {
  /**
   * The ID for the place, which can be retrieved from Google Map API.
   * The ID can be used for Google Autocomplete API.
   */
  placeID: PropTypes.string,
  /**
   * The full text of the autocompleted query.
   */
  fullText: PropTypes.string,
  /**
   * The primary text of the autocompleted query.
   * This usually is the text that is bold.
   */
  primaryText: PropTypes.string,
  /**
   * The secondary text of the autocompleted query.
   * This usually appears after the primary text.
   */
  secondaryText: PropTypes.string,
  /**
   * An array of the types of the place
   */
  types: PropTypes.arrayOf(PropTypes.string),
};

/**
 * strictProps is just the same as propTypes but uses isRequired
 */
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
