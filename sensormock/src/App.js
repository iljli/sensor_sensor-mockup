import { useState } from "react";
import logo from './logo.svg';
import './App.css';

function App() {

  const [mockData, setMockData] = useState();
  const [dateEpoch, setDateEpoch] = useState();
  const [timeEpoch, setTimeEpoch] = useState();

  const sendTestData = (e) => {

    const mockDataInitial = {
      "sensor_id": '1',
      "time": 1637756874,
      "pressure": 1021.659,
      "temperature": 25.88761,
      "humidity": 38,
      // "carbondioxide": 515,
      // "organic": 17,
      // "sensorData": [42.4242, 39]
    };

    // let mockData = {
    //   "sensor_id": '1',
    //   "time": 1637756874,
    //   "pressure": 1021.659,
    //   "temperature": 25.88761,
    //   "humidity": 38,
    //   // "carbondioxide": 515,
    //   // "organic": 17,
    //   // "sensorData": [42.4242, 39]
    // };

    console.log("sendTestData");
    e.preventDefault();
    const apiUrl = "http://localhost:3000/sensor";

    setMockData({time:  dateEpoch + timeEpoch});

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include"
      },
      body: JSON.stringify(mockData)
    };

    fetch(apiUrl, options)
      .then((res) => {
        if (!res.ok) throw new Error("Could not create post");
        return res.json();
      })
      .then((post) => {
        // setPosts([...posts, post]);
        // setUserInput(mockDataInitial);
      })
      .catch((e) => {
        // setUserInput(mockDataInitial);
        // setError(e);
        console.log(e);
      });
  }

  const handleInputChange = (event) => {
    setMockData({ ...mockData, [event.target.name]: event.target.value })
    console.log(mockData);
  }

  const handleDateChange = (event) => {
    console.log(event.target.valueAsNumber);
    setDateEpoch(event.target.valueAsNumber);
  }

  const handleTimeChange = (event) => {
    console.log(event.target.valueAsNumber);
    setTimeEpoch(event.target.valueAsNumber);
  }



  return (
    <div className="App">
      <header className="App-header">

        <div className="inputContainer">
          <form onSubmit={sendTestData}>
            <div className="inputForm">
              <label htmlFor="sensorID">Sensor-ID [#]</label>
              <input className="inputField"
                id="sensorID"
                onChange={handleInputChange}
                type="number"
                name="sensor_id"
                min="0"
              />
            </div>

            <div className="inputForm">
              <label htmlFor="time">Date [d]</label>
              <input className="inputField"
                id="time"
                onChange={handleDateChange}
                type="date"
                name="time"
                min="0"
              />
            </div>

            <div className="inputForm">
              <label htmlFor="time">Time [t]</label>
              <input className="inputField"
                id="time"
                onChange={handleTimeChange}
                type="time"
                name="time"
                min="0"
              />
            </div>

            <div className="inputForm">
              <label htmlFor="temperature">Temperature [°C]</label>
              <input className="inputField"
                id="temperature"
                onChange={handleInputChange}
                type="number"
                name="temperature"
                min="-100"
                max="100"
              />
            </div>

            <div className="inputForm">
              <label htmlFor="pressure">Pressure [hPa]</label>
              <input className="inputField"
                id="pressure"
                onChange={handleInputChange}
                type="number"
                name="pressure"
                min="800"
                max="1200"
              />
            </div>

            <div className="inputForm">
              <label htmlFor="humidity">Humidity [%]</label>
              <input className="inputField"
                id="humidity"
                onChange={handleInputChange}
                type="number"
                name="humidity"
                min="0"
                max="100"
              />
            </div>

            <div className="align-right">
              <button>Send</button>
            </div>
          </form>

        </div>
      </header>
    </div>
  );
}

export default App;
