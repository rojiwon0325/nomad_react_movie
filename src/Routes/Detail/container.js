import { movieApi, tvApi } from "api";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setDetail } from "store";
import Presenter from "./presenter";

const Container = (props) => {
    const { location: { pathname }, match: { params: { id } }, detail, setDetail } = props;
    const [movie, setMovie] = useState(null);
    const [tv, setTV] = useState(null);

    useEffect(() => {
        const isMovie = pathname.includes("/movie/");
        if (isMovie) {
            if (detail.movie?.id === id) {
                setMovie(detail.movie);
                return;
            }
            movieApi.detail(id)
                .then(({ data }) => {
                    setDetail({ movie: data });
                    setMovie(data);
                })
                .catch(console.log)
        } else {
            if (detail.tv?.id === id) {
                setTV(detail.tv);
                return;
            }
            tvApi.detail(id)
                .then(({ data }) => {
                    setDetail({ tv: data });
                    setTV(data);
                })
                .catch(console.log)
        }
    }, []);
    return <Presenter
        movie={movie}
        tv={tv}
    />;
};


const mapStateToProps = (state) => {
    return { detail: state.detail };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setDetail: (data) => dispatch(setDetail(data))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Container);
