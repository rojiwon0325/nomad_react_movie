import axios from "axios";
import React, { useEffect, useReducer } from "react";
import Presenter from "./presenter";
import { movieApi } from "api";
import { createSlice } from "@reduxjs/toolkit";

const initDatas = async () => {
    const { nowPlaying, upcoming, popular } = movieApi;
    const list = await axios.all([nowPlaying(), upcoming(), popular()]);
    return list;
};

const initialState = { nowPlaying: [], upcoming: [], popular: [], error: null, loading: true };
const reducers = {
    setError(state, action) {
        state.error = action.payload;
        state.loading = false;
    },
    setLoading(state, action) {
        state.loading = action.payload;
    },
    getData(state, action) {
        const { nowPlaying, upcoming, popular } = action.payload;
        state.nowPlaying = nowPlaying;
        state.upcoming = upcoming;
        state.popular = popular;
        state.error = null;
        state.loading = false;
    },
    setNowPlaying(state, action) {
        state.nowPlaying.push(...action.payload);
    },
    setUpcoming(state, action) {
        state.upcoming.push(...action.payload);
    },
    setPopular(state, action) {
        state.popular.push(...action.payload);
    }
};
const movieSlice = createSlice({
    name: "movieSlice",
    initialState,
    reducers
});

const Container = () => {
    const { reducer, actions: { getData, setError } } = movieSlice;
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        initDatas()
            .then(([data1, data2, data3]) => {
                const { data: { results: nowPlaying } } = data1;
                const { data: { results: upcoming } } = data2;
                const { data: { results: popular } } = data3;
                dispatch(getData({ nowPlaying, upcoming, popular }))
            })
            .catch(e => {
                dispatch(setError(e.message));
            })
    }, []);

    const { nowPlaying, upcoming, popular, error, loading } = state;
    return (<Presenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        error={error}
        loading={loading}
    />);
};

export default Container;
