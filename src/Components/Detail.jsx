import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/Firebase'
import {  Circles } from 'react-loader-spinner'
import Review from './Review'

const Detail = () => {
    const {id} = useParams();
    const [data, setData] = useState({
        title: '',
        year: '',
        image: '',
        description: '',
        rating: 0,
        rated: 0 
    })
    const [loading , setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        async function getData(){
        const _doc = doc(db, 'movies', id)
        const _data = await getDoc(_doc)
        setData(_data.data())
        setLoading(false)
        }
        getData()
    },[])

    return (
        <div className='flex flex-col  md:flex-row md:items-start items-center w-full mt-4 p-4 justify-center'>
            {loading? <div className=' h-96 flex w-full justify-center items-center '> <Circles height={60} color='white'/> </div> : 
            <>
            <img className='h-96 md:sticky top-24  ' src={data.image} />
            <div className='md:ml-4  w-full  md:w-1/2'>
                <h1 className='text-2xl font-bold text-gray-300'> {data.name} <span className='text-sm text-red-600'> ({data.year}) </span> </h1>

                <ReactStars
                    size={20}
                    half={true}
                    value={data.rating/data.rated}
                    edit={false} />


                <p className='m-2  '>
                    {data.description}
                </p>                
                <Review id = {id} prevRating = {data.rating} userRated = {data.rated} /> 
            </div>
            </>
            }
        </div>
    )
}

export default Detail