import { useParams, Link } from "react-router-dom"
import { useEffect,useState } from "react"

export default function BlogPage(){

 const {id} = useParams()

 const [blog,setBlog] = useState(null)
 const [comment,setComment] = useState("")

 const user = localStorage.getItem("userName") || "Anonymous"

 const fetchBlog = async()=>{

  try{
   const res = await fetch(`http://localhost:5000/api/posts/${id}`)
   if(res.ok){
    const data = await res.json()
    setBlog(data)
   }
  }catch(err){
   console.error("Error fetching blog:", err)
  }

 }

 useEffect(()=>{
  fetchBlog()
 },[])



 // LIKE FUNCTION
 const likePost = async()=>{

  const userName = localStorage.getItem("userName")
  
  if(!userName){
   alert("Please login to like posts")
   return
  }

  try{
   await fetch(`http://localhost:5000/api/posts/like/${id}`,{
    method:"PUT",
    headers:{
     "Content-Type":"application/json"
    },
    body:JSON.stringify({user: userName})
   })

   fetchBlog()
  }catch(err){
   console.error("Error liking post:", err)
  }

 }



 // COMMENT FUNCTION
 const addComment = async()=>{

  if(!comment.trim()) return

  const userName = localStorage.getItem("userName")
  
  if(!userName){
   alert("Please login to comment")
   return
  }

  try{
   const res = await fetch(`http://localhost:5000/api/posts/comment/${id}`,{
    method:"PUT",
    headers:{
     "Content-Type":"application/json"
    },
    body:JSON.stringify({
      user: userName,
      text:comment
     })
   })

   if(res.ok){
    setComment("")
    fetchBlog()
   }
  }catch(err){
   console.error("Error adding comment:", err)
  }

 }



 if(!blog) return <div className="text-center mt-20">Loading...</div>


 return(

 <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">

 {/* NAVBAR */}
 <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
  <div className="max-w-7xl mx-auto px-6 py-4">
   <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform inline-block">
    ← DevBlog
   </Link>
  </div>
 </nav>

 <div className="max-w-4xl mx-auto px-6 py-12">

 {/* BLOG IMAGE */}

 {blog.image && (
  <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8">
   <img
    src={blog.image}
    alt={blog.title}
    className="w-full h-96 object-cover"
    onError={(e) => {
     e.target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop"
    }}
   />
   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
  </div>
 )}


 {/* TITLE */}

 <h1 className="text-5xl font-extrabold mb-6 leading-tight text-gray-900">
  {blog.title}
 </h1>


 {/* AUTHOR & LIKE */}

 <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-gray-200">

  <div className="flex items-center gap-4">
   <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
    {blog.author.charAt(0).toUpperCase()}
   </div>
   <div>
    <p className="text-gray-900 font-bold text-lg">{blog.author}</p>
    <p className="text-gray-500 text-sm">Published recently</p>
   </div>
  </div>

  <button
   onClick={likePost}
   className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
  >
   ❤️ {blog.likes.length}
  </button>

 </div>


 {/* CONTENT */}

 <div className="bg-white rounded-2xl p-10 shadow-lg mb-12 border border-gray-100">
  <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap">
   {blog.content}
  </p>
 </div>



 {/* COMMENTS SECTION */}

 <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">

  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
   💬 Comments
   <span className="text-lg font-normal text-gray-500">({blog.comments.length})</span>
  </h2>


  {/* COMMENT INPUT */}

  <div className="mb-8 bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-blue-100">

   <textarea
    className="border-2 border-gray-200 w-full p-4 rounded-xl mb-4 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all resize-none"
    rows="3"
    placeholder="Share your thoughts..."
    value={comment}
    onChange={(e)=>setComment(e.target.value)}
   />

   <button
    onClick={addComment}
    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
   >
    Post Comment
   </button>

  </div>


  {/* COMMENT LIST */}

  <div className="space-y-4">

  {blog.comments.length === 0 && (
   <p className="text-center text-gray-500 py-8">No comments yet. Be the first to comment!</p>
  )}

  {blog.comments.map((c,i)=>(

   <div
    key={i}
    className="flex gap-4 bg-gray-50 p-5 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200"
   >

    {/* PROFILE ICON */}

    <div className="w-11 h-11 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
     {(c.user && c.user.charAt(0).toUpperCase()) || "?"}
    </div>

    {/* COMMENT BODY */}

    <div className="flex-1">

     <div className="flex items-center gap-3 mb-2">

      <span className="font-bold text-gray-900">
       {c.user || "Anonymous"}
      </span>

      <span className="text-xs text-gray-400">
       • just now
      </span>

     </div>

     <p className="text-gray-700 leading-relaxed">
      {c.text}
     </p>

    </div>

   </div>

  ))}

  </div>

 </div>


 </div>

 </div>

 )

}