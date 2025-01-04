import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import StudentRightBar from '../../components/StudentRightBar'

const Home = () => {

  const [isModelOpen, setIsModelOpen] = useState(false);
  const showModel = () => {
    setIsModelOpen(true);
  };
  const handleOk = () => {
    setIsModelOpen(false);
  };
  const handleCancel = () => {
    setIsModelOpen(false);
  };

  let userStore = useSelector((state) => state.user)
  console.log(userStore)

  const [searchDetails, setsearchDetails] = useState({
    title: "",
    location: ""
  });

  console.log(searchDetails)

  const searchChanger = (e) => {
    setsearchDetails({ ...searchDetails, [e.target.name]: e.target.value })
  }

  const [AllJobs, setAllJobs] = useState([]);
  console.log(AllJobs)
  const getAllJobs = async () => {
    try {
      let res = await axios.get('https://job-backend-lnzw.onrender.com/job/getalljob')
      let data = res.data
      setAllJobs(data.jobs)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllJobs()
  }, [])

  const [selectedJob, setselectedJob] = useState("");

  const handleViewJob = (obj) => {
    // console.log(obj)

    setselectedJob(obj)
    setIsModelOpen(true)
  }

  const [searchJobs, setsearchJobs] = useState([]);
  const [clickedSearch, setclickedSearch] = useState(false);

  const handleJobSubmit = async () => {
    let res = await axios.get(`https://job-backend-lnzw.onrender.com/job/searchJob?location=${searchDetails.location}&title=${searchDetails.title}`)
    let data = res.data;
    console.log(data);

    setsearchJobs(data)
    setclickedSearch(true)
  }
  return (
   <div>
      <div className='flex md:flex-row justify-center gap-4 flex-col mb-5'>
        <input onChange={searchChanger} name='title' type="text" className='px-3 py-2 border-2 rounded-md' placeholder='search a job' />
        <input onChange={searchChanger} name='location' type="text" className='px-3 py-2 border-2 rounded-md' placeholder='search a job' />
       <button onClick={handleJobSubmit} className='bg-green-800 px-4 py-2 rounded-md hover:bg-green-950 text-white' >Search Job</button>
      </div>

    
      {!clickedSearch && <div className='w-full flex flex-col items-center gap-7'>
        {
          AllJobs.map((ele, index) => {
            return <div key={ele._id} className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-sm  text-gray-800 dark:text-gray-400 capitalize font-bold">{ele.company}</span>
                <img className='w-16 h-16 rounded-full' src={ele.image} alt="" />
              </div>
              <div>
                <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white capitalize">{ele.title}</h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{ele.description}</p>
              </div>
              <div>
                <div className="flex items-center mt-2 text-gray-700 dark:text-gray-200">
                  <span>Visit on:</span>
                  <a className="mx-2 text-blue-600 cursor-pointer dark:text-blue-400 hover:underline" tabIndex={0} role="link">edx.org</a>
                  <span>or</span>
                  <a className="mx-2 text-blue-600 cursor-pointer dark:text-blue-400 hover:underline" tabIndex={0} role="link">classcentral.com</a>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <a className="mr-2 text-gray-800 cursor-pointer dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" tabIndex={0} role="link" aria-label="twitter link">
                    <button onClick={() => handleViewJob(ele)} className='border-b-2 pb-2'>view full job detail</button>
                  </a>

                </div>
              </div>
            </div>

          })
        }
      </div>}
     
    {clickedSearch && <div className='w-full flex flex-col items-center gap-7'>
      {
           searchJobs.length > 0 ? searchJobs.map((ele, index) => {
            return <div key={ele._id} className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-sm  text-gray-800 dark:text-gray-400 capitalize font-bold">{ele.company}</span>
                <img className='w-16 h-16 rounded-full' src={ele.image} alt="" />
              </div>
              <div>
                <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white capitalize">{ele.title}</h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{ele.description}</p>
              </div>
              <div>
                <div className="flex items-center mt-2 text-gray-700 dark:text-gray-200">
                  <span>Visit on:</span>
                  <a className="mx-2 text-blue-600 cursor-pointer dark:text-blue-400 hover:underline" tabIndex={0} role="link">edx.org</a>
                  <span>or</span>
                  <a className="mx-2 text-blue-600 cursor-pointer dark:text-blue-400 hover:underline" tabIndex={0} role="link">classcentral.com</a>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <a className="mr-2 text-gray-800 cursor-pointer dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" tabIndex={0} role="link" aria-label="twitter link">
                    <button onClick={() => handleViewJob(ele)} className='border-b-2 pb-2'>view full job detail</button>
                  </a>

                </div>
              </div>
            </div>

          }
          )
            : 'No match found related to this job'
      }
      </div>}
     
      <Modal title="Job details" open={isModelOpen} onOk={handleOk} onCancel={handleCancel}>
        <StudentRightBar job={selectedJob} />
      </Modal>
      </div>
  )
}

export default Home
