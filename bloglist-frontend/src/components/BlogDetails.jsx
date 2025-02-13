import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

export const BlogDetails = ({ blog, blogs, setBlogs, user, setMessage, addLike, setDetailsShown }) => {

  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    setShowDelete(user.id === blog.user.id)
  }, [user.id,blog.user.id])

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService
        .removeBlog(blog.id)
        .then(() => {
          setBlogs(blogs.filter(item => item.id !== blog.id))
          setMessage({ text: 'remove blog successfully', success: true })
          setTimeout(() => {
            setMessage({ text: '', success: null })
          }, 2000)
        })
        .catch(error => {
          setMessage({ text: 'fail to remove blog', success: false })
          setTimeout(() => {
            setMessage({ text: '', success: null })
          }, 2000)
        })

    }
  }

  return (
    <div>
      <ul>
        <li>
          {blog.title} {blog.author}
          <button onClick={() => setDetailsShown(false)}>
              hide
          </button>
        </li>
        <li>
          <a href={blog.url}> {blog.url} </a>
        </li>
        <li>
          <a> Likes {blog.likes}</a>
          <button 
            id='like-button'
            onClick={() => addLike()}>
            like
          </button>
        </li>
        <li>{blog.user.name}</li>
        <button
          style={{ display: showDelete ? '' : 'none' }}
          className='deleteButton'
          type='button'
          onClick={() => removeBlog()}
        >
          remove
        </button>
      </ul>
    </div >
  )

}

export default BlogDetails