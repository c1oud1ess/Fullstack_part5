import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ userLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await userLogin({
        username: username,
        password: password
      })
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button 
        id="login"
        type="submit"
      >
        login
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  userLogin: PropTypes.func.isRequired,
}

export default LoginForm