import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator, Image } from "react-native";
import { Button, Text, withStyles } from "react-native-ui-kitten";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import ScrollableAvoidKeyboardComponent from "@app/components/common/ScrollableAvoidKeyboardComponent";
import ComplicationForm from "./components/complicationForm";
import { navigateAndReset } from "@app/actions/routes";
import { getComplications, resetNotification } from "@app/actions/auth";
import Alert from "@app/components/Alert";
import { ASYNC_STATUS } from "@app/constants/async";
import { imageAuthScreenLogo } from "@app/assets";

const activityLevels = ["Sedentary", "Light", "Moderate", "Active"];

class RiskCalculator extends Component {
  state = {
    formData: null,
  };

  onCalculateButtonPress = () => {
    const {
      formData: {
        gender,
        age,
        bmi,
        dia_duration,
        insulin,
        medi_treatment,
        hba1c,
      },
    } = this.state;

    let pythonBack = {
      sex: gender === "male" ? 1 : 2,
      age: parseFloat(age),
      bmi: parseFloat(bmi),
      dia_duration: parseFloat(dia_duration),
      insulin: insulin ? 1 : 0,
      medi_treatment: medi_treatment ? 1 : 0,
      hba1c: parseFloat(hba1c),
    };

    this.props.getComplications(pythonBack);
  };

  onFormDataChange = (formData) => {
    this.setState({ formData });
  };

  render() {
    const { themedStyle, status, notification, complications } = this.props;

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
          <ComplicationForm
            style={themedStyle.formContainer}
            complications={complications}
            onDataChange={this.onFormDataChange}
          />
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
              onPress={this.onCalculateButtonPress}
            >
              Calculate
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
    complications: state.auth.complications,
  };
}

const Actions = {
  navigateAndReset,
  resetNotification,
  getComplications,
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
