import React from "react";
import { ImageProps } from "react-native";
import {
  StyleType,
  ThemeType,
  withStyles,
  TopNavigation,
  TopNavigationAction,
  TopNavigationActionProps,
  TopNavigationProps,
} from "react-native-ui-kitten";
import { SafeAreaView } from "./safeAreaView";

class TopNavigationBarComponent extends React.Component {
  onBackButtonPress = () => {
    if (this.props.onBackPress) {
      this.props.onBackPress();
    }
  };

  renderBackButton = (source) => {
    return (
      <TopNavigationAction icon={source} onPress={this.onBackButtonPress} />
    );
  };

  render() {
    const { themedStyle, title, backIcon } = this.props;

    const leftControlElement = backIcon
      ? this.renderBackButton(backIcon)
      : null;

    return (
      <SafeAreaView style={themedStyle.safeArea}>
        <TopNavigation
          alignment="center"
          title={title}
          leftControl={leftControlElement}
          style={{ backgroundColor: "#05440d" }}
          titleStyle={{ color: "#ffffff" }}
        />
      </SafeAreaView>
    );
  }
}

export const TopNavigationBar = withStyles(TopNavigationBarComponent, () => ({
  safeArea: {
    backgroundColor: "#05440d",
  },
}));
