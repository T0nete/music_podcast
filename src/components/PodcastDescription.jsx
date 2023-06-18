import React from 'react'

const PodcastDescription = ({image, title, author, description}) => {
    return (
        <div className='w-full p-2 flex flex-col shadow-md rounded-md divide-x-2'>
            <img 
                src={image} 
                alt='podcast image'
                className='h-32 w-32 rounded-lg justify-center'
            />
            <div className='flex flex-col p-2'>
                <h3 className='font-semibold'>{title}</h3>
                <p>by {author}</p>
            </div>
            <div>
                <p className='font-semibold'>Description:</p>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default PodcastDescription