import React, { Component } from "react";
import { View, Text } from "react-native";
import { withStyles } from "react-native-ui-kitten";

class Alert extends Component {
  static STATUS = {
    DANGER: "danger",
    INFO: "info",
  };

  static defaultProps = {
    status: Alert.STATUS.INFO,
  };

  render() {
    const { themedStyle, children, status } = this.props;

    return (
      <View
        style={{
          ...themedStyle.container,
          ...themedStyle.containerStyles[status],
        }}
      >
        <Text style={themedStyle.textStyle[status]}>{children}</Text>
      </View>
    );
  }
}

export default withStyles(Alert, (theme: ThemeType) => {
  return {
    container: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderRadius: 4,
      borderWidth: 1,
    },
    containerStyles: {
      [Alert.STATUS.DANGER]: {
        borderColor: "#f5c6cb",
        backgroundColor: "#f8d7da",
      },
      [Alert.STATUS.INFO]: {
        borderColor: "#d6d8db",
        backgroundColor: "#e2e3e5",
      },
    },
    textStyle: {
      [Alert.STATUS.DANGER]: {
        color: "#721c24",
      },
      [Alert.STATUS.INFO]: {
        color: "#383d41",
      },
    },
  };
});
