// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import { clearHistory, playHistory, stopPlay } from "../actions/history";

type Props = {
  record: {
    type: string,
    prevState: {
      items: Array<{
        name?: string,
        description?: string,
        dateCreated?: string
      }>,
      isEditing: ?number
    }
  },
  dispatchPlayHistory: (index: number) => void,
  dispatchStopPlay: () => void,
  index: number,
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
  currentHistory: boolean
};

type State = {};

const slidingGradient = keyframes`
  0% {
    background-position: 100% 0%
  }
  100% {
    background-position: 15% 100%
  }
`;

const HistoryCard = styled.div`
  width: 100%;
  padding: 18px 16px;
  background-color: ${props =>
    props.currentHistory ? "rgba(85, 188, 255, 1)" : "#fff"};
  background: ${props =>
    props.currentHistory
      ? "linear-gradient(45deg,rgba(85, 188, 255, 1) 0%,rgba(91, 240, 255, 1) 33%,rgba(85, 188, 255, 1) 66%,rgba(91, 240, 255, 1) 100%)"
      : "none"};
  background-size: 400% 400%;
  border-radius: 4px;
  animation: ${props =>
    props.currentHistory
      ? css`
          ${slidingGradient} 1.5s linear 1;
        `
      : "none"};
`;

const RecordType = styled.span`
  background-color: ${props =>
    props.color === "current" ? "#fff" : props.color};
  max-width: 120px;
  min-width: 120px;
  border-radius: 13px;
  padding: 5px 10px;
  color: ${props => (props.color === "current" ? "#55bcff" : "#fff")};
  font-size: 10pt;
  display: inline-flex;
  justify-content: center;
  text-transform: uppercase;
`;

const PlayButton = styled.button`
  background: none;
  border: ${props =>
    props.currentHistory ? "2px solid #fff" : "2px solid #00d2af"};
  border-radius: 50%;
  color: ${props => (props.currentHistory ? "#fff" : "#00d2af")};

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

class HistoryItem extends Component<Props, State> {
  constructor() {
    super();
  }

  playHistory = () => {
    this.props.dispatchPlayHistory(-1);

    const iterateItems = (array, interval, callback) => {
      if (!array.length) return;
      let i = this.props.index + 1;
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
    const { record, currentHistory, index } = this.props;
    let recordType;
    let recordColor;

    switch (record.type) {
      case "ADD_TODO":
        recordType = "Added item";
        recordColor = "#00d2af";
        break;
      case "REMOVE_TODO":
        recordType = "Removed item";
        recordColor = "#f44336";
        break;
      case "EDIT_TODO":
        recordType = "Updated item";
        recordColor = "#fea730";
        break;
      default:
        break;
    }

    return (
      <React.Fragment>
        <HistoryCard currentHistory={currentHistory}>
          <HistoryHeader>
            <RecordType color={currentHistory ? "current" : recordColor}>
              {recordType}
            </RecordType>
            <PlayButton
              onClick={this.playHistory}
              currentHistory={currentHistory}
            >
              &#9654;
            </PlayButton>
          </HistoryHeader>
        </HistoryCard>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  history: state.actionHistory.history
});

const mapDispatchToProps = dispatch => ({
  dispatchClearHistory: () => dispatch(clearHistory()),
  dispatchPlayHistory: index => dispatch(playHistory(index)),
  dispatchStopPlay: () => dispatch(stopPlay())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryItem);
