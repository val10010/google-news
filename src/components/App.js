import React, { Component } from "react";
import xmlToJson from "./utils";
import News from './news';
import "../styles/App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      quantity: 10,
      isLoading: false, 
    };
    this.handlerAddMore = this.handlerAddMore.bind(this);
    this.setData = this.setData.bind(this);

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
        this.setState({ data: obj.rss.channel.item, isLoading: true});
      });
  }

    handlerAddMore () {
    const {quantity,data} = this.state;
    if(quantity >= data.length) return;
      this.setState((prev)=>{
          return {
            quantity: prev.quantity +=2
          }
      });
    }

    setData() {
    const {quantity,data} = this.state;
    let newData = [...data];
    newData.sort((a,b) => {
       return new Date(b.pubDate) - new Date(a.pubDate);
    })
    return newData.splice(0,quantity);
    }



  render() {
    const {data,quantity, isLoading} = this.state;
    let news = this.setData();

    return (
      <div className="wrapper">
        <News data={news} quantity={quantity} />
        {isLoading ? '' : <p>Loading...</p>}
        {(quantity !== data.length && isLoading ) ?  <button onClick={this.handlerAddMore} className="button-more">load more</button> : '' }
      </div>
    );
  }
}

export default App;
