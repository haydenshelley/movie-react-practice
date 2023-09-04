import axios from "axios";
import { useState, useEffect } from "react";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { LogoutLink } from "./LogoutLink";
import { PostsIndex } from "./PostsIndex";

export function Content() {
  const [posts, setPosts] = useState([]);

  const handleIndexPosts = () => {
    axios
      .get("http://localhost:3000/posts.json")
      .then((response) => setPosts(response.data));
  };

  useEffect(handleIndexPosts, []);

  return (
    <div>
      <h1>Another Blog App</h1>
      <Login />
      <LogoutLink />
      <PostsIndex posts={posts} />
      <Signup />
    </div>
  );
}
