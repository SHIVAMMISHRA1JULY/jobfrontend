import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import CompanySidebar from '../../components/CompanySidebar';

const CompanyDashboard = () => {
  let userStore = useSelector((state)=>state.user);
  console.log(userStore)

  const [counts, setcounts] = useState({
    jobCount:"",
    appliedCount:""
  });

  console.log(counts)

  async function getCounts(){
    let res = await axios.get('https://jobbackend-s1yb.onrender.com/job/countJob',{
      headers:{
        'Authorization':userStore.token
      }
    })
    let data = res.data
    // console.log(data)
    if(data.success){
      setcounts({
        jobCount:data.jobCount,
        appliedCount:data.appliedCount
      })
    }
    }
  

  useEffect(()=>{
    getCounts()
  },[])
  return (
   <div>
   <CompanySidebar/>

    <button type="button" class="btn btn-text max-sm:btn-square sm:hidden" aria-haspopup="dialog" aria-expanded="false" aria-controls="default-sidebar" data-overlay="#default-sidebar" >
  <span class="icon-[tabler--menu-2] size-5"></span>
</button>



    <button type="button" class="btn btn-text max-sm:btn-square sm:hidden" aria-haspopup="dialog" aria-expanded="false" aria-controls="cta-sidebar" data-overlay="#cta-sidebar" >
  <span class="icon-[tabler--menu-2] size-5"></span>
</button>



  <div className="p-4 sm:ml-64">
  <section className="rounded-3xl grid grid-cols-2 gap-6 ">
  <div className="p-8 text-center shadow-2xl bg-orange-300 sm:p-12">
    <p className="text-sm font-semibold uppercase tracking-widest text-pink-500">
      Total Jobs Created
    </p>

    <h2 className="mt-6 text-3xl font-bold text-black">{counts.jobCount}</h2>

   
  </div>
  <div className="p-8  bg-orange-300 shadow-2xl  text-center sm:p-12">
    <p className="text-sm font-semibold uppercase tracking-widest text-pink-500">
      Total Applicants
    </p>

    <h2 className="mt-6 text-3xl text-black font-bold">{counts.appliedCount}</h2>
  </div>
  
</section>
   
  </div>
</div>

  )
}

export default CompanyDashboard
