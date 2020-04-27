import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator, Image } from "react-native";
import { Button, Text, withStyles } from "react-native-ui-kitten";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import { navigateAndReset } from "@app/actions/routes";
import { userLogin, resetNotification } from "@app/actions/auth";

import ScrollableAvoidKeyboardComponent from "@app/components/common/ScrollableAvoidKeyboardComponent";
import SignInComponent from "@app/components/auth/SignInComponent";
import { ASYNC_STATUS } from "@app/constants/async";
import Alert from "@app/components/Alert";
import { imageAuthScreenLogo } from "@app/assets";

class SignIn extends Component {
  state = {
    formData: null,
  };

  onSignInButtonPress = () => {
    this.props.userLogin(this.state.formData);
  };

  onSignUpButtonPress = () => {
    this.props.resetNotification();
    this.props.navigateAndReset("Sign Up");
  };

  onFormDataChange = (formData) => {
    this.setState({ formData });
  };

  render() {
    const { themedStyle, status, notification } = this.props;

    return (
      <ScrollableAvoidKeyboardComponent style={themedStyle.container}>
        <LinearGradient colors={["#005A00", "#000000"]} style={{ flex: 1 }}>
          <View style={themedStyle.headerContainer}>
            <Image
              source={imageAuthScreenLogo}
              style={{ width: 170, height: 170 }}
            />
            <Text style={themedStyle.authLabel} category="s1">
              Sign in to your account
            </Text>
          </View>
          <SignInComponent
            style={themedStyle.formContainer}
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
              style={themedStyle.signInButton}
              size="giant"
              disabled={!this.state.formData || status === ASYNC_STATUS.LOADING}
              onPress={this.onSignInButtonPress}
            >
              SIGN IN
            </Button>
            <Button
              style={themedStyle.signUpButton}
              appearance="ghost"
              activeOpacity={0.75}
              onPress={this.onSignUpButtonPress}
            >
              Don't have an account? Create
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
  };
}

const Actions = {
  navigateAndReset,
  userLogin,
  resetNotification,
};

const SignInContainer = connect(mapStateToProps, Actions)(SignIn);

export default withStyles(SignInContainer, (theme: ThemeType) => {
  return {
    container: {
      flex: 1,
    },
    headerContainer: {
      justifyContent: "center",
      alignItems: "center",
      minHeight: 216,
      paddingTop: 50,
    },
    formContainer: {
      flex: 1,
      marginTop: 32,
      paddingHorizontal: 16,
    },
    buttonContainer: {
      marginHorizontal: 16,
    },
    authLabel: {
      marginTop: 16,
      color: "white",
    },
    signInButton: {
      marginTop: 15,
    },
    signUpButton: {
      marginVertical: 12,
    },
    signUpText: {
      color: "#ffffff",
    },
  };
});
