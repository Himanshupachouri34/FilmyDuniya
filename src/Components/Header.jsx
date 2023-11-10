import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AppState } from '../App';


const Header = () => {
    const useAppState = useContext(AppState)

    return (
        <div className='bg-gray-900 sticky top-0 h-20 flex justify-between items-center border-b-2 p-3 border-white'>
            <h1 className='text-3xl font-extrabold'>
                <Link to={'/'}> <span className='text-orange-600'>Filmy</span> Duniya</Link>
            </h1>
            {useAppState.login 
                ?
                <Link to={'/addmovie'}>
                    <h1>
                        <Button>
                            <AddIcon className='mr-1 text-white' />
                            <span className='text-white text-lg'> Add New</span>
                        </Button>
                    </h1>
                </Link>
                :
                <Link to={'/login'}>
                    <h1 className='bg-orange-600 rounded-md hover:bg-blue-700 duration-300'>
                        <Button>
                            <AddIcon className='mr-1 text-white' />
                            <span className='text-white text-lg font-bold capitalize'> Login</span>
                        </Button>
                    </h1>
                </Link>
            }
        </div>

    )
}

export default Header