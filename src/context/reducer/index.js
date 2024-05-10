export default function appReducer(state, action) {
  const type = action.type.split("_")[0];
  const model = action.type.split("_")[1];
  switch (type) {
    case "request": {
      state[`is${model}`] = true;
      state[`res${model}`] = [];
      return { ...state };
    }

    case "error": {
      state[action.type] = action.error;
      state[`err_${model}`] = false;
      return { ...state };
    }

    case "response": {
      state[`res${model}`] = action.response.data;
      state[`is${model}`] = false;
      return { ...state };
    }

    case "login": {
      return {
        // ...state,
        /* islogin: !!JSON.parse(localStorage.getItem("auth")),
        _auth: JSON.parse(localStorage.getItem("auth")), */
        notification: false,
        lang: "mn",
        filter: undefined,
        errorMsg: "",
        isOpenError: false,
        modalVisible: false,
        islogin: action.response,
        _auth: action.response
          ? JSON.parse(localStorage.getItem("auth"))
          : undefined,
      };
    }
    case "filter": {
      return { ...state, filter: action.response };
    }
    case "auth": {
      return {
        ...state,
        _auth: action.response,
      };
    }
    case "notification": {
      return {
        ...state,
        notification: action.response,
      };
    }
    case "setMonitoring": {
      return {
        ...state,
        monitoring: action.response,
      };
    }
    case "setError": {
      return {
        ...state,
        errorMsg: action.response.message,
        isOpenError: action.response.isOpen,
      };
    }
    // case "setGuide": {
    //   return {
    //     ...state,
    //     guideContent: action.response,
    //   };
    // }
    case "setVPC": {
      return {
        ...state,
        ressearchvpc: action.response,
      };
    }
    case "setModal": {
      return {
        ...state,
        modal: action.response,
      };
    }

    default:
      return state;
  }
}
