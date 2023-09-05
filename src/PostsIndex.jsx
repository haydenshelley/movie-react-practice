export function PostsIndex(props) {
  return (
    <div>
      <h2>All Posts</h2>
      {props.posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <img src={post.image}></img>
          <br />
          <button onClick={() => props.onShowPost(post)}>More Info</button>
          <br />
        </div>
      ))}
    </div>
  );
}
