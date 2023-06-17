import axios from 'axios'

const numberOfPodcast = 100
const genreId = 1310


// console.log(process.env.BASE_API_URL)

const client = axios.create({
    baseURL: "https://itunes.apple.com/us/rss/toppodcasts/",
    timeout: 1000,
})

const refreshPodcasts = () => {
    const systemDate = new Date().getTime()
    const oneDay = 24 * 60 * 60 * 1000
    const podcastStoredDate = localStorage.getItem('podcastsDate')
    
    return (systemDate - podcastStoredDate) > oneDay
    // return true
}

const getPodcasts = async () => {
    let podcasts
    const refresh = refreshPodcasts()
    console.log(refresh)

    if (refresh) {
        podcasts = fetchMusicPodcasts()
    } else {
        podcasts = JSON.parse(localStorage.getItem('podcasts'))
    }
    return podcasts
}

const fetchMusicPodcasts = async () => {
    console.log('fetching podcasts')
    return client.get(`limit=${numberOfPodcast}/genre=${genreId}/json`)
        .then(response => {
            const podcasts = response.data.feed.entry.map(podcast => {
                return {
                    id: podcast.id.attributes['im:id'],
                    name: podcast['im:name'].label,
                    title: podcast.title.label,
                    img: podcast['im:image'][2].label,
                    summary: podcast.summary.label,
                    artist: podcast['im:artist'].label
                }
            })
            localStorage.setItem('podcasts', JSON.stringify(podcasts))
            localStorage.setItem('podcastsDate', new Date().getTime())
            return podcasts
        })
        .catch(error => {
            console.log(error)
        })
}

export default getPodcasts 
