import React, { Component } from "react";

export default class Chair extends Component {
  mappingClass = () => {
    const { hang, dangChon, daDat } = this.props;

    if (dangChon) {
      return "selected";
    }

    if (!hang) {
      return "number";
    }

    if (daDat) {
      return "booked";
    }

    if (!daDat) {
      return "available";
    }
  };

  render() {
    return (
      <div onClick={this.props.onClick} className={`chair ${this.mappingClass()}`}>{this.props.name}</div>
    );
  }
}
