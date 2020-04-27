import React, { Component } from "react";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { ASYNC_STATUS } from "@app/constants/async";
import { ActivityIndicator, View, Alert } from "react-native";
import { TabView, Tab, Text, withStyles, Button } from "react-native-ui-kitten";
import { navigate, navigateAndReset } from "@app/actions/routes";
import { getUserData } from "@app/actions/auth";
import { getArmsExercises } from "@app/actions/exercise";
import { NumberValidator } from "@app/validators";

import ValidationInput from "@app/components/common/ValidationInput";

class MuscularFitnessTestScreen extends Component {
  componentDidMount() {
    this.props.getUserData();
  }

  state = {
    repetitions: "",
  };

  onChangeFormValue = (value) => {
    this.setState({
      ...this.state,
      ...value,
    });
  };

  onFinishTest = () => {
    const {
      userDetails: { gender, age },
    } = this.props;
    const { repetitions } = this.state;

    this.props.getArmsExercises({
      userage: parseFloat(age),
      usergender: gender,
      activitymeasurement: parseFloat(repetitions),
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

    const { repetitions } = this.state;

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
                Lie facedown on the floor with your elbows bent and your palms
                next to your shoulders.
              </Text>
            </View>
          </View>
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
                Keeping your back straight, push up with your arms until your
                arms are extended.
              </Text>
            </View>
          </View>
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
                Lower your body until your chin touches the floor. Do as many
                pushups as you can until you need to stop for rest.
              </Text>
            </View>
          </View>
          <View style={themedStyle.inputContainer}>
            <ValidationInput
              style={themedStyle.textInput}
              label="Please enter number of repetitions"
              value={repetitions}
              validator={NumberValidator}
              onChangeText={(repetitions) =>
                this.onChangeFormValue({ repetitions })
              }
            />
          </View>
          <View style={themedStyle.buttonContainer}>
            <Button
              style={themedStyle.ActionButton}
              size="giant"
              disabled={repetitions === ""}
              onPress={this.onFinishTest}
            >
              Get Exercises
            </Button>
          </View>
          {exercises.armExercises && (
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
  getUserData,
  getArmsExercises,
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

const MuscularFitnessTestScreenContainer = connect(
  mapStateToProps,
  Actions
)(MuscularFitnessTestScreen);

export default withStyles(MuscularFitnessTestScreenContainer, (theme) => ({
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
