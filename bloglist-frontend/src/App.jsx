import { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/loginForm'
import AddBlog from './components/AddBlog'
import TopNotice from './components/TopNotice'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ text: '', success: null })

  const togglableRef = useRef()

  const userLogin = (userObject) => {
    loginService
      .login(userObject)
      .then(returnedUser => {
        console.log(returnedUser)
        setUser(returnedUser)
        window.localStorage.setItem(
          'loggedBloglistUser', JSON.stringify(returnedUser)
        )
        blogService.setToken(returnedUser.token)
        setMessage({ text: `Welcome ${returnedUser.name}`, success: true })
        setTimeout(() => {
          setMessage({ text: '', success: null })
        }, 2000)
        console.log('Welcome')
      })
      .catch(error => {
        setMessage({ text: 'wrong credentials', success: false })
        setTimeout(() => {
          setMessage({ text: '', success: null })
        }, 2000)
        console.log('wrong credentials')
      })
  }

  const addBlog = (newblog) => {
    // blogFormRef.current.togglableHandle()

    blogService
      .createNew(newblog)
      .then(returnedBlog => {
        const concatedBlogs = blogs.concat(returnedBlog)
        setBlogs([...concatedBlogs].sort((a, b) => b.likes - a.likes))
        togglableRef.current.toggleVisibility()
        const a = `New blog "${returnedBlog.title}" by ${returnedBlog.author} added`
        setMessage({ text: a, success: true })
        console.log(a)
        setTimeout(() => {
          setMessage({ text: '', success: null })
        }, 2000)
      })
      .catch(error => {
        console.log(error)
        setMessage({ text: 'Fail to add new blog', success: false })
        setTimeout(() => {
          setMessage({ text: '', success: null })
        }, 2000)
      })
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      setMessage({ text: `Goodbye ${user.name}`, success: true })
      setTimeout(() => {
        setMessage({ text: '', success: null })
      }, 2000)
      window.localStorage.clear()
      blogService.setToken(null)
      setUser(null)
    } catch (exception) {
      console.log(exception)
      setMessage({ text: 'Fail to logout', success: false })
      setTimeout(() => {
        setMessage({ text: '', success: null })
      }, 2000)
    }

  }

  useEffect(() => {
    blogService
      .getBlogs()
      .then(blogs =>
        setBlogs([...blogs].sort((a, b) => b.likes - a.likes))
      )
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <TopNotice message={message} />
        <LoginForm userLogin={userLogin}/>
      </div>
    )
  }else return (
    <div>
      <h2>blogs</h2>
      <TopNotice message={message} />
      <h4>
        {user.name} logged in
        <button  onClick={handleLogout}>
          logout
        </button>
      </h4>
      <Togglable buttonLabel="new note" ref={togglableRef}>
        <h2>
          create new
        </h2>
        <AddBlog addBlog={addBlog}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          blogs={blogs}
          setMessage={setMessage}
          setBlogs={setBlogs}
        />
      )}
    </div>
  )
}

export default App