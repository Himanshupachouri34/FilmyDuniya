import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore'
import { TailSpin, ThreeDots } from 'react-loader-spinner'
import swal from 'sweetalert'
import { AppState } from '../App'
import { useNavigate } from 'react-router-dom'
import { reviewsRef , db} from '../firebase/Firebase'



const Review = ({ id, prevRating, userRated }) => {
    const navigate = useNavigate()
    const useAppState = useContext(AppState)
    const [rating, setRating] = useState(0)
    const [loading, setLoading] = useState(false)
    const [reviewLoading, setReviewLoading] = useState(false)
    const [thoughtInput, setThoughtInput] = useState('')

    const [data, setData] = useState([])
    const [newadded , setNewadded] = useState(0)


    const sendReview = async () => {
        setLoading(true)
        try {
            if(useAppState.login){
            await addDoc(reviewsRef, {
                movieid: id,
                name: useAppState.username,
                rating: rating,
                thought: thoughtInput,
                timestamp: new Date().getTime()
            })

            const docRef = doc(db, 'movies', id)
            await updateDoc(docRef, {
                rating: prevRating + rating,
                rated: userRated + 1
            })

            setRating(0)
            setThoughtInput('')
            setNewadded(newadded + 1)
            swal({
                title: 'Review Added',
                icon: 'success',
                buttons: false,
                timer: 3000
            })
        }else{
            navigate('/login')
        }

        } catch (error) {
            swal({
                title: 'Try Again',
                icon: 'error',
                buttons: false,
                timer: 3000
            })
        }
        setLoading(false)
    }

    useEffect(() => {
        async function getData() {
            setReviewLoading(true)
            setData([])
            let qry = query(reviewsRef, where('movieid', '==', id))
            const querySnapshot = await getDocs(qry)

            querySnapshot.forEach((doc) => {
                setData((prev) => [...prev, doc.data()])
            })
            setReviewLoading(false)
        }
        getData()
    }, [newadded])


    return (
        <div className='mt-4 w-full py-2 border-t-2 border-gray-500 
     '>
            <ReactStars
                size={40}
                half={true}
                value={rating}
                onChange={(rate) => setRating(rate)}
            />

            <input
                value={thoughtInput}
                onChange={(e) => setThoughtInput(e.target.value)}
                className='w-full p-2 outline-none bg-gray-600'
                placeholder='Share Your Thoughts Here!'
                type="text"
            />
            <button onClick={sendReview} className='   bg-purple-900 w-full mt-4 h-8 rounded-lg hover:text-lg duration-200 '>
                {loading ? <TailSpin height={25} color='white' /> : 'Share'}
            </button>
            {
                reviewLoading ? <div className='mt-3 flex justify-center'> <ThreeDots color='purple' /> </div> :
                    <div className='mt-4'>
                        {
                            data.map((item, index) => {
                                return (
                                    <div className=' w-full mt-3  p-3 border-b border-gray-500 bg-gray-900'  key={index}>
                                        <div className='flex items-baseline gap-2'>
                                            <p className='text-green-600 text-lg'> {item.name} </p>
                                            <p className='text-xs '>{new Date(item.timestamp).toLocaleString()} </p>
                                        </div>

                                        <ReactStars
                                            size={15}
                                            half={true}
                                            value={rating}
                                            onChange={(rate) => setRating(rate)}
                                        />

                                        <p> {item.thought} </p>
                                    </div>
                                )
                            })
                        }
                    </div>
            }
        </div>
    )
}

export default Review