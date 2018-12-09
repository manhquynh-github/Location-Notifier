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
import {
  Alert,
  BackHandler,
  Clipboard,
  Platform,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { editFavorite, removeFavorite } from '../actions/FavoriteActions';
import StatusBarOverlay from '../components/StatusBarOverlay';
import Colors from '../constants/Colors';

class EditFavoriteScreen extends Component {
  static propTypes = {
    removeFavorite: PropTypes.func.isRequired,
    editFavorite: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.item = props.navigation.getParam('item', null);
    if (this.item === null) {
      console.warn('[ERROR]', '[constructor]', 'No item to edit.');
      return;
    }

    this.state = {
      label: this.item.label,
    };

    this.onBackPress = this.onBackPress.bind(this);
    this.onAndroidBackPress = this.onAndroidBackPress.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSavePress = this.onSavePress.bind(this);
    this.onNamePress = this.onNamePress.bind(this);
    this.onAddressPress = this.onAddressPress.bind(this);
    this.didFocusSubscription = props.navigation.addListener(
      'didFocus',
      (payload) =>
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.onAndroidBackPress
        )
    );
    this.willBlurSubscription = props.navigation.addListener(
      'willBlur',
      (payload) =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.onAndroidBackPress
        )
    );
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
            <Text>{this.item.name}</Text>
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
            <Text>{this.item.address}</Text>
          </Body>
        </ListItem>
      </Container>
    );
  }

  componentWillUnmount() {
    this.didFocusSubscription.remove();
    this.willBlurSubscription.remove();
  }

  onBackPress() {
    this.handleChanges(() => this.props.navigation.goBack());
  }

  onAndroidBackPress() {
    this.handleChanges(() => this.props.navigation.goBack());
    return true;
  }

  onSavePress() {
    this.save();
    this.props.navigation.goBack();
  }

  onChangeText(e) {
    this.setState({
      label: e,
    });
  }

  async onNamePress() {
    await Clipboard.setString(this.item.name);
    this.showCopySuccessfully();
  }

  async onAddressPress() {
    await Clipboard.setString(this.item.address);
    this.showCopySuccessfully();
  }

  save() {
    this.props.editFavorite({ ...this.item, label: this.state.label });
  }

  isModified() {
    return this.item.label !== this.state.label;
  }

  handleChanges(callback) {
    if (callback == null) {
      console.log('[ERROR]', '[handleChanges]', 'callback is null.');
      return;
    }

    if (this.isModified()) {
      Alert.alert('Discard changes', 'Do you want to save changes?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            this.save();
            callback();
          },
          style: 'default',
        },
        {
          text: 'No',
          onPress: () => {
            callback();
          },
          style: 'destructive',
        },
      ]);
    } else {
      callback();
    }
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

const mapDispatchToProps = (dispatch) => ({
  removeFavorite: (favoriteID) => dispatch(removeFavorite(favoriteID)),
  editFavorite: (favorite) => dispatch(editFavorite(favorite)),
});

export default connect(
  null,
  mapDispatchToProps
)(EditFavoriteScreen);
