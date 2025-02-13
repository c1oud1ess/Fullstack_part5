import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getBlogs = async () => {
  // const config = {
  //   headers: { Authorization: token },
  // }
  // console.log(config)
  // const request = axios.get(baseUrl, config)
  const request = axios.get(baseUrl)
  const response = await request
  console.log(response.data)
  return response.data
}

const createNew = async (newblog) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(config)
  const request = axios.post(baseUrl, newblog, config)
  const response = await request
  console.log('response')
  console.log(response.data)
  return response.data
}

const updateBlog = async (id, updateblog) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.put(`${baseUrl}/${id}`, updateblog, config)
  const response = await request
  return response.data
}

const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  const response = await request
  return response.data
}

export default { getBlogs, setToken, createNew, updateBlog, removeBlog }