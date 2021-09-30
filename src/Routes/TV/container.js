import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setTVTopRated, setTVAiringToday, setTVPopular } from "store";
import { tvApi } from "api";
import Presenter from "./presenter";

const Container = ({ topRated, airingToday, popular, setTopRated, setAiringToday, setPopular }) => {
    const { topRated: getTopRated, airingToday: getAiringToday, popular: getPopular } = tvApi;
    useEffect(() => {
        if (topRated.results.length === 0) {
            getTopRated()
                .then(({ data: { results, total_results, page } }) => setTopRated({ results, page, total_results }))
                .catch(e => setTopRated({ error: e.message }));
        }
        if (airingToday.results.length === 0) {
            getAiringToday()
                .then(({ data: { results, total_results, page } }) => setAiringToday({ results, page, total_results }))
                .catch(e => setAiringToday({ error: e.message }));
        }
        if (popular.results.length === 0) {
            getPopular()
                .then(({ data: { results, total_results, page } }) => setPopular({ results, page, total_results }))
                .catch(e => setPopular({ error: e.message }));
        }
    }, []);
    return (<Presenter
        topRated={topRated}
        airingToday={airingToday}
        popular={popular}
    />);
};

const mapStateToProps = (state) => {
    const { tv: { topRated, airingToday, popular } } = state;
    return { topRated, airingToday, popular };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setTopRated: (data) => dispatch(setTVTopRated(data)),
        setAiringToday: (data) => dispatch(setTVAiringToday(data)),
        setPopular: (data) => dispatch(setTVPopular(data))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Container);
