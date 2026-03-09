const express = require("express")
const router = express.Router()
const Post = require("../models/Post")

// CREATE POST
router.post("/create", async(req,res)=>{
 try{

  const post = new Post(req.body)
  await post.save()

  res.json(post)

 }catch(err){
  res.status(500).json(err)
 }
})


// GET ALL POSTS
router.get("/all", async(req,res)=>{
 try{

  const posts = await Post.find().sort({createdAt:-1})
  res.json(posts)

 }catch(err){
  res.status(500).json(err)
 }
})


// GET SINGLE POST
router.get("/:id", async(req,res)=>{
 try{

  const post = await Post.findById(req.params.id)
  res.json(post)

 }catch(err){
  res.status(500).json(err)
 }
})


// DELETE POST
router.delete("/delete/:id", async(req,res)=>{
 try{

  await Post.findByIdAndDelete(req.params.id)
  res.json({message:"Post deleted"})

 }catch(err){
  res.status(500).json(err)
 }
})


// LIKE POST (only once per user)
router.put("/like/:id", async(req,res)=>{

 try{

  const {user} = req.body

  const post = await Post.findById(req.params.id)

  if(post.likes.includes(user)){
   return res.json(post)
  }

  post.likes.push(user)

  await post.save()

  res.json(post)

 }catch(err){
  res.status(500).json(err)
 }

})


// ADD COMMENT
router.put("/comment/:id", async(req,res)=>{

 try{

  const {user,text} = req.body

  const post = await Post.findById(req.params.id)

  post.comments.push({
   user,
   text
  })

  await post.save()

  res.json(post)

 }catch(err){
  res.status(500).json(err)
 }

})
router.get("/reset-comments", async (req,res)=>{

 const Post = require("../models/Post")

 await Post.updateMany({},{$set:{comments:[]}})

 res.json({message:"All comments deleted"})

})
module.exports = router