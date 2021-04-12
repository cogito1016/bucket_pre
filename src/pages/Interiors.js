import styled from "styled-components";
import { ScrapBtn, Interior } from "./items";

const Container = styled.div`
  position: relative;
  width: 1200px;
  margin: 30px auto 0 auto;
  background-color: gray;
`;

const InteriorsBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 10px;
  background-color: blue;
`;

const Interiors = () => {
  return (
    <Container>
      <ScrapBtn />
      <InteriorsBox>
        <Interior />
        <Interior />
        <Interior />
        <Interior />
        <Interior />
      </InteriorsBox>
    </Container>
  );
};

export default Interiors;
