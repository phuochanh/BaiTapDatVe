import React, { Component } from "react";

import { connect } from "react-redux";
// Những action cần gọi từ UI đến redux reducers
// Flow: Từ Component -gọi (dispatch) một action -> Thông qua connect -> Gủi đến reducers xử lý và lưu vào Store,
//  sau đó render ngược lại lại Component
import {
  selectChairAction,
  startSelectingAction,
  confirmSelectingAction,
} from "../../store/actions/chairAction";

import chairList from "../../components/data/danhSachGhe.json";
import Chair from "./Chair";

import "./style.scss";

class DatVeXemPhim extends Component {
  inputRefName = React.createRef();
  inputRefSeat = React.createRef();

  constructor(props) {
    super(props);
    this.state = { isStarted: false }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log(nextProps, nextState);
    // console.log(this.props, this.state);
    return true;
  }

  startSelecting = () => {
    const name = this.inputRefName.current.value;
    const seat = this.inputRefSeat.current.value;

    this.props.startSelectingAction({ name, seat });
    if (name === "" && seat === ""){
      alert("Please Enter your Name and Number of Seats");
      return;
    }
    this.setState({isStarted: true})
  };

  confirmSelecting = () => {
    const name = this.inputRefName.current.value;
    const seat = this.inputRefSeat.current.value;
    this.props.confirmSelectingAction({ name, seat });
  };

  onSelectChair = (row, col) => {
    // Gọi redux bằng cách gửi một action đến reducers
    // this.props.dispatch(selectChairAction({row, col}));
    this.props.selectChairAction({ row, col });
  };

  renderContent = () => {
    const { name, seat, selectedChairs, reservedChairs } = this.props;

    const ktDangChon = (row, col) => {
      if (!selectedChairs) return false;
      let found = false;
      for (let i = 0; i < selectedChairs.length; i++) {
        let t_ = selectedChairs[i];
        if (t_.row == row && t_.col == col) {
          found = true;
          break;
        }
      }
      return found;
    };

    const ktDaDat = (row, col) => {
      if (!reservedChairs) return false;
      let found = false;
      for (let i = 0; i < reservedChairs.length; i++) {
        let selecteds = reservedChairs[i].selectedChairs;

        for (let j = 0; j < selecteds.length; j++) {
          let t_ = selecteds[j];
          if (t_.row == row && t_.col == col) {
            found = true;
            break;
          }
        }
      }
      return found;
    };

    return chairList.map((ele) => {
      return (
        <div key={ele.hang}>
          <div className="seat">{ele.hang}</div>
          {ele.danhSachGhe.map((chair, idx) => {
            const dangChon = ktDangChon(ele.hang, idx);
            const daDat = ktDaDat(ele.hang, idx);

            return (
              <Chair
                key={chair.soGhe}
                hang={ele.hang}
                name={idx + 1}
                dangChon={dangChon}
                daDat={daDat}
                onClick={
                  seat > 0 ? () => this.onSelectChair(ele.hang, idx) : null
                }
              />
            );
          })}
        </div>
      );
    });
  };

  render() {
    const { name, seat, selectedChairs, reservedChairs, isConfirmed } = this.props;
    const { isStarted } = this.state;

    return (
      <div>
        <p className="txtNote">
          Fill The Required Details Below And Select Your Seats
        </p>
        <div>
          <form>
            <label className="mr-4 text">
              Name:
              <input
                ref={this.inputRefName}
                type="text"
                required=""                
                disabled={isStarted}
                name="name"
              />
            </label>
            <label className="text">
              Number of seats:
              <input
                ref={this.inputRefSeat}
                type="number"
                required=""
                disabled={isStarted}
                name="number"
              />
            </label>
          </form>
        </div>
        <button className="btn btn-primary mt-4" onClick={this.startSelecting}>
          Start Selecting
        </button>
        
        <div className="row text-center">
          <div className="row ml-4">
            <div className="square selected"></div>
            <p className="seats ml-3">Selected Seat</p>
          </div>
          <div className="row ml-4">
            <div className="square reserved"></div>
            <p className="seats ml-3">Reserved Seat</p>
          </div>
          <div className="row ml-4">
            <div className="square empty"></div>
            <p className="seats ml-3">Empty Seat</p>
          </div>
        </div>
        <div>
          <p className="text">
            <strong>Màn hình</strong>
          </p>
          <div className="screen"></div>
        </div>

        {this.renderContent()}

        <p className="chooseSeat">Please Select your Seats NOW!</p>
        <button
          disabled={seat != selectedChairs.length}
          className="btn btn-primary mt-4"
          onClick={this.confirmSelecting}
        >
          Confirm Selecting
        </button>
        <div>
          <table className="textCenter">
            <tbody>
              <tr className="tblColor">
                <th>Name</th>
                <th>Number of Seats</th>
                <th>Seats</th>
              </tr>
              <tr>
                <td>
                  <textarea className="infor" cols="30" rows="2" value={isConfirmed ? name : ""} disabled></textarea>
                </td>
                <td>
                <textarea className="infor" cols="30" rows="2" value={isConfirmed ? seat : ""} disabled></textarea>
                </td>
                <td>
                <textarea className="infor" cols="30" rows="2" value={isConfirmed ? reservedChairs[0].selectedChairs.map(e => `${e["row"]}${e["col"]+1}`) : ""} disabled></textarea>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* <div>
          {
            // {name: '', seat: 1, selectedChairs: [ {row, col} ]}
            
            reservedChairs.map((ele) => {
              console.log(reservedChairs);
              console.log(ele);
              return <h1>{JSON.stringify(ele.selectedChairs)}</h1>;
            })
          }
        </div> */}
      </div>
    );
  }
}

// Kết Component với Store của redux
const mapStateToProps = (state) => {
  return {
    // Máp state của chair reducer vô props của Component
    name: state.chairReducer.name,
    seat: state.chairReducer.seat,
    selectedChairs: state.chairReducer.selectedChairs,
    reservedChairs: state.chairReducer.reservedChairs,
    isConfirmed: state.chairReducer.isConfirmed,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    startSelectingAction: (payload) => dispatch(startSelectingAction(payload)),
    selectChairAction: (payload) => dispatch(selectChairAction(payload)),
    confirmSelectingAction: (payload) =>
      dispatch(confirmSelectingAction(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatVeXemPhim);
