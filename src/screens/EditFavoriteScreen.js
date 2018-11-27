import {
  Body,
  Button,
  Container,
  Header,
  Icon,
  Input,
  Left,
  ListItem,
  Right,
  Text,
  Title,
  Toast,
} from 'native-base';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Clipboard, Platform, StyleSheet } from 'react-native';
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
    this.onNamePress = this.onNamePress.bind(this);
    this.onAddressPress = this.onAddressPress.bind(this);
  }

  render() {
    return (
      <Container>
        <StatusBarOverlay />
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              rounded
              delayPressIn={0}
              androidRippleColor="lightgray"
              onPress={this.onBackPress}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Edit Favorites</Title>
          </Body>
          <Right>
            <Button
              transparent
              rounded
              delayPressIn={0}
              androidRippleColor="lightgray"
              onPress={this.onSavePress}>
              <Icon name={Platform.OS === 'ios' ? 'ios-save' : 'md-save'} />
            </Button>
          </Right>
        </Header>
        <ListItem noIndent iconLeft style={styles.listItem}>
          <Icon name="label" type="MaterialIcons" style={styles.listItemIcon} />
          <Body>
            <Input
              style={{ marginLeft: 5 }}
              placeholder="Add a label..."
              value={this.state.label}
              autoFocus={true}
              onChangeText={this.onChangeText}
            />
          </Body>
        </ListItem>
        <ListItem
          noIndent
          iconLeft
          button
          delayPressIn={0}
          androidRippleColor="lightgray"
          style={styles.listItem}
          onPress={this.onNamePress}>
          <Icon
            name="location-on"
            type="MaterialIcons"
            style={styles.listItemIcon}
          />
          <Body>
            <Text>{this.state.name}</Text>
          </Body>
        </ListItem>
        <ListItem
          noIndent
          iconLeft
          button
          delayPressIn={0}
          androidRippleColor="lightgray"
          style={styles.listItem}
          onPress={this.onAddressPress}>
          <Icon
            name="location-on"
            type="MaterialIcons"
            style={styles.listItemIcon}
          />
          <Body>
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
    this.props.editFavorite(this.state);
    this.props.navigation.goBack();
  }

  onChangeText(e) {
    this.setState({
      label: e,
    });
  }

  async onNamePress(item) {
    await Clipboard.setString(item.name);
    this.showCopySuccessfully();
  }

  async onAddressPress(item) {
    await Clipboard.setString(item.address);
    this.showCopySuccessfully();
  }

  showCopySuccessfully() {
    Toast.show({
      text: 'Copied to clipboard!',
      buttonText: 'OK',
      duration: 3000,
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
  listItemIcon: {
    color: 'gray',
  },
});

const mapStateToProps = (state) => ({
  favorites: state.favoriteReducer.favorites,
});

const mapDispatchToProps = (dispatch) => ({
  removeFavorite: (favoriteID) => dispatch(removeFavorite(favoriteID)),
  editFavorite: (favorite) => dispatch(editFavorite(favorite)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditFavoriteScreen);
