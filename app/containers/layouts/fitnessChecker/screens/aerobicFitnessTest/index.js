import React, { Component } from "react";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { ASYNC_STATUS } from "@app/constants/async";
import { ActivityIndicator, View, Alert } from "react-native";
import { TabView, Tab, Text, withStyles, Button } from "react-native-ui-kitten";
import { navigate, navigateAndReset } from "@app/actions/routes";
import { getUserData } from "@app/actions/auth";
import { getAbsExercises } from "@app/actions/exercise";
import { NumberValidator } from "@app/validators";

import ValidationInput from "@app/components/common/ValidationInput";

class AerobicFitnessTestScreen extends Component {
  componentDidMount() {
    this.props.getUserData();
  }

  state = {
    heartRate: "",
  };

  onChangeFormValue = (value) => {
    this.setState({
      ...this.state,
      ...value,
    });
  };

  onFinishTest = () => {
    const {
      userDetails: { age },
    } = this.props;
    const { heartRate } = this.state;

    this.props.getAbsExercises({
      userage: parseFloat(age),
      activitymeasurement: parseFloat(heartRate),
    });
  };

  render() {
    const {
      themedStyle,
      authStatus,
      authNotification,
      status,
      notification,
      exercises,
    } = this.props;

    const { heartRate } = this.state;

    if (
      authStatus === ASYNC_STATUS.LOADING ||
      status === ASYNC_STATUS.LOADING
    ) {
      return (
        <LinearGradient colors={["#005A00", "#000000"]} style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </LinearGradient>
      );
    }

    return (
      <LinearGradient colors={["#005A00", "#000000"]} style={{ flex: 1 }}>
        <View style={themedStyle.container}>
          <View style={themedStyle.section}>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 14,
                  marginTop: 10,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                You can use the target heart rate zone as a guide for making
                sure your exercise is intense enough. If you are not reaching
                your target zone, you may need to increase the intensity. If you
                are achieving a target rate in the lower end of the target rate
                zone, you can set goals for gradually increasing your target.
              </Text>
            </View>
          </View>
          <View style={themedStyle.inputContainer}>
            <ValidationInput
              style={themedStyle.textInput}
              label="Please enter maximum heart rate"
              value={heartRate}
              validator={NumberValidator}
              onChangeText={(heartRate) =>
                this.onChangeFormValue({ heartRate })
              }
            />
          </View>
          <View style={themedStyle.buttonContainer}>
            <Button
              style={themedStyle.ActionButton}
              size="giant"
              disabled={heartRate === ""}
              onPress={this.onFinishTest}
            >
              Get Exercises
            </Button>
          </View>
          {exercises.absExercises && (
            <View style={themedStyle.buttonContainer}>
              <Button
                style={themedStyle.ActionButton}
                size="giant"
                onPress={() => this.props.navigate("Exercise Test")}
              >
                Finish Test
              </Button>
            </View>
          )}
          {authNotification !== null && (
            <Alert status={Alert.STATUS.DANGER}>{authNotification}</Alert>
          )}
          {notification !== null && (
            <Alert status={Alert.STATUS.DANGER}>{notification}</Alert>
          )}
        </View>
      </LinearGradient>
    );
  }
}

const Actions = {
  navigate,
  navigateAndReset,
  getAbsExercises,
  getUserData,
};

function mapStateToProps(state) {
  return {
    authStatus: state.auth.status,
    authNotification: state.auth.notification,
    userDetails: state.auth.userDetails,
    status: state.exercise.status,
    notification: state.exercise.notification,
    exercises: state.exercise.exercises,
  };
}

const AerobicFitnessTestScreenContainer = connect(
  mapStateToProps,
  Actions
)(AerobicFitnessTestScreen);

export default withStyles(AerobicFitnessTestScreenContainer, (theme) => ({
  container: {
    marginHorizontal: 16,
    marginVertical: 0,
    flexDirection: "column",
  },
  section: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#6c786f",
    borderRadius: 10,
  },
  ActionButton: {
    marginTop: 16,
  },
  inputContainer: {
    marginTop: 16,
  },
  textInput: {
    marginTop: 16,
  },
}));
