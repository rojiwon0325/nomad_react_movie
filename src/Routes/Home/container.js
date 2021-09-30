import React, { useEffect } from "react";
import { connect } from "react-redux";
import { movieApi } from "api";
import Presenter from "./presenter";
import { setMovieNowPlaying, setMovieUpcoming, setMoviePopular } from "store";

const Container = ({ nowPlaying, upcoming, popular, setNowPlaying, setUpcoming, setPopular }) => {
    const { nowPlaying: getNowPlaying, upcoming: getUpcoming, popular: getPopular } = movieApi;

    useEffect(() => {
        if (nowPlaying.results.length === 0) {
            getNowPlaying()
                .then(({ data: { results, total_results, page } }) => setNowPlaying({ results, page, total_results }))
                .catch(e => setNowPlaying({ error: e.message }));
        }
        if (upcoming.results.length === 0) {
            getUpcoming()
                .then(({ data: { results, total_results, page } }) => setUpcoming({ results, page, total_results }))
                .catch(e => setUpcoming({ error: e.message }));
        }
        if (popular.results.length === 0) {
            getPopular()
                .then(({ data: { results, total_results, page } }) => setPopular({ results, page, total_results }))
                .catch(e => setPopular({ error: e.message }));
        }
    }, []);
    return (<Presenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
    />);
};

const mapStateToProps = (state) => {
    const { movie: { nowPlaying, upcoming, popular } } = state;
    return { nowPlaying, upcoming, popular };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setNowPlaying: (data) => dispatch(setMovieNowPlaying(data)),
        setUpcoming: (data) => dispatch(setMovieUpcoming(data)),
        setPopular: (data) => dispatch(setMoviePopular(data))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Container);
