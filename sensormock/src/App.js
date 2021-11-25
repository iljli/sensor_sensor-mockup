
/*
  ToDo: after generating data and sending them it is not possible to press the button to generate
  them again without changing the values to generate them
*/

import { useState } from "react";
import logo from './logo.svg';
import './App.css';

const generatorSettingInitial = {
  toalNumberOfDatasets: 1,
  timeInkrement: 1,
}


const TEMPERATUR_STEP = 1
const PRESSURE_STEP = 10
const HUMIDITY_STEP = 3


const mockDataInitial = {
  "sensor_id": '1',
  "time": 1637756874,
  "pressure": 1000,
  "temperature": 20,
  "humidity": 40,
};

let generatedDataArray = [{
  "sensor_id": '1',
  "time": 1637756874,
  "pressure": 1000,
  "temperature": 20,
  "humidity": 40,
}];

function App() {

  const [mockData, setMockData] = useState(mockDataInitial);
  const [dateEpoch, setDateEpoch] = useState();
  const [timeEpoch, setTimeEpoch] = useState();
  const [generatorSetting, setGeneratorSetting] = useState(generatorSettingInitial);



  const sendTestData = (e) => {

    console.log("sendTestData");
    e.preventDefault();
    const apiUrl = "http://localhost:3000/sensor";

    setMockData({ time: dateEpoch + timeEpoch });
    let options = {};
    if (generatedDataArray.length > 1) {
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include"
        },
        body: JSON.stringify(generatedDataArray)
        // body: JSON.stringify(mockData)
      }
      generatedDataArray = generatedDataArray[0];
    } else {
      console.log("mockData");
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include"
        },
        body: JSON.stringify(mockData)
      };
    }


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
    setMockData({ ...mockData, [event.target.name]: Number(event.target.value) })
    console.log(mockData);
  }

  const handleDateChange = (event) => {
    console.log(event.target)
    console.log(event.target.valueAsNumber);
    setDateEpoch(Number(event.target.valueAsNumber));
  }

  const handleTimeChange = (event) => {
    setTimeEpoch(event.target.valueAsNumber * 1000);
    console.log(timeEpoch);
  }

  const handleInputChangeGenerator = (event) => {
    event.preventDefault();
    setGeneratorSetting({ ...generatorSetting, [event.target.name]: event.target.value });
    console.log(generatorSetting);

  }


  const randomwalk = (startvalue = 0, stepheight = 1) => {
    const direction = (Math.floor(Math.random() * 3));
    let nextStep = 0;
    if (stepheight < 1) stepheight = 1;

    switch (direction) {
      case 0:
        nextStep = startvalue;
        break;
      case 1:
        nextStep = startvalue + stepheight;
        break;
      case 2:
        nextStep = startvalue - stepheight;
        break;
      default:
        return startvalue;
    }
    return nextStep;
  }


  const handleButtonChangeGenerator = (event) => {
    event.preventDefault();

    generatedDataArray = [{

    }];

    // if (!mockData) setMockData();

    for (let n = 0; n < generatorSetting.toalNumberOfDatasets; n++) {
      console.log(n * generatorSetting.timeInkrement)
      let timeCalculated = (n * timeEpoch) + dateEpoch + timeEpoch;
      // if (!timeEpoch) timeCalculated = ((n * 1000) + 1673712000000); // Not Working

      let humidityTmp = 0;
      let temperatureTmp = 0;
      let pressureTmp = 0;
      if (n === 0) {
        console.log("A")
        console.log(`mockData.humidity: ${mockData.humidity}`)
        humidityTmp = randomwalk(mockData.humidity, HUMIDITY_STEP);
        temperatureTmp = randomwalk(mockData.temperature, TEMPERATUR_STEP);
        pressureTmp = randomwalk(mockData.pressure, PRESSURE_STEP);
      } else {
        console.log("B")
        humidityTmp = randomwalk(generatedDataArray[n - 1].humidity, HUMIDITY_STEP);
        temperatureTmp = randomwalk(generatedDataArray[n - 1].temperature, TEMPERATUR_STEP);
        pressureTmp = randomwalk(generatedDataArray[n - 1].pressure, PRESSURE_STEP);
      }


      const oneDataElement = {
        "sensor_id": '1',       // ToDo
        "time": timeCalculated,
        "pressure": pressureTmp,
        "temperature": temperatureTmp,
        "humidity": humidityTmp,
      };

      if (n === 0) generatedDataArray[0] = oneDataElement
      else generatedDataArray.push(oneDataElement);
    }

    console.log(generatedDataArray);
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
                value={mockData.sensor_id}
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
                value={dateEpoch}
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
                value={mockData.temperature}
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
                value={mockData.pressure}
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
                value={mockData.humidity}
              />
            </div>

            <div className="align-right">
              <button>Send</button>
            </div>
          </form>

        </div>
        < hr />
        <div className="inputContainer">
          <form onSubmit={handleButtonChangeGenerator}>

            <div className="inputForm">
              <label htmlFor="toalNumberOfDatasets">Number of Datasets [n]</label>
              <input className="inputField"
                id="toalNumberOfDatasets"
                onChange={handleInputChangeGenerator}
                type="number"
                name="toalNumberOfDatasets"
                min="0"
                max="100"
              />

              <label htmlFor="timeInkrement">Timeinkrement [s]</label>
              <input className="inputField"
                id="timeInkrement"
                onChange={handleTimeChange}
                type="number"
                name="timeInkrement"
                min="0"
                max="3600"
              />
            </div>

            <div className="align-right">
              <button>Generate</button>
            </div>
          </form>

        </div>
      </header>
    </div>
  );
}

export default App;
