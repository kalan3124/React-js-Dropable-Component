import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(" http://127.0.0.1:8000/api/manualkey/index")
      .then(function (response) {
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const onChangeName = (key) => {
    // var arr = [{ ...data[0], name: "ddddd" }];
    setData([{ ...data[0], name: "ddddd" }]);
  };

  const onChangeQty = () => {};

  const onChangePrice = () => {};

  const testClick = () => {
    var arr = [{...data[0],name: "ddddd", qty: 5, unitprice: 100 }];
    // setData([...data, arr]);
    console.log(arr);
  };

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(data).map((data, key) => {
            return [
              <tr key={key}>
                <td>{data.plu}</td>
                <td>
                  <input
                    value={data.name}
                    onChange={(e) => onChangeName(key)}
                  />
                </td>
                <td>
                  <input value={data.qty} onChange={onChangeQty} />
                </td>
                <td>
                  <input value={data.unitprice} onChange={onChangePrice} />
                </td>
              </tr>,
            ];
          })}
        </tbody>
      </table>
      <button onClick={testClick}>test</button>
    </div>
  );
}

export default App;
