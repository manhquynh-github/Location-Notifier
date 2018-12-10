# Location Notifier

[Location Notifier](https://github.com/manhquynh-github/React-Native-Project) is a simple cross-platform mobile app that uses [React Native](https://facebook.github.io/react-native/) framework. The app will notify a user whenever he/she is about to reach a set destination. Moreover, this app supports organizing a favorite list, searching for nearby gas stations or local ATMs. There are also settings to control the alarm. This is useful for those who travel a lot, especially students that don't know if they are close to the destination or may oversleep on the bus.

![Demo](https://media.giphy.com/media/HzMfJIkTZgx8s/giphy.gif)

Download CH Play [here!](https://vietpano.com/)

# Table of Content

1. [Functionality](#functionality)
1. [Getting started](#getting-started)
1. [Addtional tools](#additional-tools)
1. [Open source libraries](#open-source-libraries)
1. [Related docs](#related-docs)

# Functionality

1. **Location notifying**: notifies when user is near a selected destination using GPS.
1. **Map viewing**: provides a Google map to look around with markers and route directions.
1. **Location searching**: allows looking for an address using Google API.
1. **Detailed searching**: provides visual map with nearby places to choose from.
1. **Get nearby Gas stations or local ATMs**: allows locating nearby stations with buttons for easy access.
1. **Manage a favorite list**: provides a list to save, label, copy, and edit an address.
1. **Control the alarm settings**: lets user change ringtone, vibration, and notifying range.
1. **Supports online/offline usage**

# Getting Started

Go to [store](#store) for released app.

## Set up environment

1. **[NodeJS](https://nodejs.org/en/)** (use latest version)

1. **[Yarn](https://yarnpkg.com/en/) package**.

   You can download and use the installer from their [homepage](https://yarnpkg.com/en/docs/install#windows-stable) or install via npm.

   ```sh
   npm install -g yarn
   ```

   Then add to PATH environment:

   ```
   %USERPROFILE%\AppData\Local\Yarn\bin
   ```

1. **[Expo](https://expo.io/) client**

   ```sh
   yarn global add expo-cli
   ```

1. Clone project

   ```sh
   git clone https://github.com/manhquynh-github/React-Native-Project.git
   ```

1. Install package

   ```sh
   git clone https://github.com/manhquynh-github/React-Native-Project.git
   cd React-Native-Project
   yarn install
   ```

## Run app in dev mode

1. Connect your android device or turn on Android Emulator
2. Open a terminal and run `expo start --localhost`
3. Open another terminal and run `react-native run-android --variant DevMinSdkDevKernelDebug`

# Additional tools

You can use any text editor to edit source code and any command line program to start the project. These are the recommended development tools.

### IDE

- [Visual Studio Code](https://code.visualstudio.com/)

### VSCode extensions

- [Auto Import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport) – automatically finds, parses and provides code actions and code completion for all available imports. Works with Typescript and TSX.
- [Auto Import - ES6, TS, JSX, TSX](https://marketplace.visualstudio.com/items?itemName=NuclleaR.vscode-extension-auto-import) – automatically finds, parses and provides code actions and code completion for all available imports. Works with JavaScript and TypeScript.
- [JavaScript (ES6) code snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets) – code snippets for JavaScript in ES6 syntax.
- [Node.js Modules Intellisense](https://marketplace.visualstudio.com/items?itemName=leizongmin.node-module-intellisense) – autocompletes Node.js modules in import statements.
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense) Visual Studio Code plugin that autocompletes filenames.
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) – VS Code package to format your JavaScript/TypeScript/CSS using Prettier.
- [React Native Tools](https://marketplace.visualstudio.com/items?itemName=vsmobile.vscode-react-native) – provides a development environment for React Native projects. Using this extension, you can debug your code and quickly run react-native commands from the command palette.
- [Version Lens](https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens) – shows the latest version for each package using code lens.

# Open source libraries

- [React Native](https://facebook.github.io/react-native/) – a JavaScript mobile framework developed by Facebook which allows developers to build Android and iOS mobile apps using JavaScript and reuse code across web and mobile applications.
- [Expo](https://docs.expo.io) – a set of tools, libraries, and services that let you build native iOS and Android apps by writing JavaScript.
- [Native Base](https://nativebase.io/) – essential cross-platform UI components for [React Native](https://facebook.github.io/react-native/).
- [React Native Alarm Notification](https://github.com/emekalites/react-native-alarm-notification) – scheduled alarm and local notification in [React Native](https://facebook.github.io/react-native/) (Android only).
- [React Native Firebase](https://rnfirebase.io/) 🔥 – a well tested feature rich modular Firebase implementation for [React Native](https://facebook.github.io/react-native/).
- [react-native-google-places](https://github.com/tolu360/react-native-google-places) – iOS/Android Google Places Widgets (Autocomplete, Place Picker) and API Services for React Native Apps.
- [react-native-maps-directions](https://github.com/bramus/react-native-maps-directions) – Directions Component for [react-native-maps](https://github.com/react-community/react-native-maps).
- [react-native-mauron85-background-geolocation](https://github.com/mauron85/react-native-background-geolocation) – background and foreground geolocation plugin for [React Native](https://facebook.github.io/react-native/) and tracks user when app is running in background. [Demo & Fork](https://github.com/ductienuit/DemoMapService).
- [React Navigation](https://reactnavigation.org) – routing and navigation for your React Native apps
- [React Redux](https://github.com/reduxjs/react-redux) – official React bindings for [Redux](http://redux.js.org).
- [Redux](http://redux.js.org) – predictable state container for JavaScript apps.
- [Redux Persist](https://github.com/rt2zz/redux-persist) – persist and rehydrate a redux store.
- [MapView](https://docs.expo.io/versions/latest/sdk/map-view) (from [Expo](https://docs.expo.io)) – a map component that uses Apple Maps or Google Maps on iOS and Google Maps on Android from [react-native-maps](https://github.com/react-community/react-native-maps).

# Related docs

- Redux ([eng](https://medium.com/backticks-tildes/setting-up-a-redux-project-with-create-react-app-e363ab2329b8)/[vie](https://viblo.asia/p/chuong-2-ung-dung-redux-dau-tien-cua-ban-07LKXA8JZV4))
- PropTypes ([eng](https://reactjs.org/docs/typechecking-with-proptypes.html)/[vie](https://viblo.asia/p/react-proptypes-khai-bao-kieu-du-lieu-cho-component-naQZR1aPKvx))
- [FlatList](https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6)
- [Expo SDK](https://docs.expo.io/versions/latest/sdk)
- [Common fixes](CommonFix.md)
