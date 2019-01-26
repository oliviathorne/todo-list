import React from "react";
import styled from "styled-components";
import AppContainer from "./containers/AppContainer.jsx";

const AppWrapper = styled.div`
  height: 100%;
`;

const App = () => (
  <AppWrapper>
    <AppContainer />
  </AppWrapper>
);

export default App;
