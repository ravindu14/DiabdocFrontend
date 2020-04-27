import React, { Component } from "react";
import { View, Text, Image, ActivityIndicator, Dimensions } from "react-native";
import { connect } from "react-redux";
import { withStyles, Button } from "react-native-ui-kitten";
import { LinearGradient } from "expo-linear-gradient";
import { navigate } from "@app/actions/routes";
import { ASYNC_STATUS } from "@app/constants/async";
import { getMealPlan } from "@app/actions/food";
import { getCalories } from "@app/helpers/helpers/objects";
import {
  plan1,
  plan2,
  plan3,
  plan4,
  plan5,
  plan6,
  plan7,
  plan8,
} from "@app/assets";

import Alert from "@app/components/Alert";

const dimensions = Dimensions.get("window");
const imageHeight = Math.round((dimensions.width * 9) / 16);
const imageWidth = dimensions.width;

class DietPlanScreen extends Component {
  componentDidMount() {
    const {
      userDetails: { risk, age, gender },
    } = this.props;

    this.props.getMealPlan({
      risk: parseFloat(risk),
      age: parseFloat(age),
      bmi: 23.8,
      sex: gender === "male" ? 1 : 2,
    });
  }

  getPlan = (item) => {
    switch (item) {
      case "1":
        return plan1;
      case "2":
        return plan2;
      case "3":
        return plan3;
      case "4":
        return plan4;
      case "5":
        return plan5;
      case "6":
        return plan6;
      case "7":
        return plan7;
      case "8":
        return plan8;
      default:
        return plan1;
    }
  };

  render() {
    const { themedStyle, status, notification, mealPlan } = this.props;

    if (status === ASYNC_STATUS.LOADING) {
      return (
        <LinearGradient colors={["#005A00", "#000000"]} style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </LinearGradient>
      );
    }

    let plan = mealPlan ? this.getPlan(mealPlan.toString()) : plan1;

    return (
      <View style={themedStyle.container}>
        <View style={themedStyle.imageContainer}>
          <Image
            source={plan}
            style={{ width: imageWidth, height: imageHeight }}
          />
        </View>
        {notification !== null && (
          <Alert status={Alert.STATUS.DANGER}>{notification}</Alert>
        )}
        {notification && console.log("food error hit")}
      </View>
    );
  }
}

const Actions = {
  getMealPlan,
};

function mapStateToProps(state) {
  return {
    status: state.food.status,
    notification: state.food.notification,
    mealPlan: state.food.mealPlan,
  };
}

const DietPlanScreenContainer = connect(
  mapStateToProps,
  Actions
)(DietPlanScreen);

export default withStyles(DietPlanScreenContainer, (theme) => ({
  container: {
    marginHorizontal: 16,
    marginVertical: 50,
    flexDirection: "column",
  },
  imageContainer: {
    marginTop: 60,
  },
}));
