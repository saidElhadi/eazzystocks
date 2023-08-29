import styled from "styled-components";
export const ChartContainer = styled.div`
  width: 80%;
  height: 200px;
  margin: 0 auto;
  overflow-x: scroll;
  overflow-y: hidden;
  direction: rtl;
`;
export const InfoContainer = styled.div`
  height: 80px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  overflow: hidden;
  padding: 0 1rem;

`;


export const Logo = styled.img`
  border-radius: 50%;
  width: 45px;
`;
export const CompanyName = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;



export const InfoContainerPrices = styled(InfoContainer)`
    height: 60px;
    justify-content: space-evenly;
    padding: 0 1rem;
    margin:0;
`
export const PreviewChange = styled.div`
  min-width: 50px;
  max-height: 30px;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.card.text};
  border-radius: 5px;
  height: 60%;
  width: auto;
  padding: 0 0.1rem 0 0.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const PreviewChangePercent = styled(PreviewChange)`
  color: ${(props) =>
    props.up
      ? props.theme.colors.pallet.green[500]
      : props.theme.colors.pallet.red[500]};
    background-color: ${(props) =>
      props.up  ? props.theme.colors.pallet.green[50]
      : props.theme.colors.pallet.red[50]};
`;
export const PreviewChangePrice = styled(PreviewChange)`
  color: ${(props) => props.theme.colors.pallet.neutral[400]};
`;
export const PreviewPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.card.text};
  border-radius: 5px;
  height: 60%;
  width: auto;
  padding: 0 0.1rem 0 0.1rem;
  display: flex;
  align-items: center;
`;
