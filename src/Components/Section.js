import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader"
import Error from "Components/Error";

const Container = styled.div`
    :not(:last-child){
        padding-bottom: 20px;
        border-bottom: 3px solid rgba(255,255,255,0.5);
        margin-bottom: 10px;
    }
    font-size: 10px;
    margin-bottom: 20px;
`;

const Title = styled.div`
    width: 100%;
    background-color: rgba(255,255,255,0.1);
    font-weight: bold;
    font-size: 1.8em;
    padding: 10px 0px;
    margin-bottom: 15px;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 125px);
    grid-gap: 25px;
`;

const Section = ({ title, children, loading, error }) => {
    if (loading) {
        return (
            <Container>
                <Title>{title}</Title>
                <Loader />
            </Container>
        )
    } else if (error) {
        return (<Container>
            <Title>{title}</Title>
            <Error color="red" text={error} />
        </Container>)
    }
    if (Array.isArray(children) && children.length === 0) {
        return (
            <Container>
                <Title>{title}</Title>
                <Error color="white" text="Nothing Found" />
            </Container>
        );
    }
    return (
        <Container>
            <Title>{title}</Title>
            <Grid>{children}</Grid>
        </Container>
    )
};

Section.propType = {
    title: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default Section;