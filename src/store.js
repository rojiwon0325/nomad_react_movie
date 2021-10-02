const { createSlice, configureStore } = require("@reduxjs/toolkit");

const initialState = {
    movie: {
        nowPlaying: { results: [], isMore: true, total_results: 0, error: null, loading: true },
        upcoming: { results: [], isMore: true, total_results: 0, error: null, loading: true },
        popular: { results: [], isMore: true, total_results: 0, error: null, loading: true },
    },
    tv: {
        topRated: { results: [], isMore: true, total_results: 0, error: null, loading: true },
        airingToday: { results: [], isMore: true, total_results: 0, error: null, loading: true },
        popular: { results: [], isMore: true, total_results: 0, error: null, loading: true }
    },
    search: {
        term: "",
        movie: { results: [], error: null, loading: false },
        tv: { results: [], error: null, loading: false },
    },
    detail: {
        movie: null,
        tv: null
    }
};
const reducers = {
    setMovieLoading(state, action) {
        const { target, loading } = action.payload;
        const { movie } = state;
        if (target === "nowPlaying") {
            movie.nowPlaying.loading = loading;
        } else if (target === "upcoming") {
            movie.upcoming.loading = loading;
        } else if (target === "popular") {
            movie.popular.loading = loading;
        } else if (target === "all") {
            movie.nowPlaying.loading = loading;
            movie.upcoming.loading = loading;
            movie.popular.loading = loading;
        }
    },
    setMovieNowPlaying(state, action) {
        const { results, page, total_results, error } = action.payload;
        const { movie } = state;
        if (error) {
            movie.nowPlaying.error = error;
            movie.nowPlaying.loading = false;
            return;
        } else if (!(results && page && total_results)) {
            movie.nowPlaying.error = "Invalid Data";
            movie.nowPlaying.loading = false;
            return;
        }
        movie.nowPlaying.error = null;
        if (page === 1) {
            movie.nowPlaying.results = results;
        } else {
            movie.nowPlaying.results.push(...results);
        }
        movie.nowPlaying.total_results = total_results;
        movie.nowPlaying.isMore = movie.nowPlaying.results.length < total_results ? true : false;
        movie.nowPlaying.loading = false;
        return;
    },
    setMovieUpcoming(state, action) {
        const { results, page, total_results, error } = action.payload;
        const { movie } = state;
        if (error) {
            movie.upcoming.error = error;
            movie.upcoming.loading = false;
            return;
        } else if (!(results && page && total_results)) {
            movie.upcoming.error = "Invalid Data";
            movie.upcoming.loading = false;
            return;
        }

        movie.upcoming.error = null;
        if (page === 1) {
            movie.upcoming.results = results;
        } else {
            movie.upcoming.results.push(...results);
        }
        movie.upcoming.total_results = total_results;
        movie.upcoming.isMore = movie.upcoming.results.length < total_results ? true : false;
        movie.upcoming.loading = false;
    },
    setMoviePopular(state, action) {
        const { results, page, total_results, error } = action.payload;
        const { movie } = state;
        if (error) {
            movie.popular.error = error;
            movie.popular.loading = false;
            return;
        } else if (!(results && page && total_results)) {
            movie.popular.error = "Invalid Data";
            movie.popular.loading = false;
            return;
        }
        movie.popular.error = null;
        if (page === 1) {
            movie.popular.results = results;
        } else {
            movie.popular.results.push(...results);
        }
        movie.popular.total_results = total_results;
        movie.popular.isMore = movie.popular.results.length < total_results ? true : false;
        movie.popular.loading = false;
    },
    setTVLoading(state, action) {
        const { target, loading } = action.payload;
        const { tv } = state;
        if (target === "topRated") {
            tv.topRated.loading = loading;
        } else if (target === "airingToday") {
            tv.airingToday.loading = loading;
        } else if (target === "popular") {
            tv.popular.loading = loading;
        } else if (target === "all") {
            tv.topRated.loading = loading;
            tv.airingToday.loading = loading;
            tv.popular.loading = loading;
        }
    },
    setTVTopRated(state, action) {
        const { results, page, total_results, error } = action.payload;
        const { tv } = state;
        if (error) {
            tv.topRated.error = error;
            tv.topRated.loading = false;
            return;
        } else if (!(results && page && total_results)) {
            tv.topRated.error = "Invalid Data";
            tv.topRated.loading = false;
            return;
        }
        tv.topRated.error = null;
        if (page === 1) {
            tv.topRated.results = results;
        } else {
            tv.topRated.results.push(...results);
        }
        tv.topRated.total_results = total_results;
        tv.topRated.isMore = tv.topRated.results.length < total_results ? true : false;
        tv.topRated.loading = false;
        return;
    },
    setTVAiringToday(state, action) {
        const { results, page, total_results, error } = action.payload;
        const { tv } = state;
        if (error) {
            tv.airingToday.error = error;
            tv.airingToday.loading = false;
            return;
        } else if (!(results && page && total_results)) {
            tv.airingToday.error = "Invalid Data";
            tv.airingToday.loading = false;
            return;
        }

        tv.airingToday.error = null;
        if (page === 1) {
            tv.airingToday.results = results;
        } else {
            tv.airingToday.results.push(...results);
        }
        tv.airingToday.total_results = total_results;
        tv.airingToday.isMore = tv.airingToday.results.length < total_results ? true : false;
        tv.airingToday.loading = false;
    },
    setTVPopular(state, action) {
        const { results, page, total_results, error } = action.payload;
        const { tv } = state;
        if (error) {
            tv.popular.error = error;
            tv.popular.loading = false;
            return;
        } else if (!(results && page && total_results)) {
            tv.popular.error = "Invalid Data";
            tv.popular.loading = false;
            return;
        }
        tv.popular.error = null;
        if (page === 1) {
            tv.popular.results = results;
        } else {
            tv.popular.results.push(...results);
        }
        tv.popular.total_results = total_results;
        tv.popular.isMore = tv.popular.results.length < total_results ? true : false;
        tv.popular.loading = false;
    },
    searchLoading(state, action) {
        const { target, loading } = action.payload;
        const { search: { movie, tv } } = state;
        if (target === "movie") {
            movie.loading = loading;
        } else if (target === "tv") {
            tv.loading = loading;
        } else if (target === "all") {
            movie.loading = loading;
            tv.loading = loading;
        }
    },
    searchMovie(state, action) {
        const { search, search: { movie } } = state;
        const { term, results, error, loading } = action.payload;
        if (loading) {
            movie.loading = true;
            return;
        } else if (error) {
            movie.error = error;
            movie.loading = false;
            return;
        } else if (!((term || term === "") && results)) {
            movie.error = "Invalid Data";
            movie.loading = false;
            return;
        }
        search.term = term;
        movie.results = results;
        movie.error = null;
        movie.loading = false;
        return;
    },
    searchTV(state, action) {
        const { search, search: { tv } } = state;
        const { term, results, error, loading } = action.payload;
        if (loading) {
            tv.loading = true;
            return;
        } else if (error) {
            tv.error = error;
            tv.loading = false;
            return;
        } else if (!((term || term === "") && results)) {
            tv.error = "Invalid Data";
            tv.loading = false;
            return;
        }
        search.term = term;
        tv.results = results;
        tv.error = null;
        tv.loading = false;
        return;
    },
    setDetail(state, action) {
        const { detail } = state;
        const { movie, tv } = action.payload;
        detail.movie = movie ?? null;
        detail.tv = tv ?? null;
        return;
    }
};
const slice = createSlice({
    name: "WEBFLIXSLICE",
    initialState,
    reducers
});

export const { setMovieLoading, setMovieNowPlaying, setMoviePopular, setMovieUpcoming } = slice.actions;
export const { setTVLoading, setTVTopRated, setTVAiringToday, setTVPopular } = slice.actions;
export const { searchLoading, searchMovie, searchTV } = slice.actions;
export const { setDetail } = slice.actions;
export default configureStore({ reducer: slice.reducer });