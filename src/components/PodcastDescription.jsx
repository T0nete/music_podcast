import React from 'react'

const PodcastDescription = ({image, title, author, description}) => {
    return (
        <div className='p-4 flex flex-col shadow-md rounded-md divide-y-2'>
            <div  className='p-2 justify-center mx-auto '>
                <img 
                    src={image} 
                    alt='podcast image'
                    className='h-48 w-48  rounded-lg'
                />
            </div>
            <div className='flex flex-col p-2'>
                <h3 className='font-semibold'>{title}</h3>
                <p>by {author}</p>
            </div>
            <div className='flex flex-col p-2'>
                <p className='font-semibold'>Description:</p>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default PodcastDescription