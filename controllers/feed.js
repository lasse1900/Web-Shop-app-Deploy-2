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
    .catch(err => console.log(err))
}