const INITIAL_STATE = {
  notebookList: [],
  selectedNotebook: null,
  selectedNotebookContent: "",
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

    case "deleteNotebook":
      let tmpSelectedNotebook = state.selectedNotebook;
      let tmpSelectedNotebookContent = state.selectedNotebookContent;
      if(state.selectedNotebook === action.payload){
        tmpSelectedNotebook = null;
        tmpSelectedNotebookContent = null;
      }
      return {
        ...state,
        notebookList: state.notebookList.filter((name) => name !== action.payload),
        selectedNotebook: tmpSelectedNotebook,
        selectedNotebookContent: tmpSelectedNotebookContent,
      };
      
    case "":
    default:
      return state;
  }
};
