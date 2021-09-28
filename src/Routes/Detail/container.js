import { createSlice } from "@reduxjs/toolkit";
import { movieApi, tvApi } from "api";
import React, { useEffect, useReducer } from "react";
import Presenter from "./presenter";

const initData = async (id, pathname) => {
    const isMovie = pathname.includes("/movie/");
    const result = isMovie ? await movieApi.detail(id) : await tvApi.detail(id);
    return result;
}

const initialState = { result: null, error: null, loading: true };
const reducers = {
    setError(state, action) {
        state.error = action.payload;
        state.loading = false;
    },
    setLoading(state, action) {
        state.loading = action.payload;
    },
    getData(state, action) {
        const { data } = action.payload;
        state.result = data;
        state.error = null;
        state.loading = false;
    },
}

const detailSlice = createSlice({
    name: "detailSlice",
    initialState,
    reducers
})

const Container = (props) => {
    const { location: { pathname }, match: { params: { id } }, history: { push } } = props;
    const { reducer, actions: { getData, setError } } = detailSlice;
    const [state, dispatch] = useReducer(reducer, initialState);
    const { result, error, loading } = state;
    useEffect(() => {
        initData(id, pathname)
            .then((data) => dispatch(getData(data)))
            .catch(e => {
                dispatch(setError(e.message));
                push("/");
            });
    }, []);

    return (<Presenter
        result={result}
        error={error}
        loading={loading}
    />);
};

export default Container;