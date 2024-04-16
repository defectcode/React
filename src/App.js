import React, { useState, useMemo }  from "react";
import './style/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";

function App() {

  const [posts, setPosts] = useState([
    {id: 1, title: 'JavaScript', body: 'dsad'},
    {id: 2, title: 'das 2', body: 'Descriptdasdion'},
    {id: 3, title: 'dasdas 3', body: 'dasdas'},
    {id: 4, title: 'dasdas 4', body: 'dasd'},
  ])

  const [selectedSort, setSelectedSort] = useState('')
  const [searchQuery, setSearchQuery] = useState('')


  const sortedPosts = useMemo(() => {
    if(selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
    }
    return posts;
  }, [selectedSort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.includes(searchQuery))
  }, [searchQuery, sortedPosts])


  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort);
  }


  return (
    <div className="App">
      <PostForm create={createPost}/>

      <hr style={{margin: '15px 0'}}/>
      <div>
        <MyInput
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search..."

        />

        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Assortment"
          options={[
            {value: 'title', name: 'By name'},
            {value: 'body', name: 'By description'},
          ]}
        />
      </div>

      {posts.length !== 0
        ? <PostList remove={removePost} posts={sortedAndSearchedPosts} title="List one for post"/>
        : 
        <h1 style={{textAlign: 'center'}}>
          Posts is not exists
        </h1>
      }
      
    </div>
  );
}

export default App;
