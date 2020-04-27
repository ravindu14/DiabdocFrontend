import React, { Component } from "react";
import { View } from "react-native";
import { Text, withStyles, Toggle } from "react-native-ui-kitten";

class ToggleInput extends Component {
  static defaultProps = {
    value: false,
  };
  render() {
    const { label, themedStyle } = this.props;
    return (
      <View style={themedStyle.formToggle}>
        <Text style={{ color: "#ffffff" }}>{label}</Text>
        <Toggle value={this.props.value} onChange={this.props.onChange} />
      </View>
    );
  }
}

export default withStyles(ToggleInput, (theme) => ({
  formToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
}));
