import PropTypes from "prop-types";
import Section from "Components/Section";
import styled from "styled-components";
import Poster from "Components/Poster";

const Container = styled.div`
    padding: 0px 20px;
`;

const Form = styled.form`
    margin-top: 10px;
    margin-bottom: 20px;
    width: 100%;
`;

const Input = styled.input`
    all: unset;
    font-size: 28px;
    width: 100%;
`;

const Presenter = ({ movie, tv, searchTerm, handleSubmit }) => (
    <Container>
        <Form onSubmit={handleSubmit}>
            <Input placeholder="Search" defaultValue={searchTerm} />
        </Form>
        <Section title="MOVIE" loading={movie.loading} error={movie.error}>
            {movie.results.map(movie => <Poster key={movie.id} movie={movie} />)}
        </Section>
        <Section title="TV" loading={tv.loading} error={tv.error}>
            {tv.results.map(show => <Poster key={show.id} tv={show} />)}
        </Section>
    </Container>);

Presenter.propTypes = {
    movie: PropTypes.shape({
        results: PropTypes.array.isRequired,
        error: PropTypes.string,
        loading: PropTypes.bool.isRequired
    }),
    tv: PropTypes.shape({
        results: PropTypes.array.isRequired,
        error: PropTypes.string,
        loading: PropTypes.bool.isRequired
    }),
    searchTerm: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default Presenter;