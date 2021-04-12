import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 150px;
  background-color: yellow;
`;

const CheckBox = styled.input`
  margin: 0;
  width: 15px;
  height: 15px;
  margin-right: 5px;
`;

const ScrapBtn = () => {
  return (
    <Container>
      <CheckBox type="checkbox" />
      <label>스크랩한 것만 보기</label>
    </Container>
  );
};

export default ScrapBtn;
