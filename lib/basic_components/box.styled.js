import styled from "styled-components";

export const Box = styled.div`
  width: ${(props) =>
    props.theme.units.size[props.width ? props.width : "full"]};
  height: ${(props) =>
    props.theme.units.size[props.height ? props.height : "full"]};
  border-radius: ${(props) =>
    props.theme.units.radius[props.radius ? props.radius : "default"]};
`;
