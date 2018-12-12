import PropTypes from 'prop-types';

export const propTypes = {
  /**
   * The ID for the place, which can be retrieved from Google Map API.
   * The ID can be used for Google Autocomplete API.
   */
  placeID: PropTypes.string,
  /**
   * The name of the place, i.e. Facebook HQ
   */
  name: PropTypes.string,
  /**
   * The full address of the place.
   * This can sometimes contain the name of the place
   */
  address: PropTypes.string,
  /**
   * An array of the types of the place
   */
  types: PropTypes.arrayOf(PropTypes.string),
  /**
   * The latitude value.
   */
  latitude: PropTypes.number,
  /**
   * The longitude value.
   */
  longitude: PropTypes.number,
  /**
   * The geographical east value.
   */
  east: PropTypes.number,
  /**
   * The geographical north value.
   */
  north: PropTypes.number,
  /**
   * The geographical west value.
   */
  west: PropTypes.number,
  /**
   * The geographical south value.
   */
  south: PropTypes.number,
};

/**
 * strictProps is just the same as propTypes but uses isRequired
 */
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
