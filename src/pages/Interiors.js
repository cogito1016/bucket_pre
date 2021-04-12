import styled from "styled-components";
import { ScrapBtn } from "./items";

const Container = styled.div`
  position: relative;
  width: 1600px;
  margin: 30px auto 0 auto;
  background-color: gray;
`;

const Interiors = () => {
  return (
    <Container>
      <ScrapBtn />
      <div>이미지창고</div>
    </Container>
  );
};

export default Interiors;
