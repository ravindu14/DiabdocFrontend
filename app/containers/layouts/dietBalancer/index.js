import React, { Component } from "react";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { ASYNC_STATUS } from "@app/constants/async";
import { ActivityIndicator } from "react-native";

import { TabView, Tab, Text } from "react-native-ui-kitten";
import { ChartIcon, FoodIntakeIcon } from "@app/assets/icons";
import { getUserData } from "@app/actions/auth";
import ScanFoodDishScreen from "./components/scanDish";
import DietPlansScreen from "./components/dietPlan";

class DietPlanScreen extends Component {
  state = {
    selectedIndex: 0,
  };

  componentDidMount() {
    this.props.getUserData();
  }

  onSelect = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  render() {
    const { status, notification, userDetails } = this.props;

    if (status === ASYNC_STATUS.LOADING) {
      return (
        <LinearGradient colors={["#005A00", "#000000"]} style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </LinearGradient>
      );
    }

    return (
      <LinearGradient colors={["#005A00", "#000000"]} style={{ flex: 1 }}>
        {userDetails && (
          <TabView
            selectedIndex={this.state.selectedIndex}
            onSelect={this.onSelect}
            style={{ flex: 1, color: "#008B8B" }}
          >
            <Tab title="Scan Food Dish" icon={FoodIntakeIcon}>
              <ScanFoodDishScreen />
            </Tab>
            <Tab title="Diet Plan" icon={ChartIcon}>
              <DietPlansScreen userDetails={userDetails} />
            </Tab>
          </TabView>
        )}
        {notification !== null && (
          <Alert status={Alert.STATUS.DANGER}>{notification}</Alert>
        )}
      </LinearGradient>
    );
  }
}

const Actions = {
  getUserData,
};

function mapStateToProps(state) {
  return {
    status: state.auth.status,
    notification: state.auth.notification,
    userDetails: state.auth.userDetails,
  };
}

export default connect(mapStateToProps, Actions)(DietPlanScreen);
