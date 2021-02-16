import { useEffect, useState } from "react";
import "./App.css";
import { connect } from "react-redux";
import {
  getNotebooks,
  changeSelectedNotebook,
  getSelectedNotebookContent,
  createNotebook,
  deleteNotebook,
  saveSelectedNotebookContent,
} from "./redux/actions";

function App(props) {
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    props.getNotebooks();
  }, []);

  useEffect(() => {
    props.getSelectedNotebookContent(props.selectedNotebook);
  }, [props.selectedNotebook]);

  useEffect(() => {
    if (isCreating === "yeni") {
      props.getNotebooks();
      props.changeSelectedNotebook(name);
      setIsCreating(false);
      setName("");
    }
  }, [isCreating]);

  return (
    <div className="container">
      <div className="row">
        <h1>Serverside Notebooks</h1>
        <div className="col">
          <div className="leftBar">
            <div className="row no-padding align-items-center justify-content-space-between">
              <div className="list">
                {props.notebookList.map((name, index) => {
                  return (
                    <div
                      key={index} // id olmadığı için
                      className={
                        props.selectedNotebook === name
                          ? "listItem active"
                          : "listItem"
                      }
                      onClick={() => props.changeSelectedNotebook(name)}
                    >
                      {name}
                      <div
                        className="closeHolder"
                        onClick={() => props.deleteNotebook(name)}
                      >
                        X
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="newNotebook">
                <input
                  id="createName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name..."
                />
                <button
                  className="btn"
                  onClick={() => {
                    props.createNotebook(name, setName, setIsCreating);
                  }}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
          <div className="content">
            {props.selectedNotebook && (
              <textarea
                id={props.selectedNotebook + "textarea"}
                value={props.selectedNotebookContent}
                onChange={(e) => {
                  props.saveSelectedNotebookContent(
                    props.selectedNotebook,
                    e.target.value
                  );
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  getNotebooks,
  changeSelectedNotebook,
  getSelectedNotebookContent,
  createNotebook,
  deleteNotebook,
  saveSelectedNotebookContent,
})(App);
