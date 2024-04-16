import React, { useState }  from "react";
import './style/App.css';
import PostItem from "./components/PostItem"
import PostList from "./components/PostList";
import Mybutton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import { useRef } from "react";

function App() {

  const [posts, setPosts] = useState([
    {id: 1, title: 'JavaScdript', body: 'Description'},
    {id: 2, title: 'JavaScdript 2', body: 'Description'},
    {id: 3, title: 'JavaScdript 3', body: 'Description'},
    {id: 4, title: 'JavaScdript 4', body: 'Description'},
  ])

  const [post, setPost] = useState({title: '', body: ''})


  const addNewPost = (e) => {
    e.preventDefault()

    setPosts([...posts, {...post, id: Date.now()}])
    setPost({title: '', body: ''})
  }


  return (
    <div className="App">
      <form>
        <MyInput
          value={post.title} 
          onChange={e => setPost({...post, title: e.target.value})}
          type="text" 
          placeholder="Names posts"
        />
        <MyInput 
          value={post.body} 
          onChange={e => setPost({...post, body: e.target.value})}
          type="text" 
          placeholder="Descriptions posts"
        />
        <Mybutton onClick={addNewPost}>Create Posts</Mybutton>
      </form>
      <PostList posts={posts} title="List one for post"/>
    </div>
  );
}

export default App;
