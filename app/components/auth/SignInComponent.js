import React, { Component } from "react";
import { View } from "react-native";
import { Button, withStyles } from "react-native-ui-kitten";

import ValidationInput from "@app/components/common/ValidationInput";
import { NameValidator, PasswordValidator } from "@app/validators";

class SignInComponent extends Component {
  state = {
    username: "",
    password: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const oldFormValid = this.isValid(prevState);
    const newFormValid = this.isValid(this.state);

    const isStateChanged = this.state !== prevState;
    const becomeValid = !oldFormValid && newFormValid;
    const becomeInvalid = oldFormValid && !newFormValid;
    const remainValid = oldFormValid && newFormValid;

    if (becomeValid) {
      this.props.onDataChange(this.state);
    } else if (becomeInvalid) {
      this.props.onDataChange(undefined);
    } else if (isStateChanged && remainValid) {
      this.props.onDataChange(this.state);
    }
  }

  onForgotPasswordButtonPress = () => {
    this.props.onForgotPasswordPress();
  };

  onUsernameInputTextChange = (username) => {
    this.setState({ username });
  };

  onPasswordInputTextChange = (password) => {
    this.setState({ password });
  };

  isValid = (value) => {
    const { username, password } = value;

    return username !== undefined && password !== undefined;
  };

  render() {
    const { style, themedStyle, ...restProps } = this.props;

    return (
      <View style={[themedStyle.container, style]} {...restProps}>
        <View style={themedStyle.formContainer}>
          <ValidationInput
            label="User Name"
            validator={NameValidator}
            onChangeText={this.onUsernameInputTextChange}
          />
          <ValidationInput
            style={themedStyle.passwordInput}
            label="Password"
            secureTextEntry={true}
            validator={PasswordValidator}
            onChangeText={this.onPasswordInputTextChange}
          />
        </View>
      </View>
    );
  }
}

export default withStyles(SignInComponent, (theme: ThemeType) => ({
  container: {},
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  passwordInput: {
    marginTop: 16,
  },
}));
