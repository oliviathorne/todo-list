// @flow
import { combineReducers } from "redux";
import {
  ADD_TODO,
  REMOVE_TODO,
  EDIT_TODO,
  OPEN_EDIT,
  TOGGLE_RECORDING,
  CLEAR_HISTORY,
  PLAY_HISTORY,
  STOP_PLAY
} from "../actions/action-types.js";

type InitialState = {
  +items: Array<{
    name?: string,
    description?: string,
    dateCreated?: string
  }>,
  +isEditing: ?number
};

type InitialRecord = {
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
  isRecording: boolean
};

type Action = {
  type: string,
  data: {
    [key: string]: any
  },
  toDo: {
    items: Array<{
      name?: string,
      description?: string,
      dateCreated?: string
    }>,
    isEditing: ?number
  },
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
  historySaved: {
    savedState: {
      items: Array<{
        name?: string,
        description?: string,
        dateCreated?: string
      }>
    }
  },
  isRecording: boolean
};

let initialFormState: InitialState = {
  items: [],
  isEditing: null,
  currentHistory: null
};

let initialRecordState: InitialRecord = {
  history: [],
  isRecording: true,
  savedState: {}
};

function itemReducer(state = initialFormState, action: Action): InitialState {
  let newState: InitialState;

  switch (action.type) {
    case ADD_TODO:
      newState = Object.assign({}, state, {
        items: [
          ...state.items,
          {
            name: action.data.name,
            description: action.data.description,
            dateCreated: action.data.date
          }
        ]
      });
      return newState;
    case REMOVE_TODO:
      const tempItems = [...state.items];
      tempItems.splice(parseInt(action.data.id, 10), 1);

      newState = Object.assign({}, state, {
        items: tempItems
      });
      return newState;
    case OPEN_EDIT:
      newState = Object.assign({}, state, {
        isEditing: parseInt(action.data.id, 10)
      });

      return newState;
    case EDIT_TODO:
      const tempEdit = [...state.items];
      tempEdit[parseInt(action.data.id, 10)] = Object.assign(
        {},
        state.items[parseInt(action.data.id, 10)],
        {
          name: action.data.name,
          description: action.data.description
        }
      );

      newState = Object.assign({}, state, {
        items: tempEdit,
        isEditing: null
      });

      return newState;
    case PLAY_HISTORY:
      if (action.data.startIndex >= 0) {
        newState = Object.assign({}, state, {
          items: action.history[action.data.startIndex].prevState.items,
          currentHistory: action.data.startIndex
        });

        return newState;
      }

      return state;
    case STOP_PLAY:
      newState = Object.assign({}, state, {
        items: action.historySaved.savedState.items,
        currentHistory: null
      });

      return newState;
    default:
      return state;
  }
}

function actionRecorderReducer(
  state = initialRecordState,
  action: Action
): InitialRecord {
  let newState: InitialRecord;

  switch (action.type) {
    case OPEN_EDIT:
      return state;
    case "@@INIT":
      return state;
    case TOGGLE_RECORDING:
      newState = Object.assign({}, state, {
        isRecording: !action.isRecording
      });

      return newState;
    case CLEAR_HISTORY:
      newState = Object.assign({}, state, {
        history: []
      });

      return newState;
    case PLAY_HISTORY:
      if (action.data.startIndex === -1) {
        newState = Object.assign({}, state, {
          savedState: action.toDo
        });

        return newState;
      }

      return state;
    default:
      if (!action.isRecording) {
        return state;
      }

      newState = Object.assign({}, state, {
        history: [
          ...state.history,
          {
            type: action.type,
            prevState: action.toDo
          }
        ]
      });

      return newState;
  }
}

const rootReducer = combineReducers({
  actionHistory: actionRecorderReducer,
  toDo: itemReducer
});

export default rootReducer;
