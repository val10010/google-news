import React, { Component } from "react";
import xmlToJson from "./utils";
import News from './news';
import "../styles/App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch(
      "https://cors-anywhere.herokuapp.com/https://news.google.com/rss?hl=ru&gl=UA&ceid=UA:ru",
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        }
      }
    )
      .then(resolve => resolve.text())
      .then(data => {
        let parse = new DOMParser();
        let xmlDoc = parse.parseFromString(data, "text/xml");
        let obj = xmlToJson(xmlDoc);
        this.setState({ data: obj.rss.channel.item });
      });
  }

  render() {
      const {data} = this.state;
    return (
      <div className="wrapper">
        <News data={data} />
      </div>
    );
  }
}

export default App;
