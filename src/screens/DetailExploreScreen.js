import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Text, Input } from 'native-base';
import StatusBarOverlay from '../components/StatusBarOverlay';
import Colors from '../constants/Colors';

export default class DetailExploreScreen extends Component {
  render() {
    return (
      <Container>
        <Content style={styles.page}>
          <StatusBarOverlay />
          <Input
            style={styles.searchBar}
            placeholder="Search"
            autoFocus={true}
          />
        </Content>
      </Container>
    );
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
