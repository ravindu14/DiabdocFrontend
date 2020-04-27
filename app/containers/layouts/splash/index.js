import React, { Component } from "react";
import { View, Image } from "react-native";
import { withStyles } from "react-native-ui-kitten";
import { splashImage } from "@app/assets";

class Splash extends Component {
  render() {
    const { themedStyle } = this.props;
    return (
      <View style={themedStyle.container}>
        <Image source={splashImage} style={themedStyle.image} />
      </View>
    );
  }
}

export default withStyles(Splash, () => ({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000000",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
}));
