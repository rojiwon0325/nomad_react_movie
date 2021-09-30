import PropTypes from "prop-types";
import Section from "Components/Section";
import styled from "styled-components";
import Poster from "Components/Poster";

const Container = styled.div`
    padding: 20px;
`;

const Presenter = ({ topRated, airingToday, popular }) => (
    <Container>
        <Section title="TOP RATED" loading={topRated.loading} error={topRated.error}>
            {topRated.results.map(tv => <Poster key={tv.id} tv={tv} />)}
        </Section>
        <Section title="AIRING TODAY" loading={airingToday.loading} error={airingToday.error}>
            {airingToday.results.map(tv => <Poster key={tv.id} tv={tv} />)}
        </Section>
        <Section title="POPULAR" loading={popular.loading} error={popular.error}>
            {popular.results.map(tv => <Poster key={tv.id} tv={tv} />)}
        </Section>
    </Container>
);

Presenter.propTypes = {
    topRated: PropTypes.shape({
        results: PropTypes.array.isRequired,
        isMore: PropTypes.bool.isRequired,
        total_results: PropTypes.number.isRequired,
        error: PropTypes.string,
        loading: PropTypes.bool.isRequired
    }),
    airingToday: PropTypes.shape({
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