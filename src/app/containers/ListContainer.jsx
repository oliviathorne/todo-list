// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import ListItemContainer from "../containers/ListItemContainer.jsx";

type Props = {
  items: Array<{
    name?: string,
    description?: string,
    dateCreated?: Date
  }>,
  handleEdit: (id: number) => void
};

type State = {};

const ListWrapper = styled.ul`
  padding: 10px 0;
`;

class ListContainer extends Component<Props, State> {
  render() {
    const { items, handleEdit } = this.props;

    return (
      <ListWrapper>
        {items.map((item, index) => (
          <ListItemContainer
            handleEdit={handleEdit}
            key={index}
            item={item}
            id={index}
          />
        ))}
      </ListWrapper>
    );
  }
}

const mapStateToProps = state => ({
  items: state.toDo.items
});

export default connect(mapStateToProps)(ListContainer);
