import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlog from './AddBlog'

test('check, that the form calls the event handler it received as props with the right details when a new blog is created', async () => {
    let mockaddBlog
    mockaddBlog = vi.fn()

    const { container } = render(<AddBlog
        addBlog={mockaddBlog}
    />)
    
    const url_input = container.querySelector('#url-input')
    const author_input = container.querySelector('#author-input')
    const title_input = container.querySelector('#title-input')

    const user = userEvent.setup()
    const button = screen.getByText('create')

    await user.type(url_input, 'http')
    await user.type(author_input, 'mike')
    await user.type(title_input, 'test')
    await user.click(button)

    expect(mockaddBlog).toHaveBeenCalledTimes(1)
    expect(mockaddBlog).toHaveBeenCalledWith({
        title: 'test',
        author: 'mike',
        url: 'http'
    })


})