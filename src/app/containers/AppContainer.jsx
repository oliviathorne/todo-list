// @flow
import React, { Component } from "react";
import styled from "styled-components";
import FormContainer from "./FormContainer.jsx";
import ListContainer from "./ListContainer.jsx";
import ActionsContainer from "./ActionsContainer.jsx";

type Props = {};

type State = {};

const AppWrapper = styled.div`
  width: 95%;
  margin: auto;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const ToDoWrapper = styled.div`
  width: 60%;
  margin: 0;
  padding: 20px;
  border-right: 1px solid #d3d2d2;
  height: 100%;

  @media (max-width: 768px) {
    width: 100%;
    border-right: 0;
    border-bottom: 1px solid #d3d2d2;
  }
`;

const ActionWrapper = styled.div`
  width: 40%;
  margin: 0;
  padding: 20px;
  height: 100%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

class AppContainer extends Component<Props, State> {
  constructor() {
    super();
  }

  render() {
    return (
      <AppWrapper>
        <ToDoWrapper>
          <h3>To do items</h3>
          <ListContainer />
          <FormContainer />
        </ToDoWrapper>
        <ActionWrapper>
          <h3>Action history</h3>
          <ActionsContainer />
        </ActionWrapper>
      </AppWrapper>
    );
  }
}

export default AppContainer;
