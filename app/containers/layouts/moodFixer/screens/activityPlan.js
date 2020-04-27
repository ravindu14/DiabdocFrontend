import React, { Component } from "react";
import { View, Text, Image, ActivityIndicator, Dimensions } from "react-native";
import { connect } from "react-redux";
import { withStyles, Button, Radio, RadioGroup } from "react-native-ui-kitten";
import { LinearGradient } from "expo-linear-gradient";
import { navigate } from "@app/actions/routes";
import { ASYNC_STATUS } from "@app/constants/async";
import { WeightValidator } from "@app/validators";
import { getUserData } from "@app/actions/auth";
import { getActivityPlan } from "@app/actions/stress";

import ScrollableAvoidKeyboardComponent from "@app/components/common/ScrollableAvoidKeyboardComponent";
import ValidationInput from "@app/components/common/ValidationInput";
import Alert from "@app/components/Alert";

class ActivityPlanScreen extends Component {
  state = {
    workHours: "",
    freeHours: "",
    sleepHours: "",
    employ: 0,
    famHours: 0,
    ill: 0,
    active: 0,
    depression: {
      question1: 0,
      question2: 0,
      question3: 0,
      question4: 0,
      question5: 0,
      question6: 0,
      question7: 0,
    },
    anxiety: {
      question1: 0,
      question2: 0,
      question3: 0,
      question4: 0,
      question5: 0,
      question6: 0,
      question7: 0,
    },
  };

  componentDidMount() {
    this.props.getUserData();
  }

  getMoodMarks = (mood) => {
    switch (mood) {
      case "Angry":
        return 0;
      case "Fear":
        return 1;
      case "Happy":
        return 2;
      case "Sad":
        return 3;
      case "Surprised":
        return 4;
      case "Neutral":
        return 5;
      default:
        return 0;
    }
  };

  onCalculateButtonPress = () => {
    const {
      userDetails: { age, gender },
      predictedResult,
    } = this.props;

    let emotion = this.getMoodMarks(predictedResult);

    let {
      workHours,
      freeHours,
      sleepHours,
      employ,
      famHours,
      ill,
      depression,
      anxiety,
      active,
    } = this.state;

    workHours = parseInt(workHours);
    freeHours = parseInt(freeHours);
    sleepHours = parseInt(sleepHours);

    let total1 = 0;

    if (employ === 2) {
      total1 += 3;
    }

    if (workHours >= 0 && workHours < 5) {
      total1 += 1;
    } else if (workHours >= 5 && workHours < 10) {
      total1 += 2;
    } else if (workHours >= 10 && workHours < 14) {
      total1 += 3;
    }

    if (freeHours >= 0 && freeHours < 3) {
      total1 += 3;
    } else if (freeHours >= 3 && freeHours < 6) {
      total1 += 2;
    } else if (freeHours >= 6 && freeHours < 9) {
      total1 += 1;
    }

    if (sleepHours >= 0 && sleepHours < 5) {
      total1 += 3;
    } else if (sleepHours >= 6 && sleepHours < 9) {
      total1 += 2;
    } else if (sleepHours >= 9 && sleepHours < 11) {
      total1 += 1;
    }

    if (famHours === 1) {
      total1 += 3;
    }

    if (ill === 2) {
      total1 += 3;
    }

    if (emotion === 5) {
      total1 += 1;
    } else if (emotion === 3 || emotion === 4) {
      total1 += 2;
    } else if (emotion === 0 || emotion === 1) {
      total1 += 3;
    }

    let total2 = 0;

    if (active === 1) {
      total2 += depression.question1 - 1;
      total2 += depression.question2 - 1;
      total2 += depression.question3 - 1;
      total2 += depression.question4 - 1;
      total2 += depression.question5 - 1;
      total2 += depression.question6 - 1;
      total2 += depression.question7 - 1;
    } else if (active === 2) {
      total2 += anxiety.question1 - 1;
      total2 += anxiety.question2 - 1;
      total2 += anxiety.question3 - 1;
      total2 += anxiety.question4 - 1;
      total2 += anxiety.question5 - 1;
      total2 += anxiety.question6 - 1;
      total2 += anxiety.question7 - 1;
    }

    let score = (total1 + total2) / 2.0;

    this.props.getActivityPlan({
      sex: gender === "male" ? 1 : 2,
      age: parseFloat(age),
      employ: parseFloat(employ),
      workHours: parseFloat(workHours),
      freeHours: parseFloat(freeHours),
      sleepHours: parseFloat(sleepHours),
      famHours: parseFloat(famHours) - 1,
      ill: parseFloat(ill) - 1,
      emotion,
      score,
    });
  };

  onChangeFormValue = (value) => {
    this.setState({
      ...this.state,
      ...value,
    });
  };

  onChangeDepressionValue = (value) => {
    this.setState(({ depression }) => ({
      depression: {
        ...depression,
        ...value,
      },
    }));
  };

  onChangeAnxietyValue = (value) => {
    this.setState(({ anxiety }) => ({
      anxiety: {
        ...anxiety,
        ...value,
      },
    }));
  };

  render() {
    const {
      workHours,
      freeHours,
      sleepHours,
      employ,
      famHours,
      ill,
      active,
      depression,
      anxiety,
    } = this.state;
    const {
      themedStyle,
      status,
      notification,
      authNotification,
      authStatus,
    } = this.props;

    if (
      status === ASYNC_STATUS.LOADING ||
      authStatus === ASYNC_STATUS.LOADING
    ) {
      return (
        <LinearGradient colors={["#005A00", "#000000"]} style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </LinearGradient>
      );
    }

    return (
      <ScrollableAvoidKeyboardComponent style={themedStyle.formContainer}>
        <LinearGradient colors={["#005A00", "#000000"]} style={{ flex: 1 }}>
          <View style={themedStyle.container}>
            <ValidationInput
              style={themedStyle.textInput}
              label="Working Hours (hours)"
              validator={WeightValidator}
              value={workHours}
              onChangeText={(workHours) =>
                this.onChangeFormValue({ workHours })
              }
            />
            <ValidationInput
              style={themedStyle.textInput}
              label="Free Hours (hours)"
              validator={WeightValidator}
              value={freeHours}
              onChangeText={(freeHours) =>
                this.onChangeFormValue({ freeHours })
              }
            />
            <ValidationInput
              style={themedStyle.textInput}
              label="Sleep Hours (hours)"
              validator={WeightValidator}
              value={sleepHours}
              onChangeText={(sleepHours) =>
                this.onChangeFormValue({ sleepHours })
              }
            />
            <RadioGroup
              selectedIndex={employ}
              onChange={(employ) => this.onChangeFormValue({ employ })}
            >
              <Text style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}>
                Are you employed?
              </Text>
              <Radio
                key={0}
                text="No"
                style={{ marginVertical: 10 }}
                textStyle={{ color: "#ffffff" }}
              />
              <Radio
                key={1}
                text="Yes"
                style={{ marginVertical: 10 }}
                textStyle={{ color: "#ffffff" }}
              />
            </RadioGroup>
            <RadioGroup
              selectedIndex={famHours}
              onChange={(famHours) => this.onChangeFormValue({ famHours })}
            >
              <Text style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}>
                You have a family time?
              </Text>
              <Radio
                key={0}
                text="No"
                style={{ marginVertical: 10 }}
                textStyle={{ color: "#ffffff" }}
              />
              <Radio
                key={1}
                text="Yes"
                style={{ marginVertical: 10 }}
                textStyle={{ color: "#ffffff" }}
              />
            </RadioGroup>
            <RadioGroup
              selectedIndex={ill}
              onChange={(ill) => this.onChangeFormValue({ ill })}
            >
              <Text style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}>
                You have other illnesses?
              </Text>
              <Radio
                key={0}
                text="No"
                style={{ marginVertical: 10 }}
                textStyle={{ color: "#ffffff" }}
              />
              <Radio
                key={1}
                text="Yes"
                style={{ marginVertical: 10 }}
                textStyle={{ color: "#ffffff" }}
              />
            </RadioGroup>
            <RadioGroup
              selectedIndex={active}
              onChange={(active) => this.onChangeFormValue({ active })}
            >
              <Text style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}>
                What you want activities for?
              </Text>
              <Radio
                key={1}
                text="Depression"
                style={{ marginVertical: 10 }}
                textStyle={{ color: "#ffffff" }}
              />
              <Radio
                key={2}
                text="Anxiety"
                style={{ marginVertical: 10 }}
                textStyle={{ color: "#ffffff" }}
              />
            </RadioGroup>
            {active === 1 && (
              <View>
                <RadioGroup
                  selectedIndex={depression.question1}
                  onChange={(question1) =>
                    this.onChangeDepressionValue({ question1 })
                  }
                >
                  <Text
                    style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                  >
                    I still enjoy the things I used to enjoy:
                  </Text>
                  <Radio
                    key={0}
                    text="Definitely as much"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={1}
                    text="Not quite so much"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={2}
                    text="Only a little"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={3}
                    text="Hardly at all"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                </RadioGroup>
                <RadioGroup
                  selectedIndex={depression.question2}
                  onChange={(question2) =>
                    this.onChangeDepressionValue({ question2 })
                  }
                >
                  <Text
                    style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                  >
                    I can laugh and see the funny side of things:
                  </Text>
                  <Radio
                    key={0}
                    text="As much as I always could"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={1}
                    text="Not quite so much now"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={2}
                    text="Definitely not so much now"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={3}
                    text="Not at all"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                </RadioGroup>
                <RadioGroup
                  selectedIndex={depression.question3}
                  onChange={(question3) =>
                    this.onChangeDepressionValue({ question3 })
                  }
                >
                  <Text
                    style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                  >
                    I feel cheerful:
                  </Text>
                  <Radio
                    key={0}
                    text="Most of the time"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={1}
                    text="Sometimes"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={2}
                    text="Not often"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={3}
                    text="Not at all"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                </RadioGroup>
                <RadioGroup
                  selectedIndex={depression.question4}
                  onChange={(question4) =>
                    this.onChangeDepressionValue({ question4 })
                  }
                >
                  <Text
                    style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                  >
                    I feel as if I am slowed down:
                  </Text>
                  <Radio
                    key={0}
                    text="Not at all"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={1}
                    text="Sometimes"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={2}
                    text="Very often"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={3}
                    text="Nearly all the time"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                </RadioGroup>
                <RadioGroup
                  selectedIndex={depression.question5}
                  onChange={(question5) =>
                    this.onChangeDepressionValue({ question5 })
                  }
                >
                  <Text
                    style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                  >
                    I have lost interest in my appearance:
                  </Text>
                  <Radio
                    key={0}
                    text="I take just as much care as ever"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={1}
                    text="I may not take quite as much care"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={2}
                    text="I don't take as much care as I should"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={3}
                    text="Definitely"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                </RadioGroup>
                <RadioGroup
                  selectedIndex={depression.question6}
                  onChange={(question6) =>
                    this.onChangeDepressionValue({ question6 })
                  }
                >
                  <Text
                    style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                  >
                    I look forward with enjoyment to things:
                  </Text>
                  <Radio
                    key={0}
                    text="As much as I ever did"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={1}
                    text="Rather less than I used to"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={2}
                    text="Definitely less than I used to"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={3}
                    text="Hardly at all"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                </RadioGroup>
                <RadioGroup
                  selectedIndex={depression.question7}
                  onChange={(question7) =>
                    this.onChangeDepressionValue({ question7 })
                  }
                >
                  <Text
                    style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                  >
                    I can enjoy a good book or radio or TV program:
                  </Text>
                  <Radio
                    key={0}
                    text="Often"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={1}
                    text="Sometimes"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={2}
                    text="Not often"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={3}
                    text="Very seldom"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                </RadioGroup>
              </View>
            )}
            {active === 2 && (
              <View>
                <RadioGroup
                  selectedIndex={anxiety.question1}
                  onChange={(question1) =>
                    this.onChangeAnxietyValue({ question1 })
                  }
                >
                  <Text
                    style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                  >
                    I feel tense or 'wound up':
                  </Text>
                  <Radio
                    key={0}
                    text="Not at all"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={1}
                    text="From time to time, occasionally"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={2}
                    text="A lot of the time"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={3}
                    text="Most of the time"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                </RadioGroup>
                <RadioGroup
                  selectedIndex={anxiety.question2}
                  onChange={(question2) =>
                    this.onChangeAnxietyValue({ question2 })
                  }
                >
                  <Text
                    style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                  >
                    I get a sort of frightened feeling as if something awful is
                    about to happen:
                  </Text>
                  <Radio
                    key={0}
                    text="Not at all"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={1}
                    text="A little, but it doesn't worry me"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={2}
                    text="Yes, but not too badly"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={3}
                    text="Very definitely and quite badly"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                </RadioGroup>
                <RadioGroup
                  selectedIndex={anxiety.question3}
                  onChange={(question3) =>
                    this.onChangeAnxietyValue({ question3 })
                  }
                >
                  <Text
                    style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                  >
                    Worrying thoughts go through my mind:
                  </Text>
                  <Radio
                    key={0}
                    text="Only occasionally"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={1}
                    text="From time to time, but not too often"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={2}
                    text="A lot of the time"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={3}
                    text="A great deal of the time"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                </RadioGroup>
                <RadioGroup
                  selectedIndex={anxiety.question4}
                  onChange={(question4) =>
                    this.onChangeAnxietyValue({ question4 })
                  }
                >
                  <Text
                    style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                  >
                    I can sit at ease and feel relaxed:
                  </Text>
                  <Radio
                    key={0}
                    text="Definitely"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={1}
                    text="Usually"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={2}
                    text="Not Often"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={3}
                    text="Not at all"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                </RadioGroup>
                <RadioGroup
                  selectedIndex={anxiety.question5}
                  onChange={(question5) =>
                    this.onChangeAnxietyValue({ question5 })
                  }
                >
                  <Text
                    style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                  >
                    I get a sort of frightened feeling like 'butterflies' in the
                    stomach:
                  </Text>
                  <Radio
                    key={0}
                    text="Not at all"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={1}
                    text="Occasionally"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={2}
                    text="Quite Often"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={3}
                    text="Very Often"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                </RadioGroup>
                <RadioGroup
                  selectedIndex={anxiety.question6}
                  onChange={(question6) =>
                    this.onChangeAnxietyValue({ question6 })
                  }
                >
                  <Text
                    style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                  >
                    I feel restless as I have to be on the move:
                  </Text>
                  <Radio
                    key={0}
                    text="Not at all"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={1}
                    text="Not very much"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={2}
                    text="Quite a lot"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={3}
                    text="Very much indeed"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                </RadioGroup>
                <RadioGroup
                  selectedIndex={anxiety.question7}
                  onChange={(question7) =>
                    this.onChangeAnxietyValue({ question7 })
                  }
                >
                  <Text
                    style={{ color: "#ffffff", fontSize: 14, marginTop: 10 }}
                  >
                    I get sudden feelings of panic:
                  </Text>
                  <Radio
                    key={0}
                    text="Not at all"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={1}
                    text="Not very often"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={2}
                    text="Quite often"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                  <Radio
                    key={3}
                    text="Very often indeed"
                    style={{ marginVertical: 10 }}
                    textStyle={{ color: "#ffffff" }}
                  />
                </RadioGroup>
              </View>
            )}
            {notification !== null && (
              <Alert status={Alert.STATUS.DANGER}>{notification}</Alert>
            )}
            {authNotification !== null && (
              <Alert status={Alert.STATUS.DANGER}>{authNotification}</Alert>
            )}
            <View style={themedStyle.buttonContainer}>
              <Button
                style={themedStyle.ActionButton}
                size="giant"
                onPress={this.onCalculateButtonPress}
              >
                GET ACTIVITIES
              </Button>
            </View>
          </View>
        </LinearGradient>
      </ScrollableAvoidKeyboardComponent>
    );
  }
}

const Actions = {
  getUserData,
  getActivityPlan,
};

function mapStateToProps(state) {
  return {
    status: state.stress.status,
    notification: state.stress.notification,
    authStatus: state.auth.status,
    authNotification: state.auth.notification,
    userDetails: state.auth.userDetails,
    predictedResult: state.stress.predictedResult,
  };
}

const ActivityPlanScreenContainer = connect(
  mapStateToProps,
  Actions
)(ActivityPlanScreen);

export default withStyles(ActivityPlanScreenContainer, (theme) => ({
  formContainer: {
    flex: 1,
  },
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  imageContainer: {
    marginTop: 60,
  },
  buttonContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  ActionButton: {},
}));
