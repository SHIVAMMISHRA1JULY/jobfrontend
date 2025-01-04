import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from "react-icons/fa";

const CompanySidebar = () => {
  const [showMobileBar, setshowMobileBar] = useState(false);
  return (
      
   <div className={`h-full w-max p-4 bg-gray-900 fixed left-0 top-[63px]`}>
    <button className='sm:hidden block' onClick={()=>setshowMobileBar(!showMobileBar)}><FaBars size={30}/></button>

   {showMobileBar && <div className=' sm:block  left-0  text-white'>
      
      <ul>
          <li className='bg-green-700 rounded-sm px-4 py-2 hover:bg-green-950 text-white'><Link to="/companyDashboard/createJob">Create Job</Link></li>
          <li className='border-b-2 border-white p-3'><Link to={'/companyDashboard/AllJob'}>Show All Jobs</Link></li>
          <li className='border-b-2 border-white p-3'><Link to="/appliedJobs">Applied Jobs</Link></li>
      </ul>
  
      </div>}
    
     <div className=' sm:block hidden    text-white'>
      
      <ul>
          <li className='bg-green-700 rounded-sm px-4 py-2 hover:bg-green-950 text-white'><Link to="/companyDashboard/createJob">Create Job</Link></li>
          <li className='border-b-2 border-white p-3'><Link to={'/companyDashboard'}>Dashboard</Link></li>
          <li className='border-b-2 border-white p-3'><Link to={'/companyDashboard/AllJob'}>Show All Jobs</Link></li>
          <li className='border-b-2 border-white p-3'><Link to="/appliedJobs">Applied Jobs</Link></li>
      </ul>
  
      </div>
   </div>
  )
}

export default CompanySidebar
