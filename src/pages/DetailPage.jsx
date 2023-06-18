import React, { useEffect, useState } from 'react'
import PodcastDescription from '../components/PodcastDescription'
import { useParams } from 'react-router-dom'
import { getPodcastById } from '../services/useITunes'

function DetailPage () {
    const { podcastId } = useParams()
    const [podcastDetail, setPodcastDetail] = useState({})
    const [episodes, setEpisodes] = useState([])

    // TODO: Extract to a custom hook
    useEffect(() => {
        getPodcastById(podcastId)
            .then(podcast => {
                setPodcastDetail(podcast)
            })
    }, [])

    return (
        <div className='w-4/5 m-auto flex flex-row'>
            <aside>
                {
                    <PodcastDescription 
                        image={podcastDetail.image}  
                        author={podcastDetail.author}
                        title={podcastDetail.title}
                        description={podcastDetail.description}
                    /> 
                }
            </aside>
            <main>
                <h2 className='text-2xl font-semibold'>Episodes {episodes}</h2>
            </main>
        </div>
    )
}
export default DetailPage