import { useState } from 'react'
import BlogDetails from './BlogDetails'
import blogService from '../services/blogs'

const Blog = ({ blog, setMessage, setBlogs, user, blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detailsShown, setDetailsShown] = useState(false)

  const addLike = () => {
    console.log("addLike called");
    const updateblog = { ...blog, likes: blog.likes + 1 }
    blogService
      .updateBlog(blog.id, updateblog)
      .then(returnedBlog => {
        const updatedBlogs = blogs.map(item => (item.id === returnedBlog.id ? returnedBlog : item))
        setBlogs([...updatedBlogs].sort((a, b) => b.likes - a.likes))
        setMessage({ text: 'like blog successfully', success: true })
        setTimeout(() => {
          setMessage({ text: '', success: null })
        }, 2000)
      })
      .catch(error => {
        setMessage({ text: 'fail to like blog', success: false })
        setTimeout(() => {
          setMessage({ text: '', success: null })
        }, 2000)
      })
  }


  return (
    <div style={blogStyle}>
      {detailsShown ? (
        <BlogDetails
          blog={blog}
          blogs={blogs}
          user={user}
          setMessage={setMessage}
          setDetailsShown={setDetailsShown}
          setBlogs={setBlogs}
          addLike={addLike}
        />
      ) : (
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setDetailsShown(true)}>
            view
          </button>
        </div>
      )}
    </div>)
  }

export default Blog