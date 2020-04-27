import React, { Component } from "react";
import { connect } from "react-redux";

import { serviceManager } from "@app/services/manager";
import Routes from "@app/navigation/Routes";
import { isUserLogged } from "@app/actions/auth";

class RootScreen extends Component {
  componentDidMount() {
    this.props.isUserLogged();
  }
  render() {
    const NavigationService = serviceManager.get("NavigationService");
    return (
      <Routes
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

const mapStateToProps = (state) => ({});

const Action = {
  isUserLogged,
};

export default connect(mapStateToProps, Action)(RootScreen);
