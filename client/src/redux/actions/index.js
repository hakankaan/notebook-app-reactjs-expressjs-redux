import axios from "axios";

const HOST_URL = "http://localhost:3001/";

export const createNotebook = (name, setName, setIsCreating) => (dispatch) => {
  dispatch({ type: "setLoading", payload: true });
  const POST_URL = `${HOST_URL}create`;
  axios
    .post(POST_URL, {
      name: name,
    })
    .then((res) => {
      setIsCreating("yeni");
    })
    .catch((err) => {
      let message;
      switch (err.response.status) {
        case 409:
          message = "Bu isimde bir not defteri mevcut!";
          break;

        case 403:
          message = "Dosya oluşturulurken sorun yaşandı.";
          break;

        default:
          break;
      }
      dispatch({ type: "raiseMessage", payload: message });
    });
};

export const getNotebooks = () => (dispatch) => {
  console.log(HOST_URL);
  dispatch({ type: "setLoading", payload: true });
  const GET_URL = HOST_URL;
  axios
    .get(GET_URL)
    .then((res) => {
      dispatch({ type: "setLoading", payload: false });
      dispatch({ type: "getNotebooks", payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: "raiseMessage",
        payload: "Liste alınırken hata yaşandı.",
      });
    });
};

export const getSelectedNotebookContent = (name) => (dispatch) => {
  if (name) {
    dispatch({ type: "setLoading", payload: true });
    const POST_URL = `${HOST_URL}getcontent`;
    axios
      .post(POST_URL, {
        name: name,
      })
      .then((res) => {
        dispatch({ type: "setLoading", payload: false });
        dispatch({ type: "changeNotebookContent", payload: res.data.content });
      })
      .catch((err) => {
        let message = "İçerik alınırken hata yaşandı.";
        if (err.response.status === 204) message = "İçerik bulunamadı.";
        dispatch({ type: "raiseMessage", payload: message });
      });
  }
};

export const saveSelectedNotebookContent = (name, content) => (dispatch) => {
  dispatch({ type: "setLoading", payload: true });
  const POST_URL = `${HOST_URL}edit`;
  axios
    .post(POST_URL, {
      name: name,
      content: content,
    })
    .then((res) => {
      dispatch({ type: "changeNotebookContent", payload: content });
    })
    .catch((err) => {
      let message = "İçerik alınırken hata yaşandı.";
      if (err.response.status === 204) message = "İçerik bulunamadı.";
      dispatch({ type: "raiseMessage", payload: message });
    });
};

export const deleteNotebook = (name) => (dispatch) => {
  console.log(name);
  dispatch({ type: "setLoading", payload: true });
  const POST_URL = `${HOST_URL}delete`;
  axios
    .post(POST_URL, {
      name: name,
    })
    .then((res) => {
      dispatch({ type: "setLoading", payload: false });
      dispatch({ type: "deleteNotebook", payload: name });
    })
    .catch((err) => {
      let message = "İçerik alınırken hata yaşandı.";
      if (err.response.status === 204) message = "İçerik bulunamadı.";
      dispatch({ type: "raiseMessage", payload: message });
    });
};

export const changeSelectedNotebook = (name) => (dispatch) => {
  dispatch({ type: "changeSelectedNotebook", payload: name });
};
