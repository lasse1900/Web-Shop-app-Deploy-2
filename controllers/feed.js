const express = require('express')
const { validationResult } = require('express-validator')

const Post = require('../models/post')

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: '23232323',
        title: 'First post',
        content: 'This is the first post',
        imageUrl: 'images/duck.jpg',
        creator: {
          name: 'Lasse'
        },
        createdAt: new Date()
      }]
  })
}

exports.createPost = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.')
    error.statusCode = 422
    throw error
  }
  const title = req.body.title
  const content = req.body.content
  console.log(title, content)
  const post = new Post({
    title: title,
    content: content,
    imageUrl: 'images/duck.jpg',
    creator: { name: 'Lasse' },
  })
  post.save()
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: 'Post created succefully',
        post: result
      })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}