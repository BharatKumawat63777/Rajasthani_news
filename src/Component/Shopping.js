import React, { Component } from "react";
import Shoppingitem from "./Shoppingitem.js";
import Spinner from "./Spinner.js";
import PropTypes from "prop-types";

export default class Shopping extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "science",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor() {
    super();

    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };   
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=870b1dd621824fb389fa72b26ad66d0b`;
    this.setState({ loading: true });
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  handlePrevClick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=870b1dd621824fb389fa72b26ad66d0b`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };
  handleNextClick = async () => {
    console.log("Next");
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=870b1dd621824fb389fa72b26ad66d0b`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
    }
  };
  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center"> Top Maximum offer this time</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles?.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Shoppingitem
                    title={element.title ? element.title.slice(0, 40) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 70)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-around">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-success"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-success"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
