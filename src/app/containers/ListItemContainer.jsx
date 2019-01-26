// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import FormContainer from "../containers/FormContainer.jsx";
import { removeToDo, openEdit } from "../actions/todo";
import ListItem from "../components/ListItem.jsx";

type Props = {
  item: {
    name: string,
    description: string,
    dateCreated: Date
  },
  id: number,
  dispatchRemoveToDo: (id: number, name: string) => void,
  dispatchOpenEdit: (id: number) => void,
  openEdit: number
};

type State = {
  isEditing: boolean
};

const ItemCard = styled.li`
  display: block;
  margin: 10px 0;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

class ListItemContainer extends Component<Props, State> {
  constructor() {
    super();

    this.state = {
      isEditing: false
    };
  }

  handleEdit = () => {
    this.props.dispatchOpenEdit(this.props.id);
  };

  render() {
    const { item, dispatchRemoveToDo, id, openEdit } = this.props;

    return (
      <ItemCard>
        {openEdit === id ? (
          <React.Fragment>
            <FormContainer editingItem={id} />
          </React.Fragment>
        ) : (
          <ListItem
            item={item}
            handleEdit={this.handleEdit}
            removeToDo={() => dispatchRemoveToDo(id, item.name)}
          />
        )}
      </ItemCard>
    );
  }
}

const mapStateToProps = state => ({
  openEdit: state.toDo.isEditing
});

const mapDispatchToProps = dispatch => ({
  dispatchRemoveToDo: (id, name) => dispatch(removeToDo(id, name)),
  dispatchOpenEdit: id => dispatch(openEdit(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemContainer);
