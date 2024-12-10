import React, { Component } from "react";

class Course extends Component {
  state = {};
  render() {
    return (
      <div className="card" styles={{ width: "18rem" }}>
        <img src={this.props.image} class="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{this.props.title}</h5>
          <p className="card-text">{this.props.description}</p>
          <button onClick={this.props.link} className="btn btn-primary">
            Book Course
          </button>
        </div>
      </div>
    );
  }
}

export default Course;
