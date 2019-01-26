// @flow
import { ADD_TODO, REMOVE_TODO, EDIT_TODO, OPEN_EDIT } from "./action-types";

export function addToDo(name: string, description: string, date: string) {
  return (dispatch: Function, getState: Function) => {
    const { toDo, actionHistory } = getState();

    dispatch({
      type: ADD_TODO,
      data: { name, description, date },
      toDo,
      isRecording: actionHistory.isRecording
    });
  };
}

export function removeToDo(id: number, name: string) {
  return (dispatch: Function, getState: Function) => {
    const { toDo, actionHistory } = getState();

    dispatch({
      type: REMOVE_TODO,
      data: { id, name },
      toDo,
      isRecording: actionHistory.isRecording
    });
  };
}

export function editToDo(id: number, name: string, description: string) {
  return (dispatch: Function, getState: Function) => {
    const { toDo, actionHistory } = getState();

    dispatch({
      type: EDIT_TODO,
      data: { id, name, description },
      toDo,
      isRecording: actionHistory.isRecording
    });
  };
}

export function openEdit(id: number) {
  return {
    type: OPEN_EDIT,
    data: { id }
  };
}
