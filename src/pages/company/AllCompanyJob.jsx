import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Button, Modal } from 'antd';
import { toast } from 'react-toastify';
import CompanySidebar from '../../components/CompanySidebar';


const AllCompanyJob = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  let userStore = useSelector((state)=>state.user);
  console.log(userStore)

  const [allJobs, setallJobs] = useState([]);
  console.log(allJobs)
  const getCompanyJob = async()=>{
      let res = await axios.get('https://job-backend-lnzw.onrender.com/job/singlecompanyalljob',{
        headers:{
          'Authorization':userStore.token
        }
      })

      let data = res.data
      // console.log(data)
      if(data.success){
        setallJobs(data.jobs)
      }
  }

  const handleDelete = async(id)=>{
    console.log(id)
    let res = await axios.delete(`https://job-backend-lnzw.onrender.com/job/delete/${id}`,{
      headers:{
        'Authorization':userStore.token
      }
    })

    let data = res.data
    if(data.success){
      getCompanyJob()
    }
  }

  const [selectedJob, setselectedJob] =useState({
          title:"",
          description:"",
          company:"",
          jobRole:"",
          salary:"",
          requirements:[],
          skills:[],
          image:""
  
      });
  console.log(selectedJob)

  const handleEdit=(obj)=>{
    // console.log(obj)
    setselectedJob(obj)
    setIsModalOpen(true)
  }

  useEffect(()=>{
    getCompanyJob()
  },[])


  const [image, setimage] = useState("");

 const handleFileChanger = async(e)=>{
    
         let files = e.target.files[0];
       console.log(files)
       setimage(files)
       let formdata = new FormData();
       formdata.append('file', files);
       formdata.append('upload_preset','mediaAgain')
       let res = await axios.post('https://api.cloudinary.com/v1_1/dsf7eyovf/upload',formdata);
       // console.log(res)
       let url = res.data.secure_url
       console.log(url)
       setselectedJob({...selectedJob,image:url})
    
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
 
 
         setselectedJob({...selectedJob, [name]:value})
     }
 
     const handleSubmit = async(e)=>{
       e.preventDefault()
       console.log(selectedJob)
       let res = await axios.put(`https://job-backend-lnzw.onrender.com/job/update/${selectedJob._id}`,selectedJob,{
         headers:{
           'Authorization':userStore.token
         }
       })
       let data = res.data;
       if(data.success){
        setIsModalOpen(false)
        getCompanyJob()
         toast.success(data.msg,{position:'top-center'})
         setselectedJob({
           title:"",
           description:"",
           company:"",
           jobRole:"",
           salary:"",
           requirements:[],
           skills:[],
           image:""
   
       })
       setimage("")
       }
       else{
         toast.error(data.msg,{position:'top-center'})
       }
         // console.log("submit is running")
     }

  return (
    <div className='p-4'>
        <CompanySidebar/>

        <div className='ms-60 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-3'>
      
      {
        allJobs.map((ele)=>{
          return  <div className="w-full max-w-sm shrink-0 px-4 py-3 flex flex-col justify-between bg-white rounded-md shadow-md dark:bg-gray-800">
  <div className="flex md:flex-row gap-2 shrink-0 flex-col items-center justify-between">
    {ele.image && <img src={ele.image} className='h-16 w-16 rounded-full' alt="" />}
    <span className="text-sm font-light text-gray-800 dark:text-gray-400">{ele.company}</span>
    <span className="px-3 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900">{ele.salary} Rs</span>
  </div>
  <div>
    <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">{ele.title}</h1>
    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{ele.description}</p>
  </div>
  <div>
    <div className="flex flex-wrap items-center mt-2 text-gray-700 dark:text-gray-200">
      <span className='shrink-0'>Skills:-</span>
      <p>{ele.skills.join(' , ')}</p>
    </div>
    {ele.requirements.length >0 &&<div className="flex flex-wrap items-center mt-2 text-gray-700 dark:text-gray-200">
      <span className='shrink-0'>Requirements:-</span>
          {ele.requirements.map((requirement)=>{
            return <p className='ms-2'>{requirement },</p>
          })}
    </div>}
    <div className="flex items-center justify-end mt-4">
      <a onClick={()=>handleEdit(ele)} className="mr-2 text-gray-800 cursor-pointer dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" tabIndex={0} role="link" aria-label="share link">
          <FaEdit  color='green' size={20}/>
        
      </a>
    
      <a onClick={()=>handleDelete(ele._id)} className="mr-2 text-gray-800 cursor-pointer dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" tabIndex={0} role="link" aria-label="share link">
          <MdDelete  color='red' size={20}/>
      </a>
    </div>
  </div>
</div>

        })
        
      }
       
        </div>
        <Modal cancelButtonProps={{ style: { display: 'none' } }} okButtonProps={{style:{display:"none"}}} title="Basic Modal" open={isModalOpen} onCancel={handleCancel}>
        <form className='w-full '>
    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
      <div>
        <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Job Title</label>
        <input  value={selectedJob.title} onChange={handleInputChanger} name='title' id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
      </div>
      <div>
        <label className="text-gray-700 dark:text-gray-200" htmlFor="companyName">Company Name</label>
        <input value={selectedJob.company}  onChange={handleInputChanger} name='company' id="companyName" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
      </div>
      <div className='flex flex-col'>
        <label className='text-white my-2' htmlFor="">Choose a role </label>
        <select value={selectedJob.jobRole}  onChange={handleInputChanger} name='jobRole' className="px-4 w-full py-2 cursor-pointer hover:bg-blue-800 dark:text-gray-200  bg-blue-950 text-white rounded-sm" htmlFor="file">
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
        <input value={selectedJob.salary}  onChange={handleInputChanger} name='salary' id="sallery" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
      </div>
      <div className='mt-2 mb-5 flex justify-around items-center  w-full'>
       <div className='w-full'>
       <label className="px-4 w-[150px] py-2 cursor-pointer hover:bg-blue-800 dark:text-gray-200  bg-blue-950 text-white rounded-sm" htmlFor="file">Upload Company Image</label>
       <input onChange={handleFileChanger} name='image' id='file' type="file" hidden />
       </div>
   
      </div>
     {selectedJob.image &&  <img className='w-28 h-28' src={selectedJob.image} alt="" />}
    

    </div>
   
   
    <div>
        <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Description</label>
        <textarea value={selectedJob.description}  onChange={handleInputChanger} name='description' id="description"  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
      </div>

    <div>
        <label className="text-gray-700 dark:text-gray-200" htmlFor="requirements">Requirements</label>
        <textarea value={selectedJob.requirements}  onChange={handleInputChanger} name='requirements' id="requirements"  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
      </div>
    <div>
        <label className="text-gray-700 dark:text-gray-200" htmlFor="skills">Skills</label>
        <textarea value={selectedJob.skills}  onChange={handleInputChanger} name='skills' id="skills"  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
      </div>
      <div className="flex justify-center mt-6">
      <button onClick={handleSubmit}  className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">update</button>
    </div>
  </form>
      </Modal>
    </div>
  )
}

export default AllCompanyJob
