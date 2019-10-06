import styled from 'styled-components';

export const Container = styled.div`
    user-select: text;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: 1;
`;

export const Image = styled.img`
    max-width: 100%;
`;
