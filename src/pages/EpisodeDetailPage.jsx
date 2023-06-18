import React from 'react'
import {useSelector} from 'react-redux'
import PodcastDescription from '../components/PodcastDescription'

function EpisodeDetailPage () {
    const {id, image, title, author, description} = useSelector(state => state.podcast)

    return (
        <div className='flex flex-row'>
            <aside> 
                <PodcastDescription
                    id={id}
                    image={image}  
                    author={author}
                    title={title}
                    description={description}
                />
            </aside>
            <main>
                <h1>{title}</h1>
            </main>
        </div>
    )
}

export default EpisodeDetailPage