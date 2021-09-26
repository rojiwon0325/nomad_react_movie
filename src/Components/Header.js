import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    z-index: 10;

    width: 100%;
    height: 50px;

    background-color: rgba(20,20,20,0.8);
`;
const List = styled.ul`
    display: flex;
`;
const Item = styled.li`
    width: 80px;
    height: 50px;
    box-sizing: border-box;
    text-align: center;
    border-bottom: 3px solid ${props => (props.current ? "#3498db" : "transparent")};
transition: border-bottom 0.3s ease-in-out;
`;
const SLink = styled(Link)`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;

    font-size: 1.3em;
    font-weight: bold;
`;

export default withRouter(({ location: { pathname } }) => (
    <Header>
        <List>
            <Item current={pathname === "/"}>
                <SLink to="/">Movies</SLink>
            </Item>
            <Item current={pathname === "/tv"}>
                <SLink to="/tv">TV</SLink>
            </Item>
            <Item current={pathname === "/search"}>
                <SLink to="/search">Search</SLink>
            </Item>
        </List>
    </Header>
));