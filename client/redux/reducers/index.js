const INITIAL_STATE = {
  notebookList: [],
  selectedNotebook: null,
  selectedNotebookContent: null,
  isLoading: false,
  message: null,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "setLoading":
      return { ...state, isLoading: action.payload, message: "" };

    case "raiseMessage":
      return { ...state, message: action.payload, isLoading: false };

    case "changeSelectedNotebook":
      return { ...state, selectedNotebook: action.payload };

    case "changeNotebookContent":
      return { ...state, selectedNotebookContent: action.payload };

    case "getNotebooks":
      return { ...state, notebookList: action.payload };

    
    default:
      return state;
  }
};
