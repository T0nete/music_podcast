import React from 'react'
import {useSelector} from 'react-redux'
import PodcastDescription from '../components/PodcastDescription'

function EpisodeDetailPage () {
    const {id, image, title, author, description} = useSelector(state => state.podcast)

    return (
        <div className='flex flex-row w-4/5 m-auto'>
            <aside className='w-1/4'> 
                <PodcastDescription
                    id={id}
                    image={image}  
                    author={author}
                    title={title}
                    description={description}
                />
            </aside>
            <main className='w-3/4 flex flex-col'>
                <div className='p-2 flex flex-col shadow-md rounded-md'>
                    <h1>{title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                    
                </div>
            </main>
        </div>
    )
}

export default EpisodeDetailPage