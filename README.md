Notify Location - Thông báo địa điểm

 Download CH Play [here!](https://vietpano.com/)

# Table of Content

1. [What is Notification Location?](#1-what-is-notify-location)
2. [Getting Started](#2-getting-started)
3. [Components](#3-components)
5. [Documentation](#4-documentation)
6. [Appstore](#5-appstore)



## 1. What is Notify Location?
[Notification Location](#1-what-is-notify-location) - TODO

## 2. Getting Started

**a. Setup with pure React Native app**

*Install NativeBase*

```js
npm install native-base --save
```
*Install Peer Dependencies*<br />
The peer dependencies included from any npm packages does not automatically get installed. Your application will not depend on it explicitly.

```js
react-native link
```

You've successfully setup [NativeBase](https://nativebase.io/) with your [React Native](https://facebook.github.io/react-native/) app. Your React Native app is now all set to run on iOS and Android simulator.


**b. Setup with CRNA**

*Create React Native project using the CRNA cli.* <br />
CRNA helps you make React Native apps with no build configuration. Create React App works on macOS, Windows, and Linux. <br />
Refer this link for additional information [CRNA](https://github.com/react-community/create-react-native-app)

*Install NativeBase*
```js
npm install native-base --save
```
*Install @expo/vector-icons*
```js
npm install @expo/vector-icons --save
```
<br />

**Note** <br />
[NativeBase](https://nativebase.io/) uses some custom fonts that can be loaded using **loadAsync** function. Check out [this](https://docs.expo.io/versions/v15.0.0/sdk/font.html#expofontloadasyncname-url) expo link.
<br />
Syntax <br />
```js
async componentWillMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
      });
```
<br />

Check out the [KitchenSink](https://expo.io/@geekyants/nativebasekitchensink) with CRNA for an example of the implementation.<br />
Find the [KitchenSink repo here](https://github.com/GeekyAnts/NativeBase-KitchenSink/tree/CRNA)

**c. Setup with ignite-native-base-boilerplate**

You can run the following command to create the boilerplate, provided you have [Ignite CLI](https://github.com/infinitered/ignite) installed.

```
ignite new appname --boilerplate native-base-boilerplate
```
Go to app location
```sh
cd appname
```
For iOS run
```sh
react-native run-ios
```
For Android run
```sh
react-native run-android
```
Refer [ignite-native-base-boilerplate](https://github.com/GeekyAnts/ignite-native-base-boilerplate) page for additional information

## 3. Components

[Expo](https://docs.expo.io) apps are React Native apps which contain the Expo SDK. The SDK is a native-and-JS library which provides access to the device's system functionality (things like the camera, contacts, local storage, and other hardware). That means you don't need to use Xcode or Android Studio, or write any native code, and it also makes your pure-JS project very portable because it can run in any native environment containing the Expo SDK.

[NativeBase](https://nativebase.io/) is made from effective building blocks referred to as components. The Components are constructed in pure [React Native](https://github.com/facebook/react-native) platform along with some JavaScript functionality with rich set of customisable properties. These components allow you to quickly build the perfect interface.

[AsyncStorage](https://facebook.github.io/react-native/docs/asyncstorage.html#asyncstorage) is a simple, unencrypted, asynchronous, persistent, key-value storage system that is global to the app. It should be used instead of LocalStorage.

[MapView](https://docs.expo.io/versions/latest/sdk/map-view) A Map component that uses Apple Maps or Google Maps on iOS and Google Maps on Android. Expo uses react-native-maps at react-community/react-native-maps. No setup required for use within the Expo app, or within a standalone app for iOS. See below for instructions on how to configure for deployment as a standalone app on Android.

## 4. Documentation

Go through [NativeBase Docs](https://docs.nativebase.io/) to play with [NativeBase](https://nativebase.io/).



## 5. Appstore
[https://vietpano.com](https://vietpano.com)


