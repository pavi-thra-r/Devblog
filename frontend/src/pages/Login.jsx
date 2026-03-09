import { useState } from "react"
import { useNavigate,Link } from "react-router-dom"

export default function Login(){

 const navigate = useNavigate()

 const [email,setEmail]=useState("")
 const [password,setPassword]=useState("")

 const login = async()=>{

  const res = await fetch("http://localhost:5000/api/auth/login",{
   method:"POST",
   headers:{
    "Content-Type":"application/json"
   },
   body:JSON.stringify({
    email,
    password
   })
  })

  const data = await res.json()

  if(res.ok){

   localStorage.setItem("token",data.token)

   // store correct username
   localStorage.setItem("userName",data.name)

   localStorage.setItem("userEmail",data.email)

   navigate("/")

  }else{

   alert("Login failed")

  }

 }

 return(

 <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">

 <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">

 <div className="text-center mb-8">
  <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
   Welcome Back
  </h2>
  <p className="text-gray-600">Login to continue to DevBlog</p>
 </div>

 <input
  className="border-2 border-gray-200 w-full p-4 mb-5 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
  placeholder="Email"
  value={email}
  onChange={(e)=>setEmail(e.target.value)}
 />

 <input
  type="password"
  className="border-2 border-gray-200 w-full p-4 mb-6 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
  placeholder="Password"
  value={password}
  onChange={(e)=>setPassword(e.target.value)}
 />

 <button
  onClick={login}
  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-full py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
 >
  Login
 </button>

 <p className="text-center text-sm mt-6 text-gray-600">
  Don't have an account?
  <Link to="/register" className="text-blue-600 ml-1 font-semibold hover:underline">Register</Link>
 </p>

 </div>

 </div>

 )

}