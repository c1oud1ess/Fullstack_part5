const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1, id: 1 });

    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response, next) => {
  try{
    const body = request.body
    const likes = body.likes === undefined
      ? 0
      : body.likes
    if (!body.title || !body.url) {
      response.status(400).json({
        error: 'Bad Request',
        message: 'Missing required fields: title and url are required.',
      });
    }else{
      const user = request.user
      console.log(user)
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: likes,
        user: user._id
      })

      const result = await blog.save()
      await result.populate('user', { username: 1, name: 1 })
      user.blogs = user.blogs.concat(result._id)
      await user.save()

      response.status(201).json(result)
    }
  } catch (error) {
    next(error) 
  }
})

blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response, next) => {
  try{
    const user = request.user
    const blogToBeDelete = await Blog.findById(request.params.id)
    console.log(blogToBeDelete)
    if(blogToBeDelete.user.toString() === user.id){
      const result = await blogToBeDelete.deleteOne()
      return response.status(204).json(result)
    }else{
      return response.status(401).json({ error: 'user permission invalid' })
    }
  } catch (error) {
    next(error)  
  }
})

blogsRouter.put('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response, next) => {
  try{
    const body = request.body
    const newBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: body.user.id
    }
    const result = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true, runValidators: true })
    await result.populate('user', { username: 1, name: 1 })
    response.status(200).json(result)
  } catch (error) {
    next(error)  
  }
})

module.exports = blogsRouter