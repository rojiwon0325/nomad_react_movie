import React from "react";
import { connect } from "react-redux";
import { movieApi, tvApi } from "api";
import Presenter from "./presenter";
import { searchLoading, searchMovie, searchTV } from "store";

const Container = ({ location, search, searchMovie, searchTV, searchLoading }) => {
    const { term: searchTerm, movie, tv } = search;

    const handleSubmit = (e) => {
        searchLoading({ target: "all", loading: true });
        e.preventDefault();
        const term = e.target[0].value;
        movieApi.search(term)
            .then(({ data: { results } }) => searchMovie({ term, results }))
            .catch(e => searchMovie({ error: e.message }));
        tvApi.search(term)
            .then(({ data: { results } }) => searchTV({ term, results }))
            .catch(e => searchTV({ error: e.message }));
        return;
    };

    return (<Presenter
        movie={movie}
        tv={tv}
        searchTerm={searchTerm}
        handleSubmit={handleSubmit}
    />);
};

const mapStateToProps = (state) => {
    const { search } = state;
    return { search };
};
const mapDispatchToProps = (dispatch) => {
    return {
        searchLoading: (data) => dispatch(searchLoading(data)),
        searchMovie: (data) => dispatch(searchMovie(data)),
        searchTV: (data) => dispatch(searchTV(data))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Container);
