import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const ForgetPassword = () => {
    let emailRef =useRef()

    const [success, setsuccess] = useState(false);
    const handleSubmit = async(e)=>{
        e.preventDefault()
        let obj = {
            email:emailRef.current.value
        }
        let res = await axios.post('https://job-backend-lnzw.onrender.com/users/forgetPassword',obj);
        let data = res.data
        console.log(data)
        if(data.success){
            toast.success(data.msg,{position:"top-center"})
            setsuccess(true)
        }
        else{
            toast.error(data.msg,{position:"top-center"})
        }
    }
  return (
    <div>
      <section className="flex flex-col max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 md:flex-row md:h-48">
  <div className="md:flex md:items-center md:justify-center md:w-1/2 md:bg-gray-700 md:dark:bg-gray-800">
    <div className="px-6 py-6 md:px-8 md:py-0">
      <h2 className="text-lg font-bold text-gray-700 dark:text-white md:text-gray-100">Forget password? </h2>
      {/* <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-gray-400">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur obcaecati odio</p> */}
    </div>
  </div>
  <div className="flex items-center justify-center pb-6 md:py-0 md:w-1/2">
    <form>
      <div className="flex flex-col p-1.5 overflow-hidden border rounded-lg dark:border-gray-600 lg:flex-row dark:focus-within:border-blue-300 focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
        <input ref={emailRef} className="px-6 py-2 text-white  placeholder-gray-500 outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent" type="text" name="email" placeholder="Enter your email" aria-label="Enter your email" />
        <button onClick={handleSubmit} className="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">submit</button>
      </div>
    </form>
   {success && <Link className="bg-sky-700 px-4 py-2 rounded-full" to="/login">Login</Link>}
  </div>
</section>

    </div>
  )
}

export default ForgetPassword
