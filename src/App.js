import React, { useState, useMemo }  from "react";
import './style/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";
import PostFilter from "./components/UI/PostFilter";

function App() {

  const [posts, setPosts] = useState([
    {id: 1, title: 'JavaScript', body: 'Language'},
    {id: 2, title: 'TypeScript', body: 'Framework'},
    {id: 3, title: 'React.Js', body: 'Library'},
    {id: 4, title: 'Node.Js', body: 'Framework'},
  ])

  const [filter, setFilter] = useState({sort: '', query: ''})

  const sortedPosts = useMemo(() => {
    if(filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
    }
    return posts;
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <PostForm create={createPost}/>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Lists for Front-End stack"/>
    </div>
  );
}

export default App;
