import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import {BallTriangle} from 'react-loader-spinner'
import { getDocs } from 'firebase/firestore'
import { moviesRef } from '../firebase/firebase'
import { Link } from 'react-router-dom'



const Cards = () => {
    const [data, setData] = useState([])
    const [loading , setLoading] = useState(false)

    useEffect(() =>{
        async function getData() {
            setLoading(true)
            const _data =   await getDocs(moviesRef)
            _data.forEach((doc) => {
                setData((prev) => [...prev, {...(doc.data()), id: doc.id}])
            })
            setLoading(false)
        }
        getData()
    },[])


    return (
        <div className='flex flex-wrap justify-between p-3 m-2'>
            {loading? <div className='w-full flex justify-center items-center h-96'><BallTriangle color='white' height={90}/></div> : 
            
                data.map((item, index) => {
                    return (
                       <Link to={`/detail/${item.id}`} key={index}> <div className='bg-gray-900 shadow-lg p-2 hover:-translate-y-4 transition-all duration-500 cursor-pointer  mt-6 font-bold'>
                            <img className='h-60 md:h-72' src={item.image} />
                            <h1> {item.name} </h1>
                            <h1 className='flex items-center'><span className='text-gray-300 mr-2'>Rating: </span> 
                            <ReactStars 
                            size={20} 
                            half={true} 
                            value={item.rating/item.rated} 
                            edit={false} />
                             </h1>
                            <h1><span className='text-gray-300'>Year:</span> {item.year} </h1>
                        </div>
                        </Link>
                    )
                })
            
            }

        </div>
    )
}

export default Cards