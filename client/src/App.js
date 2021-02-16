import { useEffect, useState } from "react";
import "./App.css";
import { connect } from "react-redux";
import {
  getNotebooks,
  getSelectedNotebookContent,
  createNotebook,
} from "./redux/actions";

function App(props) {
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    props.getNotebooks();
  }, []);

  useEffect(() => {
    console.log(props.notebookList);
  }, [props.notebookList]);

  useEffect(() => {
    props.getSelectedNotebookContent(props.selectedNotebook);
  }, [props.selectedNotebook]);

  useEffect(() => {
    if (isCreating === "yeni") {
      props.getNotebooks();
      setIsCreating(false);
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
                    >
                      {name}
                      <div className="closeHolder" >X</div>
                    </div>
                  );
                })}
              </div>
              {isCreating ? (
                <div className="newNotebook">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
              ) : (
                <div className="newNotebook">
                  <button className="btn" onClick={() => setIsCreating(true)}>
                    New Notebook
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="content">
            {props.selectedNotebook && (
              <textarea value={props.selectedNotebookContent} />
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
  getSelectedNotebookContent,
  createNotebook,
})(App);
