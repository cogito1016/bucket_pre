import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const USER_DEFAULT_ICON = "/user/user_default_icon.png";

const Container = styled.div`
  position: relative;
  width: 260px;
  height: 310px;
  margin-top: 20px;
`;

const UserBox = styled.div`
  position: relative;
  width: 260px;
  height: 40px;
`;

const InteriorImg = styled.img`
  width: 260px;
  height: 260px;
  margin-top: 10px;
  border-radius: 6px;
`;

const UserIcon = styled.img`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 30px;
  height: 30px;
  border-radius: 30px;
`;

const UserName = styled.label`
  display: block;
  width: 200px;
  height: 40px;
  margin-left: 50px;
  line-height: 40px;
`;

const BookmarkBox = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 30px;
  cursor: pointer;
  color: #bdbcbd;

  &:hover {
    color: #4fc5f0;
  }
`;

const Interior = (props) => {
  const { image_url, nickname, profile_image_url } = props.data;

  return (
    <Container>
      <UserBox>
        <UserIcon
          src={
            profile_image_url === null ? USER_DEFAULT_ICON : profile_image_url
          }
        />
        <UserName>{nickname}</UserName>
      </UserBox>
      <InteriorImg src={image_url} alt="인테리어 이미지" />
      <BookmarkBox>
        <FontAwesomeIcon icon={faBookmark} />
      </BookmarkBox>
    </Container>
  );
};

export default Interior;
