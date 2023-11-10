import React, { useContext, useState } from 'react'
import { TailSpin} from 'react-loader-spinner'
import swal from 'sweetalert'
import { AppState } from '../App'
import { useNavigate } from 'react-router-dom'
import { addDoc } from 'firebase/firestore'
import { moviesRef } from '../Database/Firebase'

const AddMovie = () => {
    const useAppSate = useContext(AppState)
    const navigate = useNavigate()
    const [form , setForm] = useState({
        title: '',
        year: '',
        description:'',
        image: '',
        rated: 0,
        rating: 0
    })
    const [loading , setLoading] = useState(false)

    const addMovie = async () =>{
        setLoading(true)
        try {
            if (useAppSate.login) {
                await addDoc(moviesRef, form)
                swal({
                    title: 'Successfully Added',
                    icon: 'success',
                    buttons: false,
                    timer: 3000
                })
                setForm({
                    title: '',
                    year: '',
                    description:'',
                    image: ''
                })
            } else {
                navigate('/login')
            }
            
       
        } catch (error) {
            swal({
                title: 'error',
                icon: 'error',
                buttons: false,
                timer: 3000
            })
        }
        setLoading(false)
    } 
    return (
        <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
                <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                    <iframe
                        width="100%"
                        height="100%"
                        className="absolute inset-0"
                        title="map"
                        src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
                        style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
                    ></iframe>
                    <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
                        <div className="lg:w-1/2 px-6">
                            <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                                Title
                            </h2>
                            <p className="mt-1">
                                Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter
                            </p>
                        </div>
                        <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                            <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                                Year
                            </h2>
                            <a className="text-indigo-500 leading-relaxed">example@email.com</a>
                            <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                                PHONE
                            </h2>
                            <p className="leading-relaxed">123-456-7890</p>
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 p-3 md:mt-0">
                    <h2 className="text-gray-900 text-lg mb-1 font-bold title-font text-center ">Add New Movie</h2>
                    <p className="leading-relaxed mb-5 text-gray-600">
                    </p>
                    <div className="relative mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                            Title
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.title}
                            onChange={(e) => setForm({...form , title: e.target.value}) }
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                            Year
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.year}
                            onChange={(e) => setForm({...form , year: e.target.value}) }
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                            Image URL
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.image}
                            onChange={(e) => setForm({...form , image: e.target.value}) }
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="message" className="leading-7 text-sm text-gray-600">
                            Description
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={form.description}
                            onChange={(e) => setForm({...form , description: e.target.value}) }
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                        ></textarea>
                    </div>
                    <button onClick={addMovie} className="text-white flex items-center justify-center bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">
                       {loading? <TailSpin height={35} color='white' /> :'Submit' } 
                    </button>
                    <p className="text-xs text-gray-500 mt-3">
                        Chicharrones blog helvetica normcore iceland tousled brook viral artisan.
                    </p>
                </div>
            </div>
        </section>

    )
}

export default AddMovie