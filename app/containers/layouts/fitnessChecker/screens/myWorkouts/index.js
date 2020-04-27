import React, { Component } from "react";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { ASYNC_STATUS } from "@app/constants/async";
import { ActivityIndicator, View, Alert } from "react-native";
import { TabView, Tab, Text, withStyles, Button } from "react-native-ui-kitten";
import { navigate, navigateAndReset } from "@app/actions/routes";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from "react-native-material-cards";

import ScrollableAvoidKeyboardComponent from "@app/components/common/ScrollableAvoidKeyboardComponent";

class MyWorkoutsScreen extends Component {
  render() {
    const { themedStyle } = this.props;

    return (
      <ScrollableAvoidKeyboardComponent>
        <LinearGradient colors={["#005A00", "#000000"]} style={{ flex: 1 }}>
          <View style={themedStyle.container}>
            <Card style={themedStyle.cardContainer}>
              <CardImage
                source={{
                  uri:
                    "https://www.muscleandfitness.com/wp-content/uploads/2017/07/1280-arms-exercise-standing-curls.jpg",
                }}
              />
              <CardTitle title="Arms" />
              <CardContent text="These exercises are suggested based on the fitness value you earned by performing the PUSH UPS test" />
              <CardAction separator={true} inColumn={false}>
                <CardButton
                  onPress={() => {
                    this.props.navigate("Arms Workouts");
                  }}
                  title="Start"
                  color="blue"
                />
              </CardAction>
            </Card>
            <Card style={themedStyle.cardContainer}>
              <CardImage
                source={{
                  uri:
                    "https://cdn1.coachmag.co.uk/sites/coachmag/files/styles/insert_main_wide_image/public/2017/10/plank.jpg",
                }}
              />
              <CardTitle title="Abs" />
              <CardContent text="These exercises are suggested based on the fitness value you earned by performing the BMI test" />
              <CardAction separator={true} inColumn={false}>
                <CardButton
                  onPress={() => {
                    this.props.navigate("Abs Workouts");
                  }}
                  title="Start"
                  color="blue"
                />
              </CardAction>
            </Card>
            <Card style={themedStyle.cardContainer}>
              <CardImage
                source={{
                  uri:
                    "https://images.shape.mdpcdn.com/sites/shape.com/files/styles/slide/public/sexy-strong-legs-workout.jpg",
                }}
              />
              <CardTitle title="Legs" />
              <CardContent text="These exercises are suggested based on the fitness value you earned by performing the AEROBIC FITNESS test" />
              <CardAction separator={true} inColumn={false}>
                <CardButton
                  onPress={() => {
                    this.props.navigate("Legs Workouts");
                  }}
                  title="Start"
                  color="blue"
                />
              </CardAction>
            </Card>
          </View>
        </LinearGradient>
      </ScrollableAvoidKeyboardComponent>
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

const MyWorkoutsScreenContainer = connect(
  mapStateToProps,
  Actions
)(MyWorkoutsScreen);

export default withStyles(MyWorkoutsScreenContainer, (theme) => ({
  container: {
    marginHorizontal: 16,
    marginVertical: 10,
    flexDirection: "column",
  },
  cardContainer: {
    borderRadius: 10,
  },
}));
