import React, { Component } from "react";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { ASYNC_STATUS } from "@app/constants/async";
import { ActivityIndicator, View, Alert, TouchableOpacity } from "react-native";
import { TabView, Tab, Text, withStyles, Button } from "react-native-ui-kitten";
import { navigate, navigateAndReset } from "@app/actions/routes";
import { getApiExercises } from "@app/actions/exercise";
import { getAnalytics, saveAnalytics } from "@app/actions/analytics";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from "react-native-material-cards";

import ScrollableAvoidKeyboardComponent from "@app/components/common/ScrollableAvoidKeyboardComponent";

class LegsWorkoutsScreen extends Component {
  state = {
    selectedDay: "monday",
  };

  componentDidMount() {
    this.props.getApiExercises();
    this.props.getAnalytics();
  }

  onSelectDay = (value) => {
    this.setState({
      ...this.state,
      selectedDay: value,
    });
  };

  getExercisesByDay = () => {
    const { selectedDay } = this.state;
    const {
      exercises: { legExercises },
      themedStyle,
    } = this.props;

    if (selectedDay === "monday") {
      return legExercises.Monday.map((exercise, index) => {
        return (
          <Card key={index} style={themedStyle.cardContainer}>
            <CardImage
              source={{
                uri: exercise.imageUrl,
              }}
            />
            <CardTitle title={exercise.name} />
            <CardContent
              text={`${exercise.level} level : ${
                exercise.level === "beginner"
                  ? "8 repetitions"
                  : exercise.level === "medium"
                  ? "10 repetitions"
                  : "12 repetitions"
              }`}
            />
          </Card>
        );
      });
    } else if (selectedDay === "tuesday") {
      return legExercises.Tuesday.map((exercise, index) => {
        return (
          <Card key={index} style={themedStyle.cardContainer}>
            <CardImage
              source={{
                uri: exercise.imageUrl,
              }}
            />
            <CardTitle title={exercise.name} />
            <CardContent
              text={`${exercise.level} level : ${
                exercise.level === "beginner"
                  ? "8 repetitions"
                  : exercise.level === "medium"
                  ? "10 repetitions"
                  : "12 repetitions"
              }`}
            />
          </Card>
        );
      });
    } else if (selectedDay === "wednesday") {
      return legExercises.Wednesday.map((exercise, index) => {
        return (
          <Card key={index} style={themedStyle.cardContainer}>
            <CardImage
              source={{
                uri: exercise.imageUrl,
              }}
            />
            <CardTitle title={exercise.name} />
            <CardContent
              text={`${exercise.level} level : ${
                exercise.level === "beginner"
                  ? "8 repetitions"
                  : exercise.level === "medium"
                  ? "10 repetitions"
                  : "12 repetitions"
              }`}
            />
          </Card>
        );
      });
    } else if (selectedDay === "thursday") {
      return legExercises.Thursday.map((exercise, index) => {
        return (
          <Card key={index} style={themedStyle.cardContainer}>
            <CardImage
              source={{
                uri: exercise.imageUrl,
              }}
            />
            <CardTitle title={exercise.name} />
            <CardContent
              text={`${exercise.level} level : ${
                exercise.level === "beginner"
                  ? "8 repetitions"
                  : exercise.level === "medium"
                  ? "10 repetitions"
                  : "12 repetitions"
              }`}
            />
          </Card>
        );
      });
    } else if (selectedDay === "friday") {
      return legExercises.Friday.map((exercise, index) => {
        return (
          <Card key={index} style={themedStyle.cardContainer}>
            <CardImage
              source={{
                uri: exercise.imageUrl,
              }}
            />
            <CardTitle title={exercise.name} />
            <CardContent
              text={`${exercise.level} level : ${
                exercise.level === "beginner"
                  ? "8 repetitions"
                  : exercise.level === "medium"
                  ? "10 repetitions"
                  : "12 repetitions"
              }`}
            />
          </Card>
        );
      });
    } else if (selectedDay === "saturday") {
      return legExercises.Saturday.map((exercise, index) => {
        return (
          <Card key={index} style={themedStyle.cardContainer}>
            <CardImage
              source={{
                uri: exercise.imageUrl,
              }}
            />
            <CardTitle title={exercise.name} />
            <CardContent
              text={`${exercise.level} level : ${
                exercise.level === "beginner"
                  ? "8 repetitions"
                  : exercise.level === "medium"
                  ? "10 repetitions"
                  : "12 repetitions"
              }`}
            />
          </Card>
        );
      });
    } else if (selectedDay === "sunday") {
      return legExercises.Sunday.map((exercise, index) => {
        return (
          <Card key={index} style={themedStyle.cardContainer}>
            <CardImage
              source={{
                uri: exercise.imageUrl,
              }}
            />
            <CardTitle title={exercise.name} />
            <CardContent
              text={`${exercise.level} level : ${
                exercise.level === "beginner"
                  ? "8 repetitions"
                  : exercise.level === "medium"
                  ? "10 repetitions"
                  : "12 repetitions"
              }`}
            />
          </Card>
        );
      });
    }
  };

  getTotalCalories = (day) => {
    const {
      exercises: { armExercises },
    } = this.props;

    let totalCalories = 0;

    if (day === "monday") {
      armExercises.Monday.map((exercise, index) => {
        totalCalories += exercise.cal;
        return null;
      });
    } else if (day === "tuesday") {
      armExercises.Tuesday.map((exercise, index) => {
        totalCalories += exercise.cal;
        return null;
      });
    } else if (day === "wednesday") {
      armExercises.Wednesday.map((exercise, index) => {
        totalCalories += exercise.cal;
        return null;
      });
    } else if (day === "thursday") {
      armExercises.Thursday.map((exercise, index) => {
        totalCalories += exercise.cal;
        return null;
      });
    } else if (day === "friday") {
      armExercises.Friday.map((exercise, index) => {
        totalCalories += exercise.cal;
        return null;
      });
    } else if (day === "saturday") {
      armExercises.Saturday.map((exercise, index) => {
        totalCalories += exercise.cal;
        return null;
      });
    } else if (day === "sunday") {
      armExercises.Sunday.map((exercise, index) => {
        totalCalories += exercise.cal;
        return null;
      });
    }

    return totalCalories;
  };

  onFinishExercises = () => {
    const { selectedDay } = this.state;
    const { analytics } = this.props;

    let totalCalories = parseFloat(this.getTotalCalories(selectedDay)).toFixed(
      2
    );

    let updatedAnalytics = [
      ...analytics.map((analytic) => {
        if (analytic.day === selectedDay) {
          analytic.calories += totalCalories;
        }
        return analytic;
      }),
    ];

    this.props.saveAnalytics({ analytics: updatedAnalytics });
  };

  render() {
    const {
      themedStyle,
      status,
      notification,
      exercises,
      analyticStatus,
      analyticNotification,
    } = this.props;

    if (
      status === ASYNC_STATUS.LOADING ||
      analyticStatus === ASYNC_STATUS.LOADING
    ) {
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
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={themedStyle.YesButton}
                onPress={() => {
                  this.onSelectDay("monday");
                }}
              >
                <Text style={themedStyle.textLabel}>Mon</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={themedStyle.YesButton}
                onPress={() => {
                  this.onSelectDay("tuesday");
                }}
              >
                <Text style={themedStyle.textLabel}>Tue</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={themedStyle.YesButton}
                onPress={() => {
                  this.onSelectDay("wednesday");
                }}
              >
                <Text style={themedStyle.textLabel}>Wed</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={themedStyle.YesButton}
                onPress={() => {
                  this.onSelectDay("thursday");
                }}
              >
                <Text style={themedStyle.textLabel}>Thu</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={themedStyle.YesButton}
                onPress={() => {
                  this.onSelectDay("friday");
                }}
              >
                <Text style={themedStyle.textLabel}>Fri</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={themedStyle.YesButton}
                onPress={() => {
                  this.onSelectDay("saturday");
                }}
              >
                <Text style={themedStyle.textLabel}>Sat</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={themedStyle.YesButton}
                onPress={() => {
                  this.onSelectDay("sunday");
                }}
              >
                <Text style={themedStyle.textLabel}>Sun</Text>
              </TouchableOpacity>
            </View>
            {exercises.legExercises &&
              exercises.armExercises &&
              exercises.absExercises && (
                <View styles={themedStyle.contentContainer}>
                  {this.getExercisesByDay()}
                </View>
              )}
            <View style={themedStyle.buttonContainer}>
              <Button
                style={themedStyle.ActionButton}
                size="giant"
                onPress={this.onFinishExercises}
              >
                I'm Done
              </Button>
            </View>
            {notification !== null && (
              <Alert status={Alert.STATUS.DANGER}>{notification}</Alert>
            )}
            {analyticNotification !== null && (
              <Alert status={Alert.STATUS.DANGER}>{analyticNotification}</Alert>
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
  getAnalytics,
  saveAnalytics,
};

function mapStateToProps(state) {
  return {
    status: state.exercise.status,
    notification: state.exercise.notification,
    exercises: state.exercise.exercises,
    analyticStatus: state.analytics.status,
    analyticNotification: state.analytics.notification,
    analytics: state.analytics.analytics,
  };
}

const LegsWorkoutsScreenContainer = connect(
  mapStateToProps,
  Actions
)(LegsWorkoutsScreen);

export default withStyles(LegsWorkoutsScreenContainer, (theme) => ({
  container: {
    marginHorizontal: 16,
    marginVertical: 10,
    flexDirection: "column",
  },
  cardContainer: {
    borderRadius: 10,
  },
  YesButton: {
    paddingTop: 5,
    backgroundColor: "#002b01",
    borderRadius: 30,
    width: 45,
    height: 45,
  },
  YesButtonActive: {
    paddingTop: 5,
    backgroundColor: "#00d605",
    borderRadius: 30,
    width: 45,
    height: 45,
  },
  textLabel: {
    fontSize: 13,
    color: "#ffffff",
    paddingTop: 8,
    textAlign: "center",
    fontWeight: "600",
  },
  contentContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
}));
