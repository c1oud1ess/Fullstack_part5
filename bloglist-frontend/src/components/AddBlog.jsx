import { useState } from 'react'

export const AddBlog = ({ addBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const resetInputFields = () => {
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  const saveBlog = (event) => {
    event.preventDefault()

    addBlog({
      title: title,
      author: author,
      url: url
    })

    resetInputFields()
  }

  return (
    <div>
      <form>
        <div>
          title:
          <input
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id='title-input'
          />
        </div>

        <div>
          author:
          <input
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id='author-input'
          />
        </div>

        <div>
        url:
          <input
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id='url-input'
          />
        </div>


        <button
          id='create-blog'
          onClick={saveBlog}
        >
          create
        </button>
      </form>
    </div>
  )
}

export default AddBlog