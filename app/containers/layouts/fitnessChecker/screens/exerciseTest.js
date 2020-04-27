import React, { Component } from "react";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { ASYNC_STATUS } from "@app/constants/async";
import { ActivityIndicator, View, Alert } from "react-native";
import { TabView, Tab, Text, withStyles, Button } from "react-native-ui-kitten";
import { navigate, navigateAndReset } from "@app/actions/routes";
import { getApiExercises, saveExercisesToApi } from "@app/actions/exercise";

import ScrollableAvoidKeyboardComponent from "@app/components/common/ScrollableAvoidKeyboardComponent";

class ExerciseTestScreen extends Component {
  state = {
    testAgain: false,
  };

  toggleTesting = () => {
    this.setState({
      ...this.state,
      testAgain: !this.state.testAgain,
    });
  };

  componentDidMount() {
    this.props.getApiExercises();
  }

  onFinishTest = () => {
    const { exercises } = this.props;

    this.props.saveExercisesToApi({ exercises });
  };

  render() {
    const { themedStyle, status, notification, exercises } = this.props;

    const { testAgain } = this.state;

    if (status === ASYNC_STATUS.LOADING) {
      return (
        <LinearGradient colors={["#005A00", "#000000"]} style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </LinearGradient>
      );
    }

    return (
      <ScrollableAvoidKeyboardComponent>
        <LinearGradient colors={["#005A00", "#000000"]} style={{ flex: 1 }}>
          <View style={themedStyle.container}>
            {(!(
              exercises.legExercises &&
              exercises.armExercises &&
              exercises.absExercises
            ) ||
              testAgain) && (
              <View style={themedStyle.testingContainer}>
                <View style={themedStyle.section}>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 18,
                        marginTop: 10,
                        marginLeft: "auto",
                        marginRight: "auto",
                        fontWeight: "bold",
                      }}
                    >
                      Legs Fitness Test
                    </Text>
                  </View>
                  <Button
                    style={themedStyle.ActionButton}
                    size="giant"
                    appearance="outline"
                    onPress={() => this.props.navigate("Legs Fitness")}
                  >
                    Start Jogging
                  </Button>
                </View>
                <View style={themedStyle.section}>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 18,
                        marginTop: 10,
                        marginLeft: "auto",
                        marginRight: "auto",
                        fontWeight: "bold",
                      }}
                    >
                      Muscular Fitness Test
                    </Text>
                  </View>
                  <Button
                    style={themedStyle.ActionButton}
                    size="giant"
                    appearance="outline"
                    onPress={() => this.props.navigate("Muscular Fitness")}
                  >
                    Pushup Test
                  </Button>
                </View>
                <View style={themedStyle.section}>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 18,
                        marginTop: 10,
                        marginLeft: "auto",
                        marginRight: "auto",
                        fontWeight: "bold",
                      }}
                    >
                      Aerobic Fitness Test
                    </Text>
                  </View>
                  <Button
                    style={themedStyle.ActionButton}
                    size="giant"
                    appearance="outline"
                    onPress={() => this.props.navigate("Aerobic Fitness")}
                  >
                    Target Heart Rate Test
                  </Button>
                </View>
              </View>
            )}
            {exercises.legExercises &&
              exercises.armExercises &&
              exercises.absExercises && (
                <View style={themedStyle.buttonContainer}>
                  <Button
                    style={themedStyle.ActionButton}
                    size="giant"
                    onPress={this.toggleTesting}
                  >
                    {testAgain ? "Hide tests" : "Show tests again"}
                  </Button>
                </View>
              )}
            <View style={themedStyle.buttonContainer}>
              <Button
                style={themedStyle.ActionButton}
                size="giant"
                onPress={this.onFinishTest}
                disabled={
                  !(
                    exercises.legExercises &&
                    exercises.armExercises &&
                    exercises.absExercises
                  )
                }
              >
                My Workout Plan
              </Button>
            </View>
            {exercises.legExercises &&
              exercises.armExercises &&
              exercises.absExercises && (
                <View style={themedStyle.buttonContainer}>
                  <Button
                    style={themedStyle.ActionButton}
                    size="giant"
                    onPress={() => this.props.navigate("Analytics")}
                  >
                    Weekly Progress
                  </Button>
                </View>
              )}
            {notification !== null && (
              <Alert status={Alert.STATUS.DANGER}>{notification}</Alert>
            )}
          </View>
        </LinearGradient>
      </ScrollableAvoidKeyboardComponent>
    );
  }
}

const Actions = {
  navigate,
  navigateAndReset,
  getApiExercises,
  saveExercisesToApi,
};

function mapStateToProps(state) {
  return {
    status: state.exercise.status,
    notification: state.exercise.notification,
    exercises: state.exercise.exercises,
  };
}

const ExerciseTestScreenContainer = connect(
  mapStateToProps,
  Actions
)(ExerciseTestScreen);

export default withStyles(ExerciseTestScreenContainer, (theme) => ({
  container: {
    marginHorizontal: 16,
    marginVertical: 10,
    flexDirection: "column",
  },
  section: {
    marginVertical: 16,
  },
  ActionButton: {
    marginTop: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
}));
