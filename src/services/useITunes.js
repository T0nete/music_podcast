import axios from 'axios'
import { xml2js } from 'xml-js'
import { refreshPodcasts, refreshPodcastDetails} from '../utils/utils'

const numberOfPodcast = 100
const genreId = 1310

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

    if (refreshPodcastDetails(id)) {
        console.log('refreshPodcastDetails ' + refreshPodcastDetails())
        podcast = await fetchMusicPodcastById(id)
        episodes = await fetchEpisodes(podcast.feedUrl)

        podcast = {
            ...podcast,
            description: episodes.description,
            episodes: episodes.episodes
        }

        localStorage.setItem(`podcastsDate_${id}`, new Date().getTime())
        localStorage.setItem(`podcast_${id}`, JSON.stringify(podcast))
    } else {
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
            if (response.status !== 200) {
                console.log('Error: ' + response.status)
            }
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
            const json = xml2js(response.data, { compact: true, spaces: 4 })
            const data = json.rss.channel

            // Some of the objects have _cdata and others _text for the same property                  
            const descriptionPodcast = data.description?._text || data['itunes:summary']?._text ||  data.description?._cdata || data['itunes:summary']?._cdata || 'No description found'
            // console.log(data.item)

            let episodes = []
            // Validate if the data.item is an array or an object
            if (Array.isArray(data.item)) {
                episodes = data.item.map(episode => {
                    return getEpisodeData(episode)
                })
            } else {
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

    return {
        id: idText,
        title: titleText,
        pubDate: episode.pubDate._text,
        duration: durationText,
        audio: episode.enclosure._attributes.url,
        audioType: episode.enclosure._attributes.type,
        description: descriptionText
    }
}