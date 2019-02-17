import * as ACTIONS from 'constants/action_types';

const reducers = {};
const defaultState = {
  tags: [],
};

reducers[ACTIONS.UPDATE_FILETAGS] = (state, action) => {
  const fileTags = action.data;
  const tags = [];
  for (let i = 0; i < fileTags.length; i++) {
    tags.push({ id: i, name: action.data[i] });
  }
  return Object.assign({}, state, { tags });
};

reducers[ACTIONS.TAG_ADD] = (state, action) => {
  state.tags.push({
    id: state.tags.length,
    name: action.data,
  });
  return Object.assign({}, state, state.tags);
};

reducers[ACTIONS.TAG_DELETE] = (state, action) => {
  const fileTags = state.tags;
  const tags = [];
  for (let i = 0; i < fileTags.length; i++) {
    if (fileTags[i].name !== action.data) {
      tags.push({ id: i, name: action.data[i] });
    }
  }
  const y = Object.assign({}, state, { tags });
  return y;
};

export default function reducer(state = defaultState, action) {
  const handler = reducers[action.type];
  if (handler) return handler(state, action);
  return state;
}
