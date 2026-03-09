import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function Register(){

 const navigate = useNavigate()

 const [name,setName]=useState("")
 const [email,setEmail]=useState("")
 const [password,setPassword]=useState("")
 const [loading,setLoading]=useState(false)
 const [error,setError]=useState("")

 const register = async () => {

  setError("")

  if(!name || !email || !password){
   setError("Fill all fields")
   return
  }

  try{

   setLoading(true)

   const res = await fetch("http://localhost:5000/api/auth/register",{
    method:"POST",
    headers:{
     "Content-Type":"application/json"
    },
    body:JSON.stringify({name,email,password})
   })

   const data = await res.json()

   setLoading(false)

   if(res.ok){

    alert("Account created. Please login.")
    navigate("/login")

   }else{

    setError(data.message || "Registration failed")

   }

  }catch(err){

   setLoading(false)
   setError("Server error. Is backend running?")

  }

 }

 return(

  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">

   <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md border border-gray-100">

    <div className="text-center mb-8">
     <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
      Join DevBlog
     </h2>
     <p className="text-gray-600">Create your account to get started</p>
    </div>

    {error && (
     <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-5 rounded-lg">
      <p className="text-sm font-medium">{error}</p>
     </div>
    )}

    <input
    className="border-2 border-gray-200 w-full p-4 rounded-xl mb-5 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
    placeholder="Full Name"
    value={name}
    onChange={(e)=>setName(e.target.value)}
    />

    <input
    className="border-2 border-gray-200 w-full p-4 rounded-xl mb-5 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
    placeholder="Email"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    />

    <input
    type="password"
    className="border-2 border-gray-200 w-full p-4 rounded-xl mb-6 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
    placeholder="Password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    />

    <button
    onClick={register}
    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
    disabled={loading}
    >

     {loading ? "Creating Account..." : "Create Account"}

    </button>

    <p className="text-center text-sm mt-6 text-gray-600">
     Already have an account?
     <Link to="/login" className="text-blue-600 ml-1 font-semibold hover:underline">
      Login
     </Link>
    </p>

   </div>

  </div>

 )
}