import React, { Component } from "react";
import "./AppTwo.css";

class GoogleTracking extends Component {
  constructor(props) {
    super(props);
    // this.state = {

    // };
  }

  componentWillMount() {
    // this.initMap();
  }

//   initMap() {
//     let map;
//     map = new google.maps.Map(document.getElementById("map"), {
//       center: { lat: -34.397, lng: 150.644 },
//       zoom: 8,
//     });
//   }

  render() {
    return <div id="map"></div>;
  }
}

export default GoogleTracking;