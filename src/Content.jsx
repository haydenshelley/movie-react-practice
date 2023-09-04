import axios from "axios";
import { useState, useEffect } from "react";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { LogoutLink } from "./LogoutLink";
import { PostsIndex } from "./PostsIndex";
import { PostsNew } from "./PostsNew";

export function Content() {
  const [posts, setPosts] = useState([]);

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

  useEffect(handleIndexPosts, []);

  return (
    <div>
      <h1>Another Blog App</h1>
      <Login />
      <LogoutLink />
      <PostsIndex posts={posts} />
      <PostsNew onCreatePost={handleCreatePost} />
      <Signup />
    </div>
  );
}
