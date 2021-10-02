import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

const Container = styled.div`
  height: calc(100vh - 47px);
  width: 100%;
  padding: 50px;
  box-sizing: border-box;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(2px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.img`
    border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  margin-top: 5px;
  font-size: 32px;
  font-weight: bold;
  padding-left: 10px;
`;

const ItemContainer = styled.div`
  margin-bottom: 20px;
`;

const List = styled.ul`
    padding-left: 10px;
    font-size: 15px;
`;
const Subject = styled.h5`
    font-size: 20px;
    padding: 10px 0;
    padding-left: 10px;
    &:first-child{
        padding-bottom: 0;
    }
`;
const Item = styled.li`
    font-size: 15px;
    list-style-type: disc;
    list-style-position: inside;
`;

const Overview = styled.p`
  font-size: 15px;
  padding-left: 10px;
`;

const LinkW = styled.div`
    width: 100%;
    text-align: center;
`;

const Link = styled.a`
    font-size: 20px;
`;

const Presenter = ({ movie, tv }) => {
    if (movie || tv) {
        console.log(movie);
        console.log(tv);
        const { backdrop_path, poster_path, genres, overview, homepage } = movie ?? tv;
        const title = movie?.original_title ?? tv.original_name;
        const date = movie?.release_date ?? tv.first_air_date;
        const runtime = movie?.runtime ?? tv.episode_run_time;
        return (
            <Container>
                <Helmet>
                    <title>{`${title} | WEBFLIX`}</title>
                </Helmet>
                <Backdrop
                    bgImage={
                        backdrop_path ? `https://image.tmdb.org/t/p/original${backdrop_path}`
                            : (poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : "")
                    }
                />
                <Content>
                    <Cover
                        src={
                            poster_path
                                ? `https://image.tmdb.org/t/p/original${poster_path}`
                                : require("Image/noPosterSmall.png").default
                        }
                        crossorigin
                    />
                    <Data>
                        <Title>{title}</Title>
                        <ItemContainer>
                            <Subject>{movie ? "Release Date : " : "First Air Date : "}{date}</Subject>
                            <Subject>Runtime</Subject>
                            <List>
                                {Array.isArray(runtime)
                                    ? runtime.map((time, idx) => <Item>{`ep${idx + 1} : ${time} min`}</Item>)
                                    : runtime + " min"
                                }
                            </List>
                            <Subject>Genres</Subject>
                            <List>
                                {genres?.map((genre) => <Item key={genre.id}>{genre.name}</Item>)}
                            </List>
                            <Subject>Overview</Subject>
                            <Overview>{overview}</Overview>
                        </ItemContainer>
                        <LinkW>{homepage ? <Link href={homepage}>👉 HOMEPAGE 👈</Link> : ""}</LinkW>
                    </Data>
                </Content>
            </Container >

        );
    } else {
        return (
            <Container>
                <Helmet>
                    <title>WEBFLIX</title>
                </Helmet>
                <Backdrop
                    bgImage=""
                />
                <Content>
                    <Cover src={require("Image/noPosterSmall.png").default} />
                    <Data>
                        <Title></Title>
                        <ItemContainer>
                            <Subject>Date</Subject>
                            <Subject>Runtime</Subject>
                            <List></List>
                            <Subject>Genres</Subject>
                            <List></List>
                            <Subject>Overview</Subject>
                            <Overview></Overview>
                        </ItemContainer>
                    </Data>
                </Content>
            </Container>
        );
    }
};


export default Presenter;