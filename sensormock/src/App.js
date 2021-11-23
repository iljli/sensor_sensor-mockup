import { useState } from "react";
import logo from './logo.svg';
import './App.css';

function App() {

  const sendTestData = (e) => {
    // const [posts, setPosts] = useState();
    // const [error, setError] = useState();
    // const [userInput, setUserInput] = useState(mockDataInitial);

    const mockDataInitial = {
      "sensor_id": '1',
      "time": 12345678,
      "pressure": 1021.659,
      "temperature": 25.88761,
      "humidity": 38,
      "carbondioxide": 515,
      "organic": 17,
      "sensorData": [42.4242, 39]
    };

    const mockData = {
      "sensor_id": '1',
      "time": 12345678,
      "pressure": 1021.659,
      "temperature": 25.88761,
      "humidity": 38,
      "carbondioxide": 515,
      "organic": 17,
      "sensorData": [42.4242, 39]
    };

    console.log("sendTestData");
    e.preventDefault();
    const apiUrl = "http://localhost:3000/sensor";

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



  return (
    <div className="App">
      <header className="App-header">
        <button onClick={sendTestData}>Send Testdata</button>
      </header>
    </div>
  );
}

export default App;
