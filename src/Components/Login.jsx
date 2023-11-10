import React, { useContext, useState } from 'react'
import {Link,  useNavigate} from 'react-router-dom'
import {TailSpin} from 'react-loader-spinner'
import { query, getDocs, where  } from 'firebase/firestore'
import { AppState } from '../App'
import swal from 'sweetalert'
import bcrypt from 'bcryptjs';
import { usersRef } from '../Database/Firebase'


const Login = () => {
  const navigate = useNavigate()
  const useAppState = useContext(AppState)
  const [form, setForm] = useState({
    mobile: '',
    password: ''    
  })

  const [loading, setLoading] = useState(false)


  const login = async () =>{
    setLoading(true)
    try {
      const qry= query(usersRef, where('mobile', '==',form.mobile))
      const querySnapshot = await getDocs(qry)

      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(form.password, _data.password);
        if(isUser) {
          useAppState.setLogin(true);
          useAppState.setUsername(_data.name);
          swal({
            title: "Logged In",
            icon: "success",
            buttons: false,
            timer: 3000
          })
          navigate('/')
        } else {
          swal({
            title: "Invalid Credentials",
            icon: "error",
            buttons: false,
            timer: 3000
          })
        }
      })
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000
      })
    }
    setLoading(false);
  }
  return (
    <div className='flex flex-col justify-center items-center mt-8'>
      <h1 className='text-2xl font-bold flex justify-center '>Login</h1>
      <div className=' p-3 w-1/3'>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-white">
            Mobile No.
          </label>
          <input
            type="number"
            id="mobile"
            name="mobile"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            className="w-full bg-gray-300 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>

      <div className=' p-3 w-1/3'>
        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-gray-300 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

      </div>

      <button 
      onClick={login}
      className="text-white flex items-center justify-center bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">
        {loading ? <TailSpin height={35} color='white' /> : 'Submit'}
      </button>

      <div className='mt-3'>
        <p>Do Not Have Account? <Link to={'/signup'}> <span className='text-green-400'> Sign Up </span> </Link></p>
      </div>
    </div>
  )
}

export default Login