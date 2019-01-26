// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { removeToDo, openEdit } from "../actions/todo";
import HistoryItem from "../components/HistoryItem.jsx";

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
  index: number,
  currentHistory: number
};

type State = {};

class HistoryContainer extends Component<Props, State> {
  constructor() {
    super();
  }

  render() {
    const { record, index, currentHistory } = this.props;

    return (
      <React.Fragment>
        <HistoryItem
          currentHistory={currentHistory === index + 1}
          record={record}
          index={index}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  currentHistory: state.toDo.currentHistory
});

export default connect(mapStateToProps)(HistoryContainer);
