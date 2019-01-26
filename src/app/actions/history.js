import {
  TOGGLE_RECORDING,
  CLEAR_HISTORY,
  PLAY_HISTORY,
  STOP_PLAY
} from "./action-types";

export function toggleRecording() {
  return (dispatch: Function, getState: Function) => {
    const { toDo, actionHistory } = getState();

    dispatch({
      type: TOGGLE_RECORDING,
      data: {},
      toDo,
      isRecording: actionHistory.isRecording
    });
  };
}

export function clearHistory() {
  return (dispatch: Function, getState: Function) => {
    const { toDo, actionHistory } = getState();

    dispatch({
      type: CLEAR_HISTORY,
      data: {},
      toDo,
      isRecording: actionHistory.isRecording
    });
  };
}

export function playHistory(startIndex: number) {
  return (dispatch: Function, getState: Function) => {
    const { toDo, actionHistory } = getState();

    dispatch({
      type: PLAY_HISTORY,
      data: { startIndex },
      history: actionHistory.history,
      toDo
    });
  };
}

export function stopPlay() {
  return (dispatch: Function, getState: Function) => {
    const { actionHistory } = getState();

    dispatch({
      type: STOP_PLAY,
      data: {},
      historySaved: actionHistory
    });
  };
}
