import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { APP_URL } from "./Config";

class AppTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      edited: {},
      deleted: {},
      countId: 0,
    };

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeQty = this.onChangeQty.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.checkDelete = this.checkDelete.bind(this);
  }

  componentDidMount() {
    axios
      .get(APP_URL + "api/manualkey/index?perPage=15&query=&orderBy=plu,desc")
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          data: response.data.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeName(key) {
    return (e) => {
      const { name, plu, qty, unitprice } = this.state.data[key];

      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          [key]: {
            plu: plu,
            name: e.target.value,
            qty: qty,
            unitprice: unitprice,
          },
        },
      });
      setTimeout(() => {
        this.collectEdited(key);
      }, 1000);
    };
  }

  onChangeQty(key) {
    return (e) => {
      const { name, plu, qty, unitprice } = this.state.data[key];

      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          [key]: {
            plu: plu,
            name: name,
            qty: e.target.value,
            unitprice: unitprice,
          },
        },
      });
      setTimeout(() => {
        this.collectEdited(key);
      }, 1000);
    };
  }

  onChangePrice(key) {
    return (e) => {
      const { name, plu, qty, unitprice } = this.state.data[key];

      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          [key]: {
            plu: plu,
            name: name,
            qty: qty,
            unitprice: e.target.value,
          },
        },
      });
      setTimeout(() => {
        this.collectEdited(key);
      }, 1000);
    };
  }

  collectEdited(key) {
    this.setState({
      edited: {
        ...this.state.edited,
        [key]: this.state.data[key],
      },
      countId: this.state.countId + 1,
    });
  }

  testClick() {
    let resetArr;
    resetArr = Object.values(this.state.edited).filter(function () {
      return true;
    });
    console.log(resetArr);
  }

  testClickDelete() {
    let resetArr;
    resetArr = Object.values(this.state.deleted).filter(function () {
      return true;
    });
    console.log(resetArr);
  }

  checkDelete(key) {
    return (e) => {
      console.log(e.target.checked);
      if (e.target.checked) {
        this.setState({
          deleted: {
            ...this.state.deleted,
            [key]: this.state.data[key],
          },
          countId: this.state.countId + 1,
        });
      } else {
        let newArr = this.state.deleted;
        delete newArr[key];
        this.setState({
          deleted: newArr,
        });
      }
    };
  }

  testClickPdf() {
    axios
      .post(APP_URL + "api/test/pdf", { data: this.state.data })
      .then((response) => {
        window.open(response.data.link);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  searchData(e) {
    // console.log(e.target.value)
    axios
      .get("http://127.0.0.1:8000/api/manualkey/index?query=" + e.target.value)
      .then((response) => {
        this.setState({
          data: response.data.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <div style={{ margin: "10px" }}>
          <label>
            Changed Rows : {Object.values(this.state.edited).length}
          </label>
          <label>
            {" "}
            Checked Rows : {Object.values(this.state.deleted).length}
          </label>
          <input type="text" onChange={this.searchData.bind(this)} />
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.values(this.state.data).map((data, key) => {
              return [
                <tr key={key}>
                  <td>{data.plu}</td>
                  <td>
                    <input
                      value={data.name}
                      onChange={this.onChangeName(key)}
                    />
                  </td>
                  <td>
                    <input value={data.qty} onChange={this.onChangeQty(key)} />
                  </td>
                  <td>
                    <input
                      value={data.unitprice}
                      onChange={this.onChangePrice(key)}
                    />
                  </td>
                  <td>
                    <input type="checkbox" onChange={this.checkDelete(key)} />
                  </td>
                </tr>,
              ];
            })}
          </tbody>
        </table>
        <button onClick={this.testClick.bind(this)}>Change</button>
        <button onClick={this.testClickDelete.bind(this)}>Delete</button>
        <button onClick={this.testClickPdf.bind(this)}>Pdf</button>
      </div>
    );
  }
}

export default AppTwo;
