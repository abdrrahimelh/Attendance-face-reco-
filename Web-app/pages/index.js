import  { useState } from 'react'
import { useRouter } from "next/router";

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function Home() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null)
  

  const  handleClick = (e) =>  {
    let myurl=helper();
    e.preventDefault()
    router.push(myurl)
  }
  function helper(){
  if (selectedDate) {
    var a,b,c = ""
    a = selectedDate.getFullYear().toString()
    b = (selectedDate.getMonth()+1).toString()
    c =  selectedDate.getDate().toString()
    if (c.length == 1){
      c="0"+c;
    }
    if (b.length == 1){
      b="0"+b;
    }
    
  }
  let url=a+"-"+b+"-"+c
  return url

}
  return(
    <div className='flex justify-center items-center space-x-3 text-black'>

    <div className='flex justify-center items-center space-x-3 text-black'>
      <DatePicker selected={selectedDate} 
      onChange={date => setSelectedDate(date)
      }
      dateFormat='yyyy-MM-dd'
      />
    </div>
    <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" onClick={handleClick}>
      Check
    </button> 
  </div>

  )

}
