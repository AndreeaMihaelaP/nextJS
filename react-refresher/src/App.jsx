import { useState } from "react";

import PostList from "./components/PostsList";
import MainHeader from "./components/MainHeader";

import "./App.css";

function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function showModalHandler() {
    setModalIsVisible(true);
  }
  function hideModalHandler() {
    setModalIsVisible(false);
  }
  return (
    <>
      <MainHeader onCreatePost={showModalHandler} />
      <main>
        <PostList isPosting={modalIsVisible} onClosePost={hideModalHandler} />
      </main>
    </>
  );
}

export default App;
