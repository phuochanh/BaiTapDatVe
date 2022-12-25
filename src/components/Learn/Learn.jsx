import React, { Component } from "react";

export default class Learn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      t: 1,
      a: 2,
    };
  }

  tick() {
    this.setState({ t: Date() });
  }

  // Thực hiện logic sau khi thực hiện render xong
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  // Thực hiện giải phóng resources
  componentWillUnmount() {
    // Xóa interval đi
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div>
        <h1>{this.props.data}</h1>
        <h1>{this.state.t}</h1>
      </div>
    );
  }
}
