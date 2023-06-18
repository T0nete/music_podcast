import React, { useEffect } from 'react'
import { getPodcasts }  from '../services/useITunes'
import PodcastCard from '../components/PodcastCard'
import FilterPodcast from '../components/FilterPodcast'
import { Link } from 'react-router-dom'

function MainPage () {
    const [initialState, setInitialState] = React.useState([])
    const [filteredPodcasts, setFilteredPodcasts] = React.useState([])
    const [filter, setFilter] = React.useState('')
    
    // TODO: Extract to a custom hook
    useEffect(() => {
        getPodcasts()
            .then(podcasts => {
                setInitialState(podcasts)
                setFilteredPodcasts(podcasts)
            })
    }, [])

    // TODO: Extract to a custom hook
    useEffect(() => {
        if (filter) {
            const filteredPodcasts = initialState.filter(podcast => {
                return podcast.name.toLowerCase().includes(filter.toLowerCase()) || podcast.artist.toLowerCase().includes(filter.toLowerCase())
            })
            setFilteredPodcasts(filteredPodcasts)
        } else {
            setFilteredPodcasts(initialState)
        }
    }, [filter])


    const handleChangeFilter = (value) => {
        console.log(value)
        setFilter(value)
    }

    return (
        <main className='w-4/5 m-auto flex flex-col'>
            <FilterPodcast handleChangeFilter={handleChangeFilter} />
            <div className='grid grid-cols-4'>
                {
                    filteredPodcasts.map(podcast => {
                        return (
                            <div 
                                key={podcast.id}
                                className='h-full w-full p-4 items-center justify-center flex flex-col'    
                            >
                                <img 
                                    src={podcast.img} 
                                    alt='podcast cover'
                                    className='h-32 w-32 rounded-full'
                                />
                                <div  className='w-full'>
                                    <Link to={`/podcast/${podcast.id}`}>
                                        <PodcastCard podcast={podcast} />
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </main>
    )
}

export default MainPage