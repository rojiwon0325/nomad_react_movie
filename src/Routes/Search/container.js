import { createSlice } from "@reduxjs/toolkit";
import { movieApi, tvApi } from "api";
import axios from "axios";
import React, { useEffect, useReducer } from "react";
import Presenter from "./presenter";

const search = async (searchTerm) => {
    const list = await axios.all([movieApi.search(searchTerm), tvApi.search(searchTerm)]);
    return list;
}

const initialState = { movieReseults: [], tvResults: [], searchTerm: "", error: null, loading: false };
const reducers = {
    setError(state, action) {
        state.error = action.payload;
        state.loading = false;
    },
    setLoading(state, action) {
        state.loading = action.payload;
    },
    getData(state, action) {
        const { movie, tv } = action.payload;
        state.movieReseults = movie;
        state.tvResults = tv;
        state.error = null;
        state.loading = false;
    },
    setTerm(state, action) {
        state.searchTerm = action.payload;
    }
};

const searchSlice = createSlice({
    name: "searchSlice",
    initialState,
    reducers
});
const Container = () => {
    const { reducer, actions: { getData, setLoading, setError } } = searchSlice;
    const [state, dispatch] = useReducer(reducer, initialState);
    const { movieReseults, tvResults, searchTerm, error, loading } = state;

    useEffect(() => {
        if (searchTerm !== "") {
            dispatch(setLoading(true));
            search(searchTerm)
                .then(([data1, data2]) => {
                    const { data: { results: movie } } = data1;
                    const { data: { results: tv } } = data2;
                    dispatch(getData({ movie, tv }))
                })
                .catch(e => {
                    dispatch(setError(e.message));
                })
        }
    }, [searchTerm]);

    return (<Presenter
        movieReseults={movieReseults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        error={error}
        loading={loading}
    />);
};

export default Container;