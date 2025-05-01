import React from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import toast from 'react-hot-toast';

function Signup() {
  const { 
      register, 
      handleSubmit, 
      formState: { errors } 
    } = useForm();
  
    const onSubmit = async data => {//console.log(data);
      const userinfo={
        fullname:data.fullname,
        email:data.email,
        password:data.password,
      }
      await axios.post("http://localhost:4001/user/signup", userinfo)
      .then((res)=>{
        console.log(res.data)
        if(res.data){
          // alert("signup Successfully")
          toast.success('signup Successfully');
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user))
      }).catch((err) =>{
        if(err.response){
          console.log(err)
        // alert("Error: " + err.response.data.message)
        toast.success("Error: " + err.response.data.message);
        }
      })
    }

  return (
   <><div className='flex h-screen items-center mt-4 px5 justify-center'>
     <div className="w-[600px] ">
  <div className="modal-box">
    <form onSubmit={handleSubmit(onSubmit)} method="dialog">
      <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-white">✕</Link>
    

    <h3 className="font-bold text-lg">Signup</h3>
    {/* name */}
    <div className='mt-4 space-y-2 '>
      <span>Name</span><br />
      <input type="text"  
      placeholder='Enter your fullname' 
      className='w-80 px-3 py-1 border rounded-md outline-none'
      {...register("fullname", { required: true })}/>
    </div>
    {errors.fullname && <span>This field is required</span>}
    {/* email */}
    <div className='mt-4 space-y-2'>
      <span>Email</span><br />
      <input type="email"  
      placeholder='Enter your email' 
      className='w-80 px-3 py-1 border rounded-md outline-none'
      {...register("email", { required: true })}/>
    </div>
    {errors.email && <span>This field is required</span>}
    {/* password */}
    <div className='mt-4 space-y-2'>
      <span>Password</span><br />
      <input type="text"  
      placeholder='Enter your password' 
      className='w-80 px-3 py-1 border rounded-md outline-none'
      {...register("password", { required: true })}/>
    </div>
    {errors.password && <span>This field is required</span>}
    {/* Btton */}
    <div className='flex justify-around mt-4'>
      <button className='bg-pink-500 text-white rounded-md  px-3 py-1 hover:bg-pink-200'>Signup</button>
      <p className='text-xl'>Have account?{""} 
        <button 
        className='under-line text-blue-500 cursor-pointer'
        onClick={() =>
        document.getElementById("my_modal_3").showModal()
      }
      >Login
      </button>{""}
      <Login/>
      </p>  
    </div>
    </form>
  </div>
</div>
    </div></>
  )
}

export default Signup
