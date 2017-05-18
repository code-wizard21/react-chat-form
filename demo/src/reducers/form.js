const form = (state = {}, action) => {
  switch (action.type) {
    case 'react-chat-form-update':
        let newState = {...state};
        newState[action.property] = action.response;   
        return newState;
    default:
      return state
  }
}
export default form;