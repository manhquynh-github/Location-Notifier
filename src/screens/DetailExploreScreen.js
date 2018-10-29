import { Container, Content, Input } from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { changeLocation } from '../actions/ExploreActions';
import StatusBarOverlay from '../components/StatusBarOverlay';
import Colors from '../constants/Colors';

class DetailExploreScreen extends Component {
  static propTypes = {
    location: PropTypes.string,
    changeLocation: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
    };
    this.onChangeText = this.onChangeText.bind(this);
  }

  render() {
    return (
      <Container>
        <Content style={styles.page}>
          <StatusBarOverlay />
          <Input
            value={this.state.location}
            style={styles.searchBar}
            placeholder="Search"
            autoFocus={true}
            onChangeText={this.onChangeText}
          />
        </Content>
      </Container>
    );
  }

  onChangeText(e) {
    this.setState({
      location: e,
    });
  }
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: Colors.grayBackground,
  },
  searchBar: {
    margin: 10,
    borderRadius: 10,
    elevation: 2,
    borderWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: 'lightgray',
    backgroundColor: 'white',
  },
});

const mapStateToProps = (state) => ({
  location: state.exploreReducer.location,
});

const mapDispatchToProps = (dispatch) => ({
  changeLocation: (query) => dispatch(changeLocation(query)),
});

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DetailExploreScreen)
);
