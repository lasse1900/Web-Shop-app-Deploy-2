const express = require('express')
const { validationResult } = require('express-validator')

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
    return res
      .status(422)
      .json({
        message: 'Validation failed, entered data is incorrect.',
        errors: errors.array()
      })
  }
  const title = req.body.title
  const content = req.body.content
  console.log(title, content)
  // create db
  res.status(201).json({
    message: 'Post created succefully',
    post: {
      _id: new Date().toISOString(),
      title: title,
      content: content,
      creator: { name: 'Lasse' },
      createdAt: new Date()
    }
  })
}