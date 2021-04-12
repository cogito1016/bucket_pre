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
      page: 1,
      interiors: [],
    };
  }

  componentDidMount() {
    this.getAndSetInteriorsByPage();
  }

  getAndSetInteriorsByPage = async () => {
    const { page } = this.state;

    await axios
      .get(`${endPoint}/page_${page}.json`)
      .then((response) => {
        const interiors = response.data;

        console.log(interiors);

        this.setState({
          interiors: interiors,
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
