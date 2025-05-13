import { useEffect, useState } from "react";

import Post from "./Post";
import NewPost from "./NewPost";
import Modal from "./Modal";

import classes from "./PostsList.module.css";

function PostsList({ isPosting, onClosePost }) {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      const response = await fetch("http://localhost:8080/posts");
      const resData = await response.json();
      setPosts(resData.posts);
      setIsFetching(false);
    }
    fetchPosts();
  }, []);

  function addPostHandler(postData) {
    fetch("http://localhost:8080/posts", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setPosts((prevPosts) => [postData, ...prevPosts]);
  }
  return (
    <>
      {!isFetching && isPosting ? (
        <Modal onClose={onClosePost}>
          <NewPost onCancel={onClosePost} onAddPost={addPostHandler} />
        </Modal>
      ) : null}

      {!isFetching && posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.body} author={post.author} body={post.body} />
          ))}
        </ul>
      )}

      {!isFetching && posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no posts.</h2>
          <p>Start adding some!</p>
        </div>
      )}
      {isFetching && (
        <p style={{ textAlign: "center", color: "white" }}>Loading posts...</p>
      )}
    </>
  );
}

export default PostsList;
