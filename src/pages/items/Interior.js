import styled from "styled-components";

const USER_DEFAULT_ICON = "/user/user_default_icon.png";

const Container = styled.div`
  position: relative;
  width: 260px;
  height: 310px;
  margin-top: 10px;
  background-color: green;
`;

const UserBox = styled.div`
  position: relative;
  width: 260px;
  height: 40px;
  background-color: pink;
`;

const InteriorImg = styled.img`
  width: 260px;
  height: 260px;
  margin-top: 10px;
  background-color: yellow;
  border-radius: 6px;
`;

const UserIcon = styled.img`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background-color: gray;
`;

const UserName = styled.label`
  display: block;
  width: 200px;
  height: 40px;
  margin-left: 50px;
  line-height: 40px;
  background-color: yellow;
`;

const Interior = () => {
  return (
    <Container>
      <UserBox>
        <UserIcon src={USER_DEFAULT_ICON} />
        <UserName>Wade Warren</UserName>
      </UserBox>
      <InteriorImg src={USER_DEFAULT_ICON} />
    </Container>
  );
};

export default Interior;
