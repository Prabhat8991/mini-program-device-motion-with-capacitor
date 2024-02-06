import React, { useState } from 'react';
import { Motion } from '@capacitor/motion';

function App() {
  const [accelHandler, setAccelHandler] = useState(null);
  const [accelData, setAccelData] = useState(null); // State to store acceleration data

  const handleButtonClick = async () => {

    setAccelHandler(
      await Motion.addListener('accel', event => {
        console.log('Device motion event:', event);
        setAccelData(event); // Store the acceleration data in state
      })
    );
  };

  const stopAcceleration = () => {
    if (accelHandler) {
      accelHandler.remove();
      setAccelHandler(null);
      setAccelData(null); // Clear the acceleration data when stopping
    }
  };

  const removeListeners = () => {
    Motion.removeAllListeners();
    setAccelHandler(null);
    setAccelData(null); // Clear the acceleration data when removing listeners
  };

  return (
    <div>
      <h1>Motion App</h1>
      <button onClick={handleButtonClick}>Start Acceleration</button>
      <button onClick={stopAcceleration}>Stop Acceleration</button>
      <button onClick={removeListeners}>Remove All Listeners</button>
      <div>
        {accelData && ( // Render acceleration data if available
          <div>
            <h2>Acceleration Data</h2>
            <p>X: {accelData.acceleration.x.toFixed(2)}</p>
            <p>Y: {accelData.acceleration.y.toFixed(2)}</p>
            <p>Z: {accelData.acceleration.z.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
