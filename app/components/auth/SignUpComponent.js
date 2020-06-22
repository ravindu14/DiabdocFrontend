import React, { Component } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import {
  Button,
  withStyles,
  Text,
  Radio,
  RadioGroup,
} from "react-native-ui-kitten";

import ValidationInput from "../common/ValidationInput";
import {
  NameValidator,
  PasswordValidator,
  DOBValidator,
  StringValidator,
  EmailValidator,
  WeightValidator,
  NumberValidator,
} from "@app/validators";

import { imageAvatarFemale, imageAvatarMale } from "@app/assets";
import { inlineStyles } from "react-native-svg";

class SignUpComponent extends Component {
  state = {
    gender: "male",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    height: "",
    weight: "",
    sbp: "140",
    dbp: "90",
    chol: "6.2",
    trigl: "2.2",
    hdl: "3.33",
    ldl: "4.1",
    family: false,
    smoke: false,
    drink: false,
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

  isValid = (value) => {
    const { username, password } = value;

    return username !== undefined && password !== undefined;
  };

  getGenderStyles = (gender) => {
    const { themedStyle } = this.props;
    const { gender: selectedGender } = this.state;
    let opacity = 0.5;
    if (gender === selectedGender) {
      opacity = 1;
    }
    return { ...themedStyle.genderContainer, opacity };
  };

  onChangeFormValue = (value) => {
    this.setState({
      ...this.state,
      ...value,
    });
  };

  onChangeRadioValue = (field) => {
    this.setState({
      ...this.state,
      [field]: !this.state[field],
    });
  };

  render() {
    const { style, themedStyle, activityLevels, ...restProps } = this.props;
    const {
      username,
      email,
      password,
      confirmPassword,
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
    } = this.state;

    return (
      <View style={[themedStyle.container, style]} {...restProps}>
        <View style={themedStyle.formContainer}>
          <View style={{ flexDirection: "row" }}>
            <View style={this.getGenderStyles("male")}>
              <TouchableOpacity
                onPress={() => this.onChangeFormValue({ gender: "male" })}
              >
                <Image
                  source={imageAvatarMale}
                  style={themedStyle.genderImage}
                />
                <Text style={themedStyle.genderImageText}>Male</Text>
              </TouchableOpacity>
            </View>
            <View style={this.getGenderStyles("female")}>
              <TouchableOpacity
                onPress={() => this.onChangeFormValue({ gender: "female" })}
              >
                <Image
                  source={imageAvatarFemale}
                  style={themedStyle.genderImage}
                />
                <Text style={themedStyle.genderImageText}>Female</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ValidationInput
            label="User Name"
            validator={NameValidator}
            value={username}
            onChangeText={(username) => this.onChangeFormValue({ username })}
          />
          <ValidationInput
            style={themedStyle.textInput}
            label="Email"
            validator={EmailValidator}
            value={email}
            onChangeText={(email) => this.onChangeFormValue({ email })}
          />
          <ValidationInput
            style={themedStyle.textInput}
            label="Password"
            secureTextEntry={true}
            validator={PasswordValidator}
            value={password}
            onChangeText={(password) => this.onChangeFormValue({ password })}
          />
          <ValidationInput
            style={themedStyle.textInput}
            label="Confirm Password"
            secureTextEntry={true}
            validator={PasswordValidator}
            value={confirmPassword}
            onChangeText={(confirmPassword) =>
              this.onChangeFormValue({ confirmPassword })
            }
          />
          <ValidationInput
            style={themedStyle.textInput}
            label="Age (years)"
            validator={WeightValidator}
            value={age}
            onChangeText={(age) => this.onChangeFormValue({ age })}
          />
          <ValidationInput
            style={themedStyle.textInput}
            label="Height (cm)"
            validator={WeightValidator}
            value={height}
            onChangeText={(height) => this.onChangeFormValue({ height })}
          />
          <ValidationInput
            style={themedStyle.textInput}
            label="Weight (kg)"
            validator={WeightValidator}
            value={weight}
            onChangeText={(weight) => this.onChangeFormValue({ weight })}
          />
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Radio
              checked={family}
              onChange={() => this.onChangeRadioValue("family")}
              style={{ marginVertical: 10 }}
            />
            <Text
              style={{
                color: "#ffffff",
                fontSize: 14,
                marginTop: 10,
                marginLeft: 20,
              }}
            >
              Family history of diabetes
            </Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Radio
              checked={smoke}
              onChange={() => this.onChangeRadioValue("smoke")}
              style={{ marginVertical: 10 }}
            />
            <Text
              style={{
                color: "#ffffff",
                fontSize: 14,
                marginTop: 10,
                marginLeft: 20,
              }}
            >
              Smoke
            </Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Radio
              checked={drink}
              style={{ marginVertical: 10 }}
              onChange={() => this.onChangeRadioValue("drink")}
            />
            <Text
              style={{
                color: "#ffffff",
                fontSize: 14,
                marginTop: 10,
                marginLeft: 20,
              }}
            >
              Drink
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default withStyles(SignUpComponent, (theme: ThemeType) => ({
  container: {},
  textInput: {
    marginTop: 16,
  },
  genderContainer: { flex: 1, alignItems: "center" },
  genderImageText: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginTop: 10,
    textAlign: "center",
    marginBottom: 20,
  },
  genderImage: { width: 100, height: 100 },
}));
