import React from 'react'
import { Link } from 'react-router-dom'

const PodcastDescription = ({id, image, title, author, description}) => {
    return (
        <Link to={`/podcast/${id}`} className='text-center'>
            <div role="podcastDescription" className='p-4 flex flex-col shadow-md rounded-md divide-y-2'>
                <div  className='p-2 justify-center mx-auto '>
                    <img 
                        src={image} 
                        alt='podcast image'
                        className='h-48 w-48  rounded-lg'
                    />
                </div>
                <div className='flex flex-col p-2'>
                    <h3 className='font-semibold text-start'>{title}</h3>
                    <p className='text-start'>by {author}</p>
                </div>
                <div className='flex flex-col p-2 text-justify'>
                    <p className='font-semibold truncate'>Description:</p>
                    {/* Some descriptions have html tags, so we use dangerouslySetInnerHTML to render them */}
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                </div>
            </div>
        </Link>
    )
}

export default PodcastDescription