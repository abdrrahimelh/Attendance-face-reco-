import React from 'react';
import  { useRouter} from 'next/router';
import {useState} from 'react'
import Image from 'next/image'
function presence() {
    const router=useRouter()
    const que=router.query
    console.log(que)
    const [pres, setpres] = useState([]);
    const [images, setimages] = useState([]);
    const [absent, setabsent] = useState([]);
    const [both, setboth] = useState([]);
    const [test,settest]=useState(true)
    const fetchComments = async () => {
        const response = await fetch("/api/"+que.slug+que.id);
        const data= await response.json()
        console.log(data)
        setpres([data.presentsnoms]);
        setimages(data.presimage);
        setabsent(data.absents);
        setboth(data.datapres);
    }
     
        fetchComments();
      
    

    return <div>
        <div className="flex justify-center items-center space-x-3 cursor-pointer">

        <div className='text-5xl font-bold text-green-600 '>Présents</div>
        </div>
        {both.map((pr,index) =>{
            return(<div key={index}>
                  

        <div className="flex justify-center items-center space-x-3 cursor-pointer">

          <div className="w-12 h-12 rounded-full overflow-hidden border-2 dark:border-white border-gray-900">
            <img src={pr.image} className=" space-x-4 w-full h-full object-cover "></img>
          </div>
          <div className="font-semibold dark:text-white text-lg">
            <div className="cursor-pointer text-2xl text-green-400">{pr.nom}</div>
          </div>
          </div>

             
            </div>)
        })}
        
        <div className="flex justify-center items-center space-x-3 cursor-pointer">
        <div className='text-5xl font-bold text-red-900 '>Absents</div></div>
        <div className="flex justify-center items-center space-x-3 cursor-pointer">
        <div className='flex-col'>
        {absent.map((pr,index) =>{
            return(<div className='font-bold text-red-600 text-2xl' key={index}>
                {pr}
            </div>)
        })}
        <div/></div>
    </div>
    </div>

    ;
}

export default presence;
