import { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { ScrapBtn, Interior } from "./items";

const endPoint = process.env.REACT_APP_API;

const Container = styled.div`
  position: relative;
  width: 1200px;
  margin: 30px auto 0 auto;
`;

const InteriorsBox = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 10px;
`;

class Interiors extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      interiorsForRendering: [],
      interiorsByPage: [],
      isCheckedBookmark: false,
    };
  }

  componentDidMount() {
    this.addInfiniteScrollEvent();
    this.firstRunInfiniteEventWhenWillMount();
  }

  componentWillUnmount() {
    this.removeInfiniteScrollEvent();
  }

  getAndSetInteriorsByPage = async () => {
    const { page } = this.state;

    await axios
      .get(`${endPoint}/page_${page}.json`)
      .then((response) => {
        const { data } = response;

        if (data.length === 0) {
          this.removeInfiniteScrollEvent();
          return;
        }

        const newInteriors = this.state.interiorsByPage.concat(data);

        this.setState({
          interiorsByPage: newInteriors,
          interiorsForRendering: newInteriors,
        });
      })
      .catch((error) => {
        console.log(error);
        this.removeInfiniteScrollEvent();
      });
  };

  firstRunInfiniteEventWhenWillMount = () => {
    this.infiniteScrollEvent();
  };

  addInfiniteScrollEvent = () => {
    window.addEventListener("scroll", this.infiniteScrollEvent);
  };

  removeInfiniteScrollEvent = () => {
    window.removeEventListener("scroll", this.infiniteScrollEvent);
  };

  infiniteScrollEvent = () => {
    const page = this.state.page;

    const { documentElement, body } = document;

    const scrollHeight = Math.max(
      documentElement.scrollHeight,
      body.scrollHeight
    );
    const scrollTop = Math.max(documentElement.scrollTop, body.scrollTop);
    const clientHeight = documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      const newPage = page + 1;
      this.setState(
        {
          page: newPage,
        },
        this.getAndSetInteriorsByPage
      );
    }
  };

  changeBookmarkBtnHandler = ({ target }) => {
    const checked = target.checked;

    this.setState(
      {
        isCheckedBookmark: checked,
      },
      this.setInteriorsByBookmark
    );
  };

  setInteriorsByBookmark = async () => {
    const { isCheckedBookmark } = this.state;

    if (!isCheckedBookmark) {
      this.setInteriorsUserWasLookingAt();
    } else {
      this.setInteriorsBookmarked();
    }
  };

  setInteriorsBookmarked = () => {
    const interiorsFromLocalStorage = this.getInteriorsFromLocalStorage();

    this.setState({
      interiorsForRendering: interiorsFromLocalStorage,
    });
  };

  setInteriorsUserWasLookingAt = () => {
    const { interiorsByPage } = this.state;

    this.setState({
      interiorsForRendering: interiorsByPage,
    });
  };

  getInteriorsFromLocalStorage = () => {
    const interiors = [];
    const localStorage = window.localStorage;
    const lengthOfInterirors = localStorage.length;

    for (let i = 0; i < lengthOfInterirors; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);

      interiors.push(JSON.parse(value));
    }

    return interiors;
  };

  render() {
    const { interiorsForRendering } = this.state;

    return (
      <Container>
        <ScrapBtn changeBookmarkBtnHandler={this.changeBookmarkBtnHandler} />
        <InteriorsBox>
          {interiorsForRendering.map((interior) => {
            return <Interior key={interior.id} data={interior} />;
          })}
        </InteriorsBox>
      </Container>
    );
  }
}

export default Interiors;
