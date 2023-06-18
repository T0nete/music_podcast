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
            let descriptionText

            if (data.description && data.description._text) {
                descriptionText = data.description._text;
            } else if (data.description && data.description._cdata) {
                descriptionText = data.description._cdata;
            } else {
                descriptionText = 'No description found'
            }

            const detail = {
                description: descriptionText,
                episodes: data.item.map(episode => {
                    let titleText
                    let durationText

                    // Some of the objects have the property title and others itunes:title for the same property
                    if (episode.title && episode.title._text) {
                        titleText = episode.title._text
                    } else if (episode['itunes:title'] && episode['itunes:title']._text) {
                        titleText = episode['itunes:title']._text
                    } else {
                        titleText = 'No title found'
                    }
                    
                    // Some of the objects have the property itunes:duration and others don't have
                    if (episode['itunes:duration'] && episode['itunes:duration']._text) {
                        durationText = episode['itunes:duration']._text
                    } else {
                        durationText = '-'
                    }

                    return {
                        title: titleText,
                        pubDate: episode.pubDate._text,
                        duration: durationText
                    }
                })
            }
            return detail
        })
        .catch(error => {
            console.log('fetchEpisodes ' + error)
        })
}