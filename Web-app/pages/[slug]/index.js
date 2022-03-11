import Link from 'next/link'
import {
    useRouter
} from 'next/router';

export default function Home() {
    const router = useRouter()

    const  handleClickm = (e) =>  {
        const que = router.query
        const st = que.slug
        const m="/"+st+"/1"
        const n="/"+st+"/2"
        console.log(st)
        e.preventDefault()
        router.push(m)
      }
      const  handleClickn = (e) =>  {
        const que = router.query
        const st = que.slug
        const m="/"+st+"/1"
        const n="/"+st+"/2"
        console.log(st)
        e.preventDefault()
        router.push(n)
      }
 


    return (    
    <div className=" flex flex-col justify-center items-center space-x-3 cursor-pointer">
 
    <button class="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded" onClick={handleClickm}>
    séance de matin
    </button>
    <button class="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded" onClick={handleClickn}>
    séance de  l'après midi
    </button>
       </div> )
    }