import styled from "styled-components";

export const Button = styled.button`
    display: ${props => props.show? "block" : "none"};
    background-color: ${(props) => props.theme.colors.pallet.blue[100]};
    color: ${(props) => props.theme.colors.pallet.neutral[100]};
    border: none;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    &:hover {
        background-color: ${(props) => props.theme.colors.primaryDark};
    }
    &:disabled {
        background-color: ${(props) => props.theme.colors.primaryLight};
        color: ${(props) => props.theme.colors.textLight};
        cursor: not-allowed;
    }
`;
export const ButtonSecondary = styled(Button)`
    background-color: ${(props) => props.theme.colors.secondary};
    &:hover {
        background-color: ${(props) => props.theme.colors.secondaryDark};
    }
`;
export const ButtonTertiary = styled(Button)`
    background-color: ${(props) => props.theme.colors.tertiary};
    &:hover {
        background-color: ${(props) => props.theme.colors.tertiaryDark};
    }
`;
