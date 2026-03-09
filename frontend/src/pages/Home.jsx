import { useState,useEffect } from "react"
import { Link } from "react-router-dom"
import BlogEditor from "../components/BlogEditor"

export default function Home(){

 const [posts,setPosts] = useState([])
 const [search,setSearch] = useState("")

 const token = localStorage.getItem("token")
 const userName = localStorage.getItem("userName")

 const fetchPosts = async ()=>{
  try{
   const res = await fetch("http://localhost:5000/api/posts/all")
   if(res.ok){
    const data = await res.json()
    setPosts(data)
   }
  }catch(err){
   console.error("Error fetching posts:", err)
  }
 }

 useEffect(()=>{
  if(token){
   fetchPosts()
  }
 },[token])

 const deletePost = async(id)=>{

  const confirmDelete = window.confirm("Delete this blog?")

  if(!confirmDelete) return

  try{
   const res = await fetch(`http://localhost:5000/api/posts/delete/${id}`,{
    method:"DELETE"
   })

   if(res.ok){
    fetchPosts()
   }else{
    alert("Failed to delete post")
   }
  }catch(err){
   alert("Error deleting post")
  }

 }

 const filteredPosts = posts.filter(post =>
  post.title.toLowerCase().includes(search.toLowerCase())
 )

 return(

 <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">

 {/* NAVBAR */}

 <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
  <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

   <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
    DevBlog
   </h1>

   <div className="flex gap-4 items-center">

    {!token && (
     <>
      <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
       Login
      </Link>
      <Link to="/register" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all">
       Get Started
      </Link>
     </>
    )}

    {token && (
     <div className="flex items-center gap-4">
      <span className="text-gray-700 font-medium">👋 {userName}</span>
      <button
       onClick={()=>{
        localStorage.clear()
        window.location.reload()
       }}
       className="bg-red-500 text-white px-5 py-2.5 rounded-full font-medium hover:bg-red-600 hover:shadow-lg transition-all"
      >
       Logout
      </button>
     </div>
    )}

   </div>

  </div>
 </nav>


 {/* LANDING PAGE */}

 {!token && (

 <>
 <div className="relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 opacity-90"></div>
  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
  
  <div className="relative text-center py-32 px-6 text-white">
   <div className="max-w-4xl mx-auto">
    <h1 className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight animate-fade-in">
     Build Your Blog
    </h1>

    <p className="text-xl md:text-2xl mb-10 text-blue-100 font-light">
     Share ideas, stories and knowledge with the world.
    </p>

    <Link to="/register">
     <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
      Get Started Free →
     </button>
    </Link>
   </div>
  </div>
 </div>


 <div className="max-w-7xl mx-auto py-24 px-6 grid md:grid-cols-3 gap-8">

  <div className="group bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
   <div className="text-5xl mb-5">✍️</div>
   <h3 className="text-2xl font-bold mb-4 text-gray-800">
    Write Blogs
   </h3>
   <p className="text-gray-600 leading-relaxed">
    Easily create blogs and share your ideas with a beautiful editor.
   </p>
  </div>

  <div className="group bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
   <div className="text-5xl mb-5">💬</div>
   <h3 className="text-2xl font-bold mb-4 text-gray-800">
    Engage Readers
   </h3>
   <p className="text-gray-600 leading-relaxed">
    Readers can like and comment on your blogs to start conversations.
   </p>
  </div>

  <div className="group bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
   <div className="text-5xl mb-5">🔍</div>
   <h3 className="text-2xl font-bold mb-4 text-gray-800">
    Discover Content
   </h3>
   <p className="text-gray-600 leading-relaxed">
    Explore articles from different authors and find inspiration.
   </p>
  </div>

 </div>
 </>
 )}


 {/* BLOG DASHBOARD */}

 {token && (

 <div className="max-w-7xl mx-auto px-6 py-12">

 <BlogEditor fetchPosts={fetchPosts}/>

 {/* SEARCH BAR */}

 <div className="relative mb-12">
  <input
   type="text"
   placeholder="🔍 Search blogs..."
   className="border-2 border-gray-200 p-4 w-full rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all shadow-sm"
   value={search}
   onChange={(e)=>setSearch(e.target.value)}
  />
 </div>

 <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
   Latest Articles
  </span>
 </h2>

 {filteredPosts.length === 0 && (
  <div className="text-center py-20">
   <p className="text-gray-500 text-lg mb-4">No articles found</p>
   <p className="text-gray-400">Create your first blog post above!</p>
  </div>
 )}

 <div className="grid md:grid-cols-3 gap-8">

 {filteredPosts.map(post => (

 <Link to={`/blog/${post._id}`} key={post._id}>

  <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">

   <div className="relative overflow-hidden">
    <img
     src={post.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop"}
     alt={post.title}
     className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
     onError={(e) => {
      e.target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop"
     }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
   </div>

   <div className="p-6">

    <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
     {post.title}
    </h3>

    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
     {post.content.substring(0,120)}...
    </p>

    <div className="flex justify-between items-center pt-4 border-t border-gray-100">

     <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
       {post.author.charAt(0).toUpperCase()}
      </div>
      <span className="text-sm text-gray-700 font-medium">
       {post.author}
      </span>
     </div>

     <span className="text-red-500 text-sm font-semibold flex items-center gap-1">
      ❤️ {post.likes?.length || 0}
     </span>

    </div>

    {post.author === userName && (

     <button
      onClick={(e)=>{
       e.preventDefault()
       deletePost(post._id)
      }}
      className="w-full bg-red-500 text-white px-4 py-2 rounded-lg text-sm mt-4 hover:bg-red-600 transition-colors font-medium"
     >
      Delete Post
     </button>

    )}

   </div>

  </div>

 </Link>

 ))}

 </div>

 </div>

 )}

 </div>

 )
}