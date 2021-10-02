import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Image = styled.div`
    background-image:url(${props => props.bgUrl});
    height: 180px;
    background-size: cover;
    background-position: center center;
`;

const Container = styled.div`
    font-size: 12px;
    border-radius: 5px;
    background-color: white;
    color: black;
    height: 210px;
    flex: none;
    overflow: hidden;
    position: relative;
    transition: transform 0.1s linear;
    &:hover{
        transform: scale(1.1);
        box-shadow: 0px 0px 15px white;
        z-index: 10;
    }
    padding-bottom: 5px;
`;

const Rating = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 3px double greenyellow;
    background-color: black;
    color: white;
    font-weight: bold;
    font-size: 12px;
    box-sizing: border-box;

    position: absolute;
    top: 2px;
    left: 2px;
    text-align: center;
    line-height: 24.5px;

    user-select: none;
`;

const Title = styled.div`
    box-sizing: border-box;
    margin-top: 5px;
    margin-bottom: 3px;
    padding: 0 5px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: bold;
    user-select: none;
`;

const Year = styled.div`
    box-sizing: border-box;
    padding: 0 5px;
    width: 100%;
    font-size: 11px;
    color: rgba(0,0,0,0.7);
    user-select: none;
`;

const Poster = ({ movie, tv }) => {
    const { id, poster_path, vote_average } = movie ?? tv;
    const title = movie?.title ?? tv.name;
    const date = movie?.release_date ?? tv.first_air_date;
    const link = movie ? `/movie/${id}` : `/show/${id}`;
    if (movie || tv) {
        return (
            <Link to={link}>
                <Container title={title}>
                    <Image bgUrl={poster_path ? `https://image.tmdb.org/t/p/w300${poster_path}` : require("Image/noPosterSmall.png").default}>
                        <Rating>{vote_average}</Rating>
                    </Image>
                    <Title>{title}</Title>
                    <Year>{date}</Year>
                </Container>
            </Link>
        );
    } else {
        return (
            <Container>
                <Image bgUrl={require("Image/noPosterSmall.png").default}>
                    <Rating></Rating>
                </Image>
                <Title></Title>
                <Year></Year>
            </Container>
        );
    }

};

Poster.propTypes = {
    movie: PropTypes.object,
    tv: PropTypes.object
};

export default Poster;