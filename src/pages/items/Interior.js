import { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkClicked } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

const USER_DEFAULT_ICON = "/user/user_default_icon.png";

const Container = styled.div`
  position: relative;
  width: 260px;
  height: 310px;
  margin: 20px 20px 0 20px;
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
  user-select: none;
`;

const UserIcon = styled.img`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  user-select: none;
`;

const UserName = styled.label`
  display: block;
  width: 200px;
  height: 40px;
  margin-left: 50px;
  line-height: 40px;
  user-select: none;
`;

const BookmarkBox = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 30px;
  cursor: pointer;
`;

const UncheckedBox = styled.div`
  color: #bdbcbd;
  &:hover {
    color: #4fc5f0;
  }
`;

const CheckedBox = styled.div`
  color: #4fc5f0;
`;

class Interior extends Component {
  constructor(props) {
    super(props);
    this.state = { interior: props.data, isBookmark: false };
  }

  componentDidMount() {
    this.getAndSetIsBookmark();
  }

  getAndSetIsBookmark = () => {
    const { interior } = this.state;
    const isBookmark = this.isExistInLocalStorage(interior);
    this.setState({
      isBookmark: isBookmark,
    });
  };

  bookmarkBtnHandler = (interior) => {
    if (this.isExistInLocalStorage(interior)) {
      this.removeDataFromLocalStorage(interior);
    } else {
      this.appendDataToLocalStorage(interior);
    }

    this.toggleIsBook();
  };

  toggleIsBook = () => {
    const isBookMarkToggled = !this.state.isBookmark;
    this.setState({
      isBookmark: isBookMarkToggled,
    });
  };

  appendDataToLocalStorage = (interior) => {
    window.localStorage.setItem(interior.id, JSON.stringify(interior));
  };

  removeDataFromLocalStorage = (interior) => {
    window.localStorage.removeItem(interior.id);
  };

  isExistInLocalStorage = (interior) => {
    return window.localStorage.getItem(interior.id) !== null ? true : false;
  };

  render() {
    const { interior, isBookmark } = this.state;
    const { image_url, nickname, profile_image_url } = interior;

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
          {isBookmark ? (
            <CheckedBox>
              <FontAwesomeIcon
                onClick={() => this.bookmarkBtnHandler(interior)}
                icon={faBookmarkClicked}
              />
            </CheckedBox>
          ) : (
            <UncheckedBox>
              <FontAwesomeIcon
                onClick={() => this.bookmarkBtnHandler(interior)}
                icon={faBookmark}
              />
            </UncheckedBox>
          )}
        </BookmarkBox>
      </Container>
    );
  }
}

export default Interior;
