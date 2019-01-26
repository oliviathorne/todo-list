// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import HistoryContainer from "./HistoryContainer.jsx";
import PlaybackControls from "../components/PlaybackControls.jsx";
import { toggleRecording } from "../actions/history";

type Props = {
  history: Array<{
    type: string,
    prevState: {
      items: Array<{
        name?: string,
        description?: string,
        dateCreated?: string
      }>,
      isEditing: ?number
    }
  }>,
  dispatchToggleRecording: () => void
};

type State = {
  isRecording: boolean
};

const HistoryWrapper = styled.div`
  display: block;
  margin: 10px 0;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

const Divider = styled.hr`
  height: 1px;
  margin: 0;
  border: none;
  flex-shrink: 0;
  background-color: rgba(0, 0, 0, 0.12);
`;

const glow = keyframes`
  0% {
    box-shadow: 0 0 10px #f44336;
  }

  50% {
    box-shadow: none;
  }

  100% {
    box-shadow: 0 0 10px #f44336;
  }
`;

const RecordButton = styled.button`
  background: none;
  background-color: ${props => (props.isRecording ? "#f44336" : "#fff")};
  animation: ${props =>
    props.isRecording
      ? css`
          ${glow} 1.5s linear infinite;
        `
      : "none"};
  border: ${props => (props.isRecording ? "none" : "2px solid #f44336")};
  width: 20px;
  height: 20px;
  border-radius: 50%;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

const RecordText = styled.span`
  color: #f44336;
  font-weight: 500;
  margin-left: 5px;

  &:hover {
    cursor: pointer;
  }
`;

class ActionsContainer extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isRecording: true
    };
  }

  toggleRecording = () => {
    this.setState({
      isRecording: !this.state.isRecording
    });

    this.props.dispatchToggleRecording();
  };

  render() {
    const { history } = this.props;

    return (
      <React.Fragment>
        <RecordButton
          onClick={this.toggleRecording}
          isRecording={this.state.isRecording}
        />
        <RecordText onClick={this.toggleRecording}>
          {this.state.isRecording ? "Recording..." : "Record"}
        </RecordText>
        {history.length > 0 ? (
          <React.Fragment>
            <PlaybackControls history={history} />
            <HistoryWrapper>
              {history.map((record, index) => {
                return (
                  <React.Fragment key={index}>
                    <HistoryContainer index={index} record={record} />
                    {index !== history.length - 1 && <Divider />}
                  </React.Fragment>
                );
              })}
            </HistoryWrapper>
          </React.Fragment>
        ) : (
          <p>Start adding to do items for history to appear.</p>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  history: state.actionHistory.history
});

const mapDispatchToProps = dispatch => ({
  dispatchToggleRecording: () => dispatch(toggleRecording())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionsContainer);
