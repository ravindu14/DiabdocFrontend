import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator, Image } from "react-native";
import { Button, Text, withStyles } from "react-native-ui-kitten";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import ScrollableAvoidKeyboardComponent from "@app/components/common/ScrollableAvoidKeyboardComponent";
import RiskCalculateForm from "./components/riskCalculateForm";
import { navigateAndReset } from "@app/actions/routes";
import { updateUser, resetNotification, getUserData } from "@app/actions/auth";
import Alert from "@app/components/Alert";
import { ASYNC_STATUS } from "@app/constants/async";
import { imageAuthScreenLogo } from "@app/assets";

const activityLevels = ["Sedentary", "Light", "Moderate", "Active"];

class RiskCalculator extends Component {
  state = {
    formData: null,
  };

  componentDidMount() {
    this.props.getUserData();
  }

  onSignUpButtonPress = () => {
    const {
      formData: {
        gender,
        age,
        height,
        weight,
        sbp,
        dbp,
        chol,
        trigl,
        hdl,
        ldl,
        smoke,
        drink,
        family,
      },
    } = this.state;

    let jsBack = {
      gender,
      age: parseFloat(age),
      height: parseFloat(height),
      weight: parseFloat(weight),
      sbp: parseFloat(sbp),
      dbp: parseFloat(dbp),
      chol: parseFloat(chol),
      trigl: parseFloat(trigl),
      hdl: parseFloat(hdl),
      ldl: parseFloat(ldl),
      family,
      smoke,
      drink,
    };

    let pythonBack = {
      sex: gender === "male" ? 1 : 2,
      age: parseFloat(age),
      height: parseFloat(height),
      weight: parseFloat(weight),
      sbp: parseFloat(sbp),
      dbp: parseFloat(dbp),
      chol: parseFloat(chol),
      trigl: parseFloat(trigl),
      hdl: parseFloat(hdl),
      ldl: parseFloat(ldl),
      family: family ? 1 : 0,
      smoke: smoke ? 1 : 3,
      drink: drink ? 1 : 3,
    };

    this.props.updateUser(jsBack, pythonBack);
  };

  onSignInButtonPress = () => {
    this.props.resetNotification();
    this.props.navigateAndReset("Sign In");
  };

  onFormDataChange = (formData) => {
    this.setState({ formData });
  };

  render() {
    const { themedStyle, status, notification, userDetails } = this.props;

    if (status === ASYNC_STATUS.LOADING) {
      return (
        <LinearGradient colors={["#005A00", "#000000"]} style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </LinearGradient>
      );
    }

    return (
      <ScrollableAvoidKeyboardComponent style={themedStyle.container}>
        <LinearGradient colors={["#005A00", "#000000"]} style={{ flex: 1 }}>
          {userDetails && (
            <RiskCalculateForm
              style={themedStyle.formContainer}
              userDetails={userDetails}
              onDataChange={this.onFormDataChange}
            />
          )}
          <View style={themedStyle.buttonContainer}>
            {status === ASYNC_STATUS.LOADING && (
              <View>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            )}
            {notification !== null && (
              <Alert status={Alert.STATUS.DANGER}>{notification}</Alert>
            )}
            <Button
              style={themedStyle.CalculateButton}
              size="giant"
              disabled={!this.state.formData}
              onPress={this.onSignUpButtonPress}
            >
              Recalculate
            </Button>
          </View>
        </LinearGradient>
      </ScrollableAvoidKeyboardComponent>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.auth.status,
    notification: state.auth.notification,
    userDetails: state.auth.userDetails,
  };
}

const Actions = {
  navigateAndReset,
  updateUser,
  resetNotification,
  getUserData,
};

const RiskCalculatorContainer = connect(
  mapStateToProps,
  Actions
)(RiskCalculator);

export default withStyles(RiskCalculatorContainer, (theme: ThemeType) => {
  return {
    container: {
      flex: 1,
    },
    formContainer: {
      flex: 1,
      marginTop: 32,
      paddingHorizontal: 16,
    },
    buttonContainer: {
      marginHorizontal: 16,
      marginTop: 16,
      marginBottom: 16,
    },
    CalculateButton: {
      marginTop: 16,
    },
  };
});
