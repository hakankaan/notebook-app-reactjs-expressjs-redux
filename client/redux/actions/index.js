import axios from "axios";

const HOST_URL = "http://localhost:3001/";

export const createNotebook = (name) => (dispatch) => {
  dispatch({ type: "setLoading", payload: true });
  const POST_URL = `${HOST_URL}create`;
  axios
    .post(POST_URL, {
      name: name,
    })
    .then((res) => {
      setName("")
      setIsCreating(false)
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
  if(name){
    dispatch({ type: "setLoading", payload: true });
    const POST_URL = `${HOST_URL}getcontent`;
    axios
      .post(POST_URL, {
        name: name,
      })
      .then((res) => {
        dispatch({ type: "setLoading", payload: false });
        dispatch({ type: "changeNotebookContent", payload: res.data });
      })
      .catch((err) => {
        let message = "İçerik alınırken hata yaşandı.";
        if (err.response.status === 204) message = "İçerik bulunamadı.";
        dispatch({ type: "raiseMessage", payload: message });
      });
  }
};
