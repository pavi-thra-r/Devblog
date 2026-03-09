import { useState } from "react"

export default function BlogEditor({fetchPosts}){

 const [title,setTitle] = useState("")
 const [content,setContent] = useState("")
 const [image,setImage] = useState("")

 const createPost = async()=>{

  if(!title || !content){
   alert("Please fill in title and content")
   return
  }

  const author = localStorage.getItem("userName")

  try{
   const res = await fetch("http://localhost:5000/api/posts/create",{
    method:"POST",
    headers:{
     "Content-Type":"application/json"
    },
    body:JSON.stringify({
     title,
     content,
     image: image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
     author
    })
   })

   if(res.ok){
    setTitle("")
    setContent("")
    setImage("")
    fetchPosts()
   }else{
    alert("Failed to create post")
   }
  }catch(err){
   alert("Error creating post. Is the backend running?")
  }

 }

 return(

 <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl mb-12 border border-blue-100">

  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
   ✨ Create New Post
  </h2>

  <input
   className="border-2 border-gray-200 w-full p-4 mb-5 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
   placeholder="Enter an engaging title..."
   value={title}
   onChange={(e)=>setTitle(e.target.value)}
  />

  <input
   className="border-2 border-gray-200 w-full p-4 mb-5 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
   placeholder="Image URL (optional)"
   value={image}
   onChange={(e)=>setImage(e.target.value)}
  />

  <textarea
   className="border-2 border-gray-200 w-full p-4 mb-5 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all resize-none"
   rows="6"
   placeholder="Share your thoughts..."
   value={content}
   onChange={(e)=>setContent(e.target.value)}
  />

  <button
   onClick={createPost}
   className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
  >
   📝 Publish Post
  </button>

 </div>

 )
}