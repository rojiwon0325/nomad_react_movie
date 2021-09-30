import PropTypes from "prop-types";
import Section from "Components/Section";
import styled from "styled-components";
import Poster from "Components/Poster";

const Container = styled.div`
    padding: 20px;
`;

const Presenter = ({ nowPlaying, upcoming, popular }) => (
    <Container>
        <Section title="NOW PLAYING" loading={nowPlaying.loading} error={nowPlaying.error}>
            {nowPlaying.results.map(movie => <Poster key={movie.id} movie={movie} />)}
        </Section>
        <Section title="UPCOMING" loading={upcoming.loading} error={upcoming.error}>
            {upcoming.results.map(movie => <Poster key={movie.id} movie={movie} />)}
        </Section>
        <Section title="POPULAR" loading={popular.loading} error={popular.error}>
            {popular.results.map(movie => <Poster key={movie.id} movie={movie} />)}
        </Section>
    </Container>
);

Presenter.propTypes = {
    nowPlaying: PropTypes.shape({
        results: PropTypes.array.isRequired,
        isMore: PropTypes.bool.isRequired,
        total_results: PropTypes.number.isRequired,
        error: PropTypes.string,
        loading: PropTypes.bool.isRequired
    }),
    upcoming: PropTypes.shape({
        results: PropTypes.array.isRequired,
        isMore: PropTypes.bool.isRequired,
        total_results: PropTypes.number.isRequired,
        error: PropTypes.string,
        loading: PropTypes.bool.isRequired
    }),
    popular: PropTypes.shape({
        results: PropTypes.array.isRequired,
        isMore: PropTypes.bool.isRequired,
        total_results: PropTypes.number.isRequired,
        error: PropTypes.string,
        loading: PropTypes.bool.isRequired
    }),
}

export default Presenter;