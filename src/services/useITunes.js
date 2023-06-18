import axios from 'axios'
import { xml2js } from 'xml-js'
import { refreshPodcasts, refreshPodcastDetails} from '../utils/utils'

const numberOfPodcast = 100
const genreId = 1310

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

const client = axios.create({
    baseURL: `${CORS_PROXY}https://itunes.apple.com`,
    // timeout: 1000
})

export const getPodcasts = async () => {
    let podcasts
    const refresh = refreshPodcasts()
    console.log(refresh)

    if (refresh) {
        // Get data from the API
        podcasts = await fetchMusicPodcasts()
    } else {
        // Get data from localStorage
        podcasts = JSON.parse(localStorage.getItem('podcasts'))
    }
    return podcasts
}

export const getPodcastById = async (id) => {
    let podcast
    let episodes

    if (refreshPodcastDetails()) {
        podcast = await fetchMusicPodcastById(id)
        episodes = await fetchEpisodes(podcast.feedUrl)
        podcast.description = episodes.description
        podcast.episodes = episodes.episodes
    } else {
        podcast = JSON.parse(localStorage.getItem(`podcast_${id}`))
    }
    console.log(podcast)
    return podcast
}


const fetchMusicPodcasts = async () => {
    return client.get(`/us/rss/toppodcasts/limit=${numberOfPodcast}/genre=${genreId}/json`)
        .then(response => {
            if (response.status !== 200) {
                console.log('Error: ' + response.status)
            }
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

const fetchMusicPodcastById = async (id) => {
    return client.get(`/lookup?id=${id}`)
        .then(response => {
            console.log(response.data.results[0])
            if (response.status !== 200) {
                console.log('Error: ' + response.status)
            }
            const {trackId, artworkUrl100, collectionName, artistName, feedUrl } = response.data.results[0]
            const podcast = {
                id: trackId,
                image: artworkUrl100,
                title: collectionName,
                author: artistName,
                feedUrl: feedUrl
            }
            localStorage.setItem(`podcastsDate_${id}`, new Date().getTime())
            localStorage.setItem(`podcast_${id}`, JSON.stringify(podcast))

            return podcast
        })
        .catch(error => {
            console.log(error)
        })
}


export const fetchEpisodes = async (feedUrl) => {
    return axios.get(`${feedUrl}`)
        .then(response => {
            if (response.status !== 200) {
                console.log('Error: ' + response.status)
            }
            const json = xml2js(response.data, { compact: true, spaces: 4 });
            console.log(json.rss.channel)
            const detail = {
                description: json.rss.channel.description._cdata,
                episodes: json.rss.channel.item.map(episode => {
                    return {
                        title: episode['itunes:title']._text,
                        pubDate: episode.pubDate._text,
                        duration: episode['itunes:duration']._text
                    }
                })
            }
            return detail
        })
        .catch(error => {
            console.log(error)
        })
}