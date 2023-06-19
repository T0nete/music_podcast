import React from 'react'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'
import { useSelector } from 'react-redux'

const Header = () => {
    const isLoading = useSelector(state => state.loading)

    return (
        <header className="w-full h-12 shadow-sm flex items-center">
            <div className='w-4/5  m-auto flex flex-row justify-between'>
                <Link to='/'>
                    <h1 className='text-blue-500 text-xl font-bold'>Podcaster</h1>
                </Link>
                {
                    isLoading && <Spinner />
                }
            </div>
        </header>
    )
}

export default Header