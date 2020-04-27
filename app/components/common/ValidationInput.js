import React, { Component } from "react";

import { ThemeType, withStyles, Input } from "react-native-ui-kitten";

class ValidationInputComponent extends Component {
  state = {
    value: this.props.value,
  };

  componentDidUpdate(prevProps, prevState) {
    const { value: oldValue } = prevState;
    const { value: newValue } = this.state;

    const becomeValid: boolean =
      !this.isValid(oldValue) && this.isValid(newValue);
    const becomeInvalid: boolean =
      !this.isValid(newValue) && this.isValid(oldValue);

    if (becomeValid) {
      this.props.onChangeText(newValue);
    } else if (becomeInvalid) {
      this.props.onChangeText(undefined);
    }
  }

  onChangeText = (text: string) => {
    const { formatter } = this.props;

    const value: string = formatter ? formatter(text, this.state.value) : text;

    this.setState({ value }, this.onValueChange);
  };

  onValueChange = () => {
    const { value } = this.state;

    if (this.isValid(value) && this.props.onChangeText) {
      this.props.onChangeText(value);
    }
  };

  isValid = (value: string): boolean => {
    const { validator } = this.props;

    return validator(value);
  };

  getStatus = (): string | undefined => {
    const { value } = this.state;

    if (value && value.length) {
      return this.isValid(value) ? "success" : "danger";
    }

    return undefined;
  };

  render() {
    const { style, themedStyle, ...restProps } = this.props;

    return (
      <Input
        autoCapitalize="none"
        status={this.getStatus()}
        {...restProps}
        value={this.state.value}
        style={[themedStyle.container, style]}
        onChangeText={this.onChangeText}
        textStyle={{ color: "#000000" }}
        labelStyle={{ color: "#ffffff" }}
      />
    );
  }
}

export default withStyles(ValidationInputComponent, (theme: ThemeType) => ({
  container: {
    backgroundColor: "#ffffff",
  },
}));
