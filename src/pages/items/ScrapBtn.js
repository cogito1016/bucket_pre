import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 150px;
`;

const CheckBox = styled.input`
  margin: 0;
  width: 15px;
  height: 15px;
  margin-right: 5px;
`;

const ScrapBtnDescriptionLabel = styled.label`
  user-select: none;
`;

const ScrapBtn = (props) => {
  const { changeBookmarkBtnHandler } = props;

  return (
    <Container>
      <CheckBox
        type="checkbox"
        onChange={(e) => {
          changeBookmarkBtnHandler(e);
        }}
      />
      <ScrapBtnDescriptionLabel>스크랩한 것만 보기</ScrapBtnDescriptionLabel>
    </Container>
  );
};

export default ScrapBtn;
