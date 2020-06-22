import React, { Component } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import {
  Button,
  withStyles,
  Text,
  Radio,
  RadioGroup,
} from "react-native-ui-kitten";

import ValidationInput from "@app/components/common/ValidationInput";
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

class ComplicationComponent extends Component {
  state = {
    gender: "male",
    age: "",
    bmi: "",
    dia_duration: "",
    insulin: false,
    medi_treatment: false,
    hba1c: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const isStateChanged = this.state !== prevState;

    if (isStateChanged) {
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
    const {
      style,
      themedStyle,
      activityLevels,
      complications,
      ...restProps
    } = this.props;

    const {
      gender,
      age,
      bmi,
      dia_duration,
      insulin,
      medi_treatment,
      hba1c,
    } = this.state;

    return (
      <View style={[themedStyle.container, style]} {...restProps}>
        <View style={themedStyle.formContainer}>
          <View style={themedStyle.complicationContainer}>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text
                style={{
                  color: "#014201",
                  fontSize: 18,
                  marginTop: 10,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {`Foot Ulcer: ${complications.result_foot_ulcer}`}
              </Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text
                style={{
                  color: "#014201",
                  fontSize: 18,
                  marginTop: 10,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {`nephropathy: ${complications.result_nephropathy}`}
              </Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text
                style={{
                  color: "#014201",
                  fontSize: 18,
                  marginTop: 10,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {`neuropathy: ${complications.result_neuropathy}`}
              </Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Text
                style={{
                  color: "#014201",
                  fontSize: 18,
                  marginTop: 10,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {`retinopathy: ${complications.result_retinopathy}`}
              </Text>
            </View>
          </View>
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
            style={themedStyle.textInput}
            label="Age (years)"
            validator={WeightValidator}
            value={age}
            onChangeText={(age) => this.onChangeFormValue({ age })}
          />
          <ValidationInput
            style={themedStyle.textInput}
            label="BMI Value (kg/m2)"
            validator={WeightValidator}
            value={bmi}
            onChangeText={(bmi) => this.onChangeFormValue({ bmi })}
          />
          <ValidationInput
            style={themedStyle.textInput}
            label="Diabetes Duration(years)"
            validator={WeightValidator}
            value={dia_duration}
            onChangeText={(dia_duration) =>
              this.onChangeFormValue({ dia_duration })
            }
          />
          <ValidationInput
            style={themedStyle.textInput}
            label="HBA1c (mmol/L)"
            validator={WeightValidator}
            value={hba1c}
            onChangeText={(hba1c) => this.onChangeFormValue({ hba1c })}
          />
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Radio
              checked={insulin}
              disabled={medi_treatment}
              onChange={() => this.onChangeRadioValue("insulin")}
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
              Insulin Treatment
            </Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Radio
              disabled={insulin}
              checked={medi_treatment}
              onChange={() => this.onChangeRadioValue("medi_treatment")}
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
              Medical Treatment
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default withStyles(ComplicationComponent, (theme: ThemeType) => ({
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
  complicationContainer: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#57cf57",
    borderRadius: 10,
    padding: 10,
  },
}));
