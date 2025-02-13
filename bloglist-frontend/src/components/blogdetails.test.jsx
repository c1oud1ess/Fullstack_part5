import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogDetails from './BlogDetails'

test('ensures that if the like button is clicked twice, the event handler the component received as props is called twice.', async () => {
    let mockaddLike
    mockaddLike = vi.fn()

    render(<BlogDetails
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
        addLike={mockaddLike}
    />)
    
    const user = userEvent.setup()
    const likebutton = screen.getByText('like')
    await user.click(likebutton)
    await user.click(likebutton)

    expect(mockaddLike).toHaveBeenCalledTimes(2)

})