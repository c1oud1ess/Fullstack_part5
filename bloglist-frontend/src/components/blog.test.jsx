import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog test', () => {

  beforeEach(() => {

    render(<Blog
      blog={{
        author: "heymin",
        id: "67a3e173f94920420655b296",
        likes: 6,
        title: "test1",
        url: "http://abcsss",
        user: { username: 'sb1', name: 'jack green', id: '67a3db83baf87d1c545edf90' },
      }}
      user={{
        id: "67a3db71baf87d1c545edf8e",
        name: "mike lee",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNiMiIsImlkIjoiNjdhM2RiNzFiYWY4N2QxYzU0NWVkZjhlIiwiaWF0IjoxNzM5MjgzODQ3LCJleHAiOjE3MzkyODc0NDd9.k08L_GAuEhf-IYZBEmshBmRWWn5xJ0E2fcn5fQoht7M",
        username: "sb2"
      }}
    />)
  })

  test('checks that the component displaying a blog renders the blog\'s title and author, but does not render its URL or number of likes by default', () => {
    
    const title = screen.getByText(/test1/)
    expect(title).toBeDefined()

    const author = screen.queryByText('heymin')
    expect(author).toBeDefined()

    const url = screen.queryByText('http://abcsss')
    expect(url).toBeNull()

    const likes = screen.queryByText('6')
    expect(likes).toBeNull()

    const username = screen.queryByText('sb2')
    expect(username).toBeNull()
  })

  test('checks that the blog\'s URL and number of likes are shown when the button controlling the shown details has been clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const title = screen.getByText(/test1/)
    expect(title).toBeDefined()

    const author = screen.queryByText('heymin')
    expect(author).toBeDefined()

    const url = screen.queryByText('http://abcsss')
    expect(url).toBeDefined()

    const likes = screen.queryByText('6')
    expect(likes).toBeDefined()

    const username = screen.queryByText('sb2')
    expect(username).toBeDefined()
  })

})
