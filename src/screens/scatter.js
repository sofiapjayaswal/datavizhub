import Select from 'react-select';
import { useEffect, useState } from 'react';
import dataset from '../dataset.json'
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { outputs, inputs, dropdownStyles } from '../constants'
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);


function ScatterScreen() {
  const [inputProperty, setInputProperty] = useState("")
  const [outputProperty, setOutputProperty] = useState("")
  const [data, setData] = useState([])

  // when input and output are set by user, get data for chart
  useEffect(() => {
    if (inputProperty !== "" && outputProperty !== "") {
      let tempData = []
      for (let experiment in dataset) {
        tempData.push({x: dataset[experiment]["inputs"][inputProperty], y: dataset[experiment]["outputs"][outputProperty]})
      }
      setData(tempData)
    }
  }, [inputProperty, outputProperty])

  // configuration for chart
  const chartConfig = {
    datasets: [
      {
        data: data,
        backgroundColor: "#725AC1",
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: inputProperty,
        },
      },
      y: {
        title: {
          display: true,
          text: outputProperty,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  
  return (
    <div className="scatter-screen">
      <div className="instructions">Please choose both an input and an output below to visualize and compare them on a scatterplot.</div>
      <div className='scatter-dropdowns-container'> 
        <div className="scatter-dropdown">
          <h4>Input:</h4>
          <Select 
            options={inputs} 
            onChange={(e) => setInputProperty(e.value)} 
            placeholder="Select Input to Examine"
            styles={dropdownStyles}
          />
        </div>
        <div className="scatter-dropdown">
          <h4>Output:</h4>
          <Select 
            options={outputs} 
            onChange={(e) => setOutputProperty(e.value)} 
            placeholder="Select Output to Examine"
            styles={dropdownStyles}
          />
        </div>
      </div>
      {data.length > 0 ? <Scatter className="scatter-chart" data={chartConfig} options={chartOptions}/> : null}
    </div>
  );


}

export default ScatterScreen;
