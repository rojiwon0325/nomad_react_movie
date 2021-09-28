import React, { useEffect, useReducer } from "react";
import axios from "axios";
import Presenter from "./presenter";
import { tvApi } from "api";
import { createSlice } from "@reduxjs/toolkit";

const initDatas = async () => {
    const { topRated, airingToday, popular } = tvApi;
    const list = await axios.all([topRated(), airingToday(), popular()]);
    return list;
};

const initialState = { topRated: [], airingToday: [], popular: [], error: null, loading: true };
const reducers = {
    setError(state, action) {
        state.error = action.payload;
        state.loading = false;
    },
    setLoading(state, action) {
        state.loading = action.payload;
    },
    getData(state, action) {
        const { topRated, airingToday, popular } = action.payload;
        state.topRated = topRated;
        state.airingToday = airingToday;
        state.popular = popular;
        state.error = null;
        state.loading = false;
    },
    setToprated(state, action) {
        state.topRated.push(...action.payload);
    },
    setAiringToday(state, action) {
        state.airingToday.push(...action.payload);
    },
    setPopular(state, action) {
        state.popular.push(...action.payload);
    }
};

const tvSlice = createSlice({
    name: "tvSlice",
    initialState,
    reducers
});

const Container = () => {
    const { reducer, actions: { getData, setError } } = tvSlice;
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        initDatas()
            .then(([data1, data2, data3]) => {
                const { data: { results: topRated } } = data1;
                const { data: { results: airingToday } } = data2;
                const { data: { results: popular } } = data3;
                dispatch(getData({ topRated, airingToday, popular }))
            }).catch(e => {
                dispatch(setError(e.message));
            })
    }, []);

    const { topRated, airingToday, popular, error, loading } = state;
    return (<Presenter
        topRated={topRated}
        airingToday={airingToday}
        popular={popular}
        error={error}
        loading={loading}
    />);
};

export default Container;