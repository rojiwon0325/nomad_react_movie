import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        api_key: "de6f8c9854a0346d8c7a2f190484216e",
        language: "KR"
    }
});

export const movieApi = {
    nowPlaying: (page = 1) => api.get("movie/now_playing", { params: { page } }),
    upcoming: (page = 1) => api.get("movie/upcoming", { params: { page } }),
    popular: (page = 1) => api.get("movie/popular", { params: { page } }),
    detail: (id) => api.get(`movie/${id}`, {
        params: {
            append_to_respnse: "videos"
        }
    }),
    search: (term, page = 1) => api.get("search/movie", {
        params: {
            query: term,
            page
        }
    })
};

export const tvApi = {
    airingToday: (page = 1) => api.get("tv/airing_today", { params: { page } }),
    topRated: (page = 1) => api.get("tv/top_rated", { params: { page } }),
    popular: (page = 1) => api.get("tv/popular", { params: { page } }),
    detail: (id) => api.get(`tv/${id}`, {
        params: {
            append_to_respnse: "videos"
        }
    }),
    search: (term, page = 1) => api.get("search/tv", {
        params: {
            query: term,
            page
        }
    })
};