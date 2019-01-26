// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Input from "../components/Input.jsx";
import TextArea from "../components/TextArea.jsx";
import { addToDo, editToDo } from "../actions/todo";

type Props = {
  items: Array<{
    name?: string,
    description?: string,
    dateCreated?: string
  }>,
  openEdit: number,
  dispatchAddToDo: (name?: string, description?: string, date?: string) => void,
  dispatchEditToDo: (id: ?number, name?: string, description?: string) => void,
  editingItem: ?number
};

type State = {
  newItemValue: {
    name?: string,
    description?: string,
    dateCreated?: string
  },
  openAdd: boolean,
  showError: ?string
};

const FormWrapper = styled.form`
  font-weight: 600;
  position: relative;
`;

const ErrorMessage = styled.p`
  font-weight: 600;
  font-size: 10pt;
  color: #f44336;
  margin: 10px 0 0 0;
`;

const AddItemWrapper = styled.div`
  right: 16px;
  top: 0;
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const AddItem = styled.button`
  background: none;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  padding: 0;
  font-size: 0.875rem;
  min-width: 0;
  box-sizing: border-box;
  min-height: 36px;
  color: #fff;
  background-color: #2196f3;
  transform: scale(1);
  margin-left: 10px;
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 195ms;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0);

  &:hover {
    background-color: #1976d2;
    cursor: pointer;
  }

  &:focus {
    background-color: #1976d2;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  color: #fff;
  background-color: #2196f3;
  padding: 6px 16px;
  font-size: 0.875rem;
  border: 0;
  text-transform: uppercase;
  min-width: 64px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);

  &:hover {
    background-color: #1976d2;
    cursor: pointer;
  }

  &:focus {
    background-color: #1976d2;
    outline: none;
  }
`;

class FormContainer extends Component<Props, State> {
  constructor(props) {
    super(props);

    if (
      props.editingItem === props.openEdit &&
      props.items[props.editingItem]
    ) {
      this.state = {
        newItemValue: {
          name: props.items[props.editingItem].name,
          description: props.items[props.editingItem].description,
          dateCreated: props.items[props.editingItem].dateCreated
        },
        openAdd: false,
        showError: null
      };
    } else {
      this.state = {
        newItemValue: {
          name: "",
          description: "",
          dateCreated: ""
        },
        openAdd: false,
        showError: null
      };
    }
  }

  formatDate = (date: Date) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    return `${
      monthNames[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  };

  openAdd = (e: SyntheticInputEvent<EventTarget>) => {
    e.preventDefault();

    this.setState({
      openAdd: true
    });
  };

  handleChange = (e: SyntheticInputEvent<EventTarget>, input: string) => {
    if (input === "name") {
      this.setState({
        newItemValue: Object.assign({}, this.state.newItemValue, {
          name: e.target.value
        })
      });
    } else if (input === "description") {
      this.setState({
        newItemValue: Object.assign({}, this.state.newItemValue, {
          description: e.target.value
        })
      });
    }
  };

  handleAdd = (e: SyntheticInputEvent<EventTarget>) => {
    e.preventDefault();
    const itemName = this.state.newItemValue.name;
    const itemDescription = this.state.newItemValue.description;

    try {
      if (!itemName) throw "Please enter a name";
      if (!itemDescription) throw "Please enter a description";
    } catch (err) {
      this.setState({
        showError: err
      });

      return null;
    }

    if (typeof this.props.editingItem !== "undefined") {
      this.props.dispatchEditToDo(
        this.props.editingItem,
        itemName,
        itemDescription
      );
    } else {
      this.props.dispatchAddToDo(
        itemName,
        itemDescription,
        this.formatDate(new Date())
      );
    }

    this.setState({
      newItemValue: {
        name: "",
        description: "",
        dateCreated: ""
      },
      openAdd: false,
      showError: null
    });
  };

  render() {
    const { editingItem, openEdit } = this.props;

    return (
      <FormWrapper onSubmit={this.handleAdd}>
        {editingItem !== openEdit &&
          !this.state.openAdd && (
            <AddItemWrapper>
              <h5>Add a new to do</h5>
              <AddItem onClick={this.openAdd}>
                <h3>+</h3>
              </AddItem>
            </AddItemWrapper>
          )}
        {(this.state.openAdd || editingItem === openEdit) && (
          <React.Fragment>
            <ErrorMessage>{this.state.showError}</ErrorMessage>
            <Input
              name="toDoName"
              handleChange={e => this.handleChange(e, "name")}
              type="text"
              value={this.state.newItemValue.name}
              label="Name"
            />
            <TextArea
              name="toDoName"
              handleChange={e => this.handleChange(e, "description")}
              type="text"
              value={this.state.newItemValue.description}
              label="Description"
            />
            <SubmitButton type="Submit">
              {editingItem === openEdit ? "Save change" : "Add item"}
            </SubmitButton>
          </React.Fragment>
        )}
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  items: state.toDo.items,
  openEdit: state.toDo.isEditing
});

const mapDispatchToProps = dispatch => ({
  dispatchAddToDo: (name, description, date) =>
    dispatch(addToDo(name, description, date)),
  dispatchEditToDo: (id, name, description) =>
    dispatch(editToDo(id, name, description))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainer);
