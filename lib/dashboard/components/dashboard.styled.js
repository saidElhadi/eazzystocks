import styled from "styled-components";

export const Container = styled.div`
    background-color: ${(props) => props.theme.colors.pallet.neutral[100]};
    color: ${(props) => props.theme.colors.pallet.neutral[800]};
    overflow: hidden;
`;
