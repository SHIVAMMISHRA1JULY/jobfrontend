import React, { useState } from 'react'

import { useSelector } from 'react-redux';
import axios from 'axios';
import {toast} from 'react-toastify';
import CompanySidebar from '../../components/CompanySidebar';

const CreateJob = () => {

  let userStore = useSelector((state)=>state.user);
  console.log(userStore.token)
    const [details, setdetails] = useState({
        title:"",
        description:"",
        company:"",
        jobRole:"",
        salary:"",
        requirements:[],
        skills:[],
        image:"",
        location:"",
        jobType:"",
        ShiftAndSchedule:"",
        lastDateOfApply:""


    });

    // console.log(details)
  
    const [image, setimage] = useState("");

    // const handleFileChanger = (e)=>{
    //   let files = e.target.files[0];
    //   console.log(files)

    //   let reader = new FileReader();
    //   reader.readAsDataURL(files)

    //   reader.onload=()=>{
    //     // console.log(reader.result)
    //     setdetails({...details,image:reader.result})
    //   }

    //   reader.onerror=()=>{
    //     console.log(reader.error)
    //   }

    //   setimage(files)
    // }

   
  const [imageUploaded, setimageUploaded] = useState(true);


    const handleFileChanger = async(e)=>{
              setimageUploaded(false)
        let files = e.target.files[0];
      console.log(files)
      setimage(files)
      let formdata = new FormData();
      formdata.append('file', files);
      formdata.append('upload_preset','mediaAgain')
      let res = await axios.post('https://api.cloudinary.com/v1_1/dsf7eyovf/upload',formdata);
      // console.log(res)
      let url = res.data.secure_url
      if(url){
        setimageUploaded(true)
      }
      console.log(url)
      setdetails({...details,image:url})
      
    }

    const handleInputChanger = (e)=>{
        // console.log(e.target.name)
        // console.log(e.target.value)
        let name = e.target.name
        let value = e.target.value
        // console.log(name)
     
        if(name==='skills'){
         value= e.target.value.split(',')
         console.log(value)
        }
        if(name==='requirements'){
         value= e.target.value.split(',')
         console.log(value)
        }


        setdetails({...details, [name]:value})
    }

    const handleSubmit = async(e)=>{
      e.preventDefault()
      console.log(details)
      let res = await axios.post('https://job-backend-lnzw.onrender.com/job/create',details,{
        headers:{
          'Authorization':userStore.token
        }
      })
      let data = res.data;
      if(data.success){
        toast.success(data.msg,{position:'top-center'})
        setdetails({
          title:"",
          description:"",
          company:"",
          jobRole:"",
          salary:"",
          requirements:[],
          skills:[],
          image:"",
          location:"",
          jobType:"",
          ShiftAndSchedule:"",
          lastDateOfApply:""
  
      })
      setimage("")
      }
      else{
        toast.error(data.msg,{position:'top-center'})
      }
        console.log("submit is running")
    }

  


    // console.log(details)
  return (
    <div>
        <CompanySidebar/>
        <div  className='p-4 sm:ml-40'>

       <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
  <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">create job form</h2>
  <form>
    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
      <div>
        <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Job Title</label>
        <input value={details.title} onChange={handleInputChanger} name='title' id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
      </div>
      <div>
        <label className="text-gray-700 dark:text-gray-200" htmlFor="companyName">Company Name</label>
        <input value={details.company} onChange={handleInputChanger} name='company' id="companyName" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
      </div>
      <div className='flex flex-col'>
        <label className='text-white my-2' htmlFor="">Choose a role </label>
        <select value={details.jobRole} onChange={handleInputChanger} name='jobRole' className="px-4 w-full py-2 cursor-pointer hover:bg-blue-800 dark:text-gray-200  bg-blue-950 text-white rounded-md" htmlFor="file">
            <option value="">Select a role</option>
            <option value="Fullstack developer">Fullstack developer</option>
            <option value="Frontend developer">Frontend developer</option>
            <option value="Backend developer">Backend developer</option>
            <option value="Mern developer">Mern developer</option>
            <option value="IOS developer">IOS developer</option>
            <option value="Android developer">Android developer</option>
            <option value="WordPress developer">WordPress developer</option>
        </select>
      
      </div>
      

      <div>
        <label className="text-gray-700 dark:text-gray-200" htmlFor="sallery">Sallery</label>
        <input value={details.salary} onChange={handleInputChanger} name='salary' id="sallery" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
      </div>
      <div className='mt-2 mb-5 flex justify-around w-full'>
       <div>
       <label className="px-4 py-2 cursor-pointer hover:bg-blue-800 dark:text-gray-200 w-max bg-blue-950 text-white rounded-sm" htmlFor="file">Upload Company Image</label>
       <input  onChange={handleFileChanger} name='image' id='file' type="file" hidden />
       </div>
   
     {image &&  <img className='w-28 h-28' src={URL.createObjectURL(image)} alt="" />}
      </div>
    

    </div>
   
   <div className='flex md:flex-row flex-col  gap-3 items-center mb-3'>
   <div className='w-1/2' >
   <label className='text-white' htmlFor="">Select a Job Type</label>
    <select onChange={handleInputChanger} value={details.jobType}  className='px-4 py-2 w-full  hover:bg-blue-800 dark:text-gray-200  bg-blue-950 text-white rounded-md ' name="jobType" id="">
      <option value="">Select a job type</option>
      <option value="fulltime">Full-time</option>
      <option value="parttime">Part-time</option>
      <option value="remote">Remote</option>
      <option value="onLocation">On-location</option>
      
    </select>
   </div>
   <div className='w-1/2'>
    <label className='text-white' htmlFor="">City</label>
    <input value={details.location} onChange={handleInputChanger} className='py-2 px-4 w-full rounded-md ' type="text" name='location' placeholder='enter the city..' />
   </div>
   </div>
 <div className='flex md:flex-row flex-col  gap-3 items-center mb-3'>
 <div className='w-1/2'>
      <label className='text-white' htmlFor="">ShiftAndSchedule</label><br />
      <input value={details.ShiftAndSchedule} onChange={handleInputChanger} name='ShiftAndSchedule' className='py-2 px-4 mx-2 w-full' type="text" placeholder='ex:- monday-saturday'/>
   </div>
   <div className='w-1/2'>
      <label className='text-white'  htmlFor="">Last date of apply</label><br />
      <input value={details.lastDateOfApply} className='py-2 px-4 mx-2 w-full' onChange={handleInputChanger} name='lastDateOfApply' type="date" placeholder=''/>
   </div>
 </div>
  
   
    <div>
        <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Description</label>
        <textarea value={details.description} onChange={handleInputChanger} name='description' id="description"  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
      </div>

    <div>
        <label className="text-gray-700 dark:text-gray-200" htmlFor="requirements">Requirements</label>
        <textarea value={details.requirements} onChange={handleInputChanger} name='requirements' id="requirements"  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
      </div>
    <div>
        <label className="text-gray-700 dark:text-gray-200" htmlFor="skills">Skills</label>
        <textarea value={details.skills} onChange={handleInputChanger} name='skills' id="skills"  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
      </div>
      <div className="flex justify-center mt-6">
{ imageUploaded===true ?     <button onClick={handleSubmit} className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
        :
      <button onClick={handleSubmit} disabled className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Loading...</button>}
    </div>
  </form>
</section>

        </div>
        
    </div>
  )
}

export default CreateJob
