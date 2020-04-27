import React from "react";
import { Platform } from "react-native";
import {
  SafeAreaView as SafeAreaViewReactNavigation,
  SafeAreaViewProps,
} from "react-navigation";
import Constants from "expo-constants";

export class SafeAreaView extends React.Component {
  statusBarHeight = Platform.select({
    ios: Constants.statusBarHeight,
    android: 0,
  });

  componentDidMount() {
    SafeAreaViewReactNavigation.setStatusBarHeight(this.statusBarHeight);
  }

  render() {
    return <SafeAreaViewReactNavigation {...this.props} />;
  }
}
