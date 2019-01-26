// @flow
import React, { Component } from "react";
import styled from "styled-components";
import FormContainer from "../containers/FormContainer.jsx";
import { removeToDo, openEdit } from "../actions/todo";

type Props = {
  removeToDo: () => void,
  handleEdit: () => void,
  item: {
    name: string,
    description: string,
    dateCreated: Date
  }
};

type State = {};

const ItemName = styled.p`
  font-size: 14pt;
  font-weight: 600;
  margin-bottom: 0;
`;

const ItemDescription = styled.p``;

const ItemDate = styled.p`
  font-size: 10pt;
  color: grey;
`;

const ItemControls = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ItemButton = styled.button`
  background: none;
  border: 0;
  color: #2196f3;
  padding: 4px;
  margin: 0 4px;
  font-size: 11pt;
  text-transform: uppercase;
  border-radius: 4px;

  &:hover {
    background-color: rgba(33, 150, 243, 0.08);
    text-decoration: none;
    cursor: pointer;
  }

  &:focus {
    outline: none;
    background-color: rgba(33, 150, 243, 0.08);
    text-decoration: none;
  }
`;

class ListItem extends Component<Props, State> {
  constructor() {
    super();
  }

  render() {
    const { item, removeToDo, handleEdit } = this.props;

    return (
      <React.Fragment>
        <ItemName>{item.name}</ItemName>
        <ItemDate>{item.dateCreated}</ItemDate>
        <ItemDescription>{item.description}</ItemDescription>

        <ItemControls>
          <ItemButton onClick={handleEdit}>Edit</ItemButton>
          <ItemButton onClick={removeToDo}>Remove</ItemButton>
        </ItemControls>
      </React.Fragment>
    );
  }
}

export default ListItem;
