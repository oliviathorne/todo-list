// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { clearHistory, playHistory, stopPlay } from "../actions/history";

type Props = {
  dispatchClearHistory: () => void,
  dispatchPlayHistory: (index: number) => void,
  dispatchStopPlay: () => void,
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
  }>
};

type State = {};

const ControlWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
`;

const PlayButton = styled.button`
  background: none;
  border: 2px solid #2196f3;
  border-radius: 4px;
  color: #2196f3;

  &:hover {
    border: 2px solid #1976d2;
    background-color: #1976d2;
    color: #fff;
    cursor: pointer;
  }

  &:focus {
    border: 2px solid #2196f3;
    background-color: #fff;
    color: #2196f3;
    outline: none;
  }
`;

const ClearButton = styled.button`
  background: none;
  border: 2px solid #f44336;
  border-radius: 4px;
  color: #f44336;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

class PlaybackControls extends Component<Props, State> {
  constructor() {
    super();
  }

  clearAll = () => {
    this.props.dispatchClearHistory();
  };

  playAll = () => {
    this.props.dispatchPlayHistory(-1);

    const iterateItems = (array, interval, callback) => {
      if (!array.length) return;
      let i = 0;
      const next = () => {
        if (callback(array[i], i) !== false) {
          if (i++ < array.length - 1) {
            setTimeout(next, interval);
          } else {
            setTimeout(() => {
              this.props.dispatchStopPlay();
            }, interval);
          }
        }
      };
      next();
    };

    iterateItems(this.props.history, 1000, (element, index) => {
      this.props.dispatchPlayHistory(index);
    });
  };

  render() {
    const {} = this.props;
    return (
      <ControlWrapper>
        <PlayButton onClick={this.playAll}>&#9654; Play all</PlayButton>
        <ClearButton onClick={this.clearAll}>🗑️ Clear all</ClearButton>
      </ControlWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchClearHistory: () => dispatch(clearHistory()),
  dispatchPlayHistory: index => dispatch(playHistory(index)),
  dispatchStopPlay: () => dispatch(stopPlay())
});

export default connect(
  "",
  mapDispatchToProps
)(PlaybackControls);
