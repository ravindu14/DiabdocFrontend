import React, { Component } from "react";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { ASYNC_STATUS } from "@app/constants/async";
import { ActivityIndicator, View, Alert } from "react-native";
import { TabView, Tab, Text, withStyles, Button } from "react-native-ui-kitten";
import { navigate, navigateAndReset } from "@app/actions/routes";

class ExerciseWarningScreen extends Component {
  render() {
    const { themedStyle } = this.props;

    return (
      <LinearGradient colors={["#005A00", "#000000"]} style={{ flex: 1 }}>
        <View style={themedStyle.container}>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text
              style={{
                color: "#ffffff",
                fontSize: 18,
                marginTop: 10,
                fontWeight: "bold",
              }}
            >
              Do you have any signs or symptoms suggestive of;
            </Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text
              style={{
                color: "#ffffff",
                fontSize: 14,
                marginTop: 10,
                marginLeft: 30,
                fontWeight: "900",
                lineHeight: 35,
              }}
            >
              1. Diabetic retinopathy
            </Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text
              style={{
                color: "#ffffff",
                fontSize: 14,
                marginTop: 10,
                marginLeft: 30,
                fontWeight: "900",
                lineHeight: 35,
              }}
            >
              2. Cardiovascular disease
            </Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text
              style={{
                color: "#ffffff",
                fontSize: 14,
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 30,
                lineHeight: 35,
                fontWeight: "900",
              }}
            >
              3. Metabolic disease
            </Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text
              style={{
                color: "#ffffff",
                fontSize: 14,
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 30,
                lineHeight: 35,
                fontWeight: "900",
              }}
            >
              4. Renal disease
            </Text>
          </View>
          <View style={themedStyle.buttonContainer}>
            <Button
              style={themedStyle.ActionButton}
              size="giant"
              onPress={() => {
                Alert.alert(
                  "Warning",
                  "Please seek medical advises before returning to exercises",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        this.props.navigateAndReset("Dashboard");
                      },
                    },
                  ],
                  { cancelable: false }
                );
              }}
            >
              Yes
            </Button>
            <Button
              style={themedStyle.ActionButton}
              size="giant"
              appearance="outline"
              onPress={() => this.props.navigate("Exercise Test")}
            >
              No
            </Button>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const Actions = {
  navigate,
  navigateAndReset,
};

function mapStateToProps(state) {
  return {};
}

const ExerciseWarningScreenContainer = connect(
  mapStateToProps,
  Actions
)(ExerciseWarningScreen);

export default withStyles(ExerciseWarningScreenContainer, (theme) => ({
  container: {
    marginHorizontal: 16,
    marginVertical: 50,
    flexDirection: "column",
  },
  buttonContainer: {
    marginTop: 250,
  },
  ActionButton: {
    marginTop: 16,
  },
}));
