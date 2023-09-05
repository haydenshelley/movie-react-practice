import axios from "axios";
import { useState, useEffect } from "react";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { LogoutLink } from "./LogoutLink";
import { PostsIndex } from "./PostsIndex";
import { PostsNew } from "./PostsNew";
import { Modal } from "./Modal";
import { PostsShow } from "./PostsShow";

export function Content() {
  const [posts, setPosts] = useState([]);
  const [isPostsShowVisible, setIsPostsShowVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  const handleIndexPosts = () => {
    axios
      .get("http://localhost:3000/posts.json")
      .then((response) => setPosts(response.data));
  };

  const handleCreatePost = (params, successCallBack) => {
    axios
      .post("http://localhost:3000/posts.json", params)
      .then(
        (response) => setPosts([...posts, response.data]),
        successCallBack()
      );
  };

  const handleShowPost = (post) => {
    setIsPostsShowVisible(true);
    setCurrentPost(post);
  };

  const handleUpdatePost = (id, params, successCallback) => {
    axios
      .patch(`http://localhost:3000/posts/${id}.json`, params)
      .then((response) => {
        setPosts(
          posts.map((post) => {
            if (post.id === response.data.id) {
              return response.data;
            } else {
              return post;
            }
          })
        );
        successCallback();
        handleClose();
      });
  };

  const handleDestroyPost = (post) => {
    axios
      .delete(`http://localhost:3000/posts/${post.id}.json`)
      .then((response) => {
        setPosts(posts.filter((p) => p.id !== post.id));
        handleClose();
      });
  };

  const handleClose = () => {
    setIsPostsShowVisible(false);
  };

  useEffect(handleIndexPosts, []);

  return (
    <div>
      <h1>Another Blog App</h1>
      <Login />
      <LogoutLink />
      <PostsIndex posts={posts} onShowPost={handleShowPost} />
      <Modal show={isPostsShowVisible} onClose={handleClose}>
        <PostsShow
          post={currentPost}
          onUpdatePost={handleUpdatePost}
          onDestroyPost={handleDestroyPost}
        />
      </Modal>
      <PostsNew onCreatePost={handleCreatePost} />
      <Signup />
    </div>
  );
}
