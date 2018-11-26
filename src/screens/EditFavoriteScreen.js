import {
  Body,
  Container,
  Header,
  Icon,
  Left,
  ListItem,
  Right,
  Textarea,
  Title,
  Button,
  Text,
  Input,
} from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { editFavorite, removeFavorite } from '../actions/FavoriteActions';
import StatusBarOverlay from '../components/StatusBarOverlay';
import Colors from '../constants/Colors';
import { propTypes as LocationProps } from '../model/Location';

class EditFavoriteScreen extends Component {
  static propTypes = {
    favorites: PropTypes.arrayOf(PropTypes.shape(LocationProps)),
    removeFavorite: PropTypes.func.isRequired,
  };

  static defaultProps = {
    favorites: [],
  };

  constructor(props) {
    super();
    const item = props.navigation.getParam('item', null);
    if (item === null) {
      throw 'No item to edit.';
    }

    this.state = {
      ...item,
    };

    this.onBackPress = this.onBackPress.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSavePress = this.onSavePress.bind(this);
    this.onDeletePress = this.onDeletePress.bind(this);
  }

  render() {
    return (
      <Container>
        <StatusBarOverlay />
        <Header style={styles.header} noLeft>
          <Left>
            <Button transparent onPress={this.onBackPress}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Edit Favorites</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.onDeletePress}>
              <Icon name="trash" />
            </Button>
            <Button transparent onPress={this.onSavePress}>
              <Icon name={Platform.OS === 'ios' ? 'ios-save' : 'md-save'} />
            </Button>
          </Right>
        </Header>
        <ListItem iconLeft style={styles.listItem} onPress={this.onCheck}>
          <Icon name="label" type="MaterialIcons" />
          <Body>
            <Input
              placeholder="Add a label..."
              value={this.state.label}
              autoFocus={true}
              onChangeText={this.onChangeText}
            />
          </Body>
        </ListItem>
        <ListItem iconLeft button style={styles.listItem}>
          <Icon name="location-on" type="MaterialIcons" />
          <Body>
            <Text>{this.state.name}</Text>
            <Text>{this.state.address}</Text>
          </Body>
        </ListItem>
      </Container>
    );
  }

  onBackPress() {
    this.props.navigation.goBack();
  }

  onSavePress() {
    this.props.editFavorite(this.state.favoriteID);
    this.props.navigation.goBack();
  }

  onDeletePress() {
    this.props.removeFavorite(this.state.favoriteID);
    this.props.navigation.goBack();
  }

  onChangeText(e) {
    this.setState({
      label: e,
    });
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.statusBarColor,
  },
  listItem: {
    height: 50,
  },
});

const mapStateToProps = (state) => ({
  favorites: state.favoriteReducer.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  removeFavorite: (favoriteID) => dispatch(removeFavorite(favoriteID)),
  editFavorite: (favoriteID) => dispatch(editFavorite(favoriteID)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditFavoriteScreen);
