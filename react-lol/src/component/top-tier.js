import React from 'react'
import ReactHtmlParser from 'react-html-parser';
import { Col, Row, Card, Spinner } from 'react-bootstrap'

const styles = {
  color: "#EFEFEF"
}

class TopTier extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    this.getRes()
  }

  async getRes() {
    let url = "http://localhost:4000/toptier"
    let res = await fetch(url, { method: "GET" })
    var response = await res.json()
    response = ReactHtmlParser(response.body)
    this.getDiv(response)
  }

  getDiv(response) {
    var winrate = []
    let lane = ["Top", "Jungle", "Mid", "Bottom", "Support"]
    for (var i = 0; i < 5; i++) {
      let elem = {};
      let champ = response[3]
        .props.children[5]
        .props.children[1]
        .props.children[4]
        .props.children[3]
        .props.children[0]
        .props.children[5]
        .props.children[0]
        .props.children[1]
        .props.children[0]
        .props.children[0]
        .props.children[0]
        .props.children[1]
        .props.children[2 + i] // lane 2=top -> supp
        .props.children[0] // rank
        .props.children[3]
        .props.children[0]
        .props.children[0]
        .props.children[0] // champ name

      let rate = response[3]
        .props.children[5]
        .props.children[1]
        .props.children[4]
        .props.children[3]
        .props.children[0]
        .props.children[5]
        .props.children[0]
        .props.children[1]
        .props.children[0]
        .props.children[0]
        .props.children[0]
        .props.children[1]
        .props.children[2 + i] // lane 2=top -> supp
        .props.children[0] // rank
        .props.children[4]
        .props.children[0] // win rate

      let nospacechamp = champ.replace(/\s/g, '')

      elem.lane = lane[i];
      elem.champ = champ;
      elem.rate = rate;
      elem.nospacechamp = nospacechamp
      winrate.push({ elem: elem });
    }
    this.setState({ winrate: winrate })
  }



  render() {
    if (this.state.winrate) {
      return (
        <div>
          <h1 className="mt-4">Top Tiers Champs :</h1>
          <Row className="mb-5">
            {this.state.winrate.map((win, key) =>
              <Col key={key} >
                {this.state.winrate[key] &&
                  <Card style={styles} className="mt-5 text-center bg-dark">
                    <Card.Header className="m-0 p-0">{this.state.winrate[key].elem.lane}</Card.Header>
                    <Card.Body className="p-0">
                      <Card.Title className="pt-2">{this.state.winrate[key].elem.champ}</Card.Title>
                      <Card.Img variant="top" anonymous="true" src={"http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + this.state.winrate[key].elem.nospacechamp + "_0.jpg"} alt={"image of " + this.state.winrate[key].elem.cham} rounded="true" />
                      <Card.Text>{this.state.winrate[key].elem.rate}</Card.Text>
                    </Card.Body>
                  </Card>
                }
              </Col>
            )}
          </Row>
        </div>
      )
    }
    else {
      return(
        <div>
          <h1 className="mt-4">Top Tiers Champs :</h1>
          <Spinner animation="border" role="status" variant="secondary">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )
    }
  }

}

export default TopTier