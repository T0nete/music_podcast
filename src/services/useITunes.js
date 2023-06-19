import axios from 'axios'
import { xml2js } from 'xml-js'
import { refreshPodcasts, refreshPodcastDetails} from '../utils/utils'

const numberOfPodcast = 100
const genreId = 1310

// CORS Proxy to avoid CORS errors
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
// const CORS_PROXY = "https://api.allorigins.win/get?"

const client = axios.create({
    baseURL: `${CORS_PROXY}https://itunes.apple.com`,
    // timeout: 1000
    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    // }

})

export const getPodcasts = async () => {
    let podcasts

    // Check if podcasts were updated more than 1 day ago
    const refresh = refreshPodcasts()

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

    // Check if podcastDetail was updated more than 1 day ago
    if (refreshPodcastDetails(id)) {
        podcast = await fetchMusicPodcastById(id)
        episodes = await fetchEpisodes(podcast.feedUrl)

        // Validate if the podcast has episodes
        if (episodes !== undefined && episodes.episodes.length > 0) {
            podcast = {
                ...podcast,
                description: episodes.description,
                episodes: episodes.episodes
            }
        } else if (episodes !== undefined && episodes.episodes.length === 0) {
            podcast = {
                ...podcast,
                description: episodes.description,
                episodes: []
            }
        } else {
            podcast = {
                ...podcast,
                description: 'No description found',
                episodes: []
            }
        }
        // Save to local storage
        localStorage.setItem(`podcastsDate_${id}`, new Date().getTime())
        localStorage.setItem(`podcast_${id}`, JSON.stringify(podcast))
    } else {
        // Get data from localStorage
        podcast = JSON.parse(localStorage.getItem(`podcast_${id}`))
    }
    return podcast
}

const fetchMusicPodcasts = async () => {
    return client.get(`/us/rss/toppodcasts/limit=${numberOfPodcast}/genre=${genreId}/json`)
        .then(response => {
            if (response.status !== 200) {
                console.log('Error: ' + response.status)
            }

            // Get the data needed from the response
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

            // Save to local storage
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
            if (response.status !== 200) {
                console.log('Error: ' + response.status)
            }
            // Get the data needed from the response
            const {trackId, artworkUrl600, collectionName, artistName, feedUrl } = response.data.results[0]
            const podcast = {
                id: trackId,
                image: artworkUrl600,
                title: collectionName,
                author: artistName,
                feedUrl: feedUrl
            }
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

            // The data is in XML format, so we need to convert it to JSON
            const json = xml2js(response.data, { compact: true, spaces: 4 })
            const data = json.rss.channel

            // Some of the objects have _cdata and others _text for the same property                  
            const descriptionPodcast = data.description?._text || data['itunes:summary']?._text ||  data.description?._cdata || data['itunes:summary']?._cdata || 'No description found'

            let episodes = []

            // Validate if the data.item is an array or an object, 
            // this case is specific for the podcast with one episode
            if (Array.isArray(data.item)) {
                episodes = data.item.map(episode => {
                    return getEpisodeData(episode)
                })
            } else {
                // We are working with an array, so even we have one episode, we treat it as an array
                episodes = [getEpisodeData(data.item)]
            }

            const detail = {
                description: descriptionPodcast,
                episodes: episodes
            }
            return detail
        })
        .catch(error => {
            console.log('fetchEpisodes ' + error)
        })
}

const getEpisodeData = (episode) => {
    // Some of the objects have _cdata and others _text for the same property or even different name of propperty  
    const titleText = episode.title?._text || episode['itunes:title']?._text || episode.title?._cdata || episode['itunes:title']?._cdata || 'No title found'
    const durationText = episode['itunes:duration']?._text || '-'
    const idText = episode.guid?._text || episode.guid?._cdata || '-'
    const descriptionText = episode.description?._text || episode.description?._cdata || 'No description found'
    const pubDateText = episode.pubDate?._text || episode.pubDate?._cdata || '-'
    const audioText = episode.enclosure?._attributes?.url || ''
    const audioTypeText = episode.enclosure?._attributes?.type || ''

    return {
        id: idText,
        title: titleText,
        pubDate: pubDateText,
        duration: durationText,
        audio: audioText,
        audioType: audioTypeText,
        description: descriptionText
    }
}