import React, { Component } from "react";

import ValidationInput from "@app/components/common/ValidationInput";

import { TouchableOpacity, View, Image } from "react-native";
import {
  Button,
  withStyles,
  Text,
  Radio,
  RadioGroup,
} from "react-native-ui-kitten";
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

class RiskCalculateForm extends Component {
  state = {
    gender: this.props.userDetails.gender.toString(),
    age: this.props.userDetails.age.toString(),
    height: this.props.userDetails.height.toString(),
    weight: this.props.userDetails.weight.toString(),
    sbp: this.props.userDetails.sbp.toString(),
    dbp: this.props.userDetails.dbp.toString(),
    chol: this.props.userDetails.chol.toString(),
    trigl: this.props.userDetails.trigl.toString(),
    hdl: this.props.userDetails.hdl.toString(),
    ldl: this.props.userDetails.ldl.toString(),
    smoke: this.props.userDetails.smoke,
    drink: this.props.userDetails.drink,
    family: this.props.userDetails.family,
  };

  componentDidUpdate(prevProps, prevState) {
    const isStateChanged = this.state !== prevState;

    if (isStateChanged) {
      this.props.onDataChange(this.state);
    }
  }

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
    const { style, themedStyle, ...restProps } = this.props;

    const {
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
          <ValidationInput
            style={themedStyle.textInput}
            label="SBP Value (mmHg)"
            validator={WeightValidator}
            value={sbp}
            onChangeText={(sbp) => this.onChangeFormValue({ sbp })}
          />
          <ValidationInput
            style={themedStyle.textInput}
            label="DBP Value (mmHg)"
            validator={WeightValidator}
            value={dbp}
            onChangeText={(dbp) => this.onChangeFormValue({ dbp })}
          />
          <ValidationInput
            style={themedStyle.textInput}
            label="Cholesterol (mmol/L)"
            validator={WeightValidator}
            value={chol}
            onChangeText={(chol) => this.onChangeFormValue({ chol })}
          />
          <ValidationInput
            style={themedStyle.textInput}
            label="Triglyceride (mmol/L)"
            validator={WeightValidator}
            value={trigl}
            onChangeText={(trigl) => this.onChangeFormValue({ trigl })}
          />
          <ValidationInput
            style={themedStyle.textInput}
            label="HDL Value (mmol/L)"
            validator={WeightValidator}
            value={hdl}
            onChangeText={(hdl) => this.onChangeFormValue({ hdl })}
          />
          <ValidationInput
            style={themedStyle.textInput}
            label="LDL Value (mmol/L)"
            validator={WeightValidator}
            value={ldl}
            onChangeText={(ldl) => this.onChangeFormValue({ ldl })}
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

export default withStyles(RiskCalculateForm, (theme: ThemeType) => ({
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
