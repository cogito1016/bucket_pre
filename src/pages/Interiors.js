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
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 10px;
`;

class Interiors extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      interiors: [],
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

        const newInteriors = this.state.interiors.concat(data);

        this.setState({
          interiors: newInteriors,
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

  render() {
    const { interiors } = this.state;
    return (
      <Container>
        <ScrapBtn />
        <InteriorsBox>
          {interiors.map((interior) => {
            return <Interior key={interior.id} data={interior} />;
          })}
        </InteriorsBox>
      </Container>
    );
  }
}

export default Interiors;
