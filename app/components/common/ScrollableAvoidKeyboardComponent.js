import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { withStyles } from "react-native-ui-kitten";

import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-aware-scroll-view";

class ScrollableAvoidKeyboardComponent extends Component {
  render() {
    const {
      style,
      contentContainerStyle,
      themedStyle,
      ...restProps
    } = this.props;

    return (
      <KeyboardAwareScrollView
        bounces={false}
        bouncesZoom={false}
        alwaysBounceVertical={false}
        alwaysBounceHorizontal={false}
        style={[themedStyle.container, style]}
        contentContainerStyle={[
          themedStyle.contentContainer,
          contentContainerStyle,
        ]}
        enableOnAndroid={true}
        {...restProps}
      />
    );
  }
}

export default withStyles(
  ScrollableAvoidKeyboardComponent,
  (theme: ThemeType) => ({
    container: {
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
    },
  })
);
