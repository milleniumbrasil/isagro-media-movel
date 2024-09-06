import React, { useState, useEffect } from 'react';
import Timeline from './components/Timeline';
import { processData, ProcessedDataItem } from './utils/processData';


const App: React.FC = () => {
  const [subsequenceRange, setSubsequenceRange] = useState<number>(1);
  const [data, setData] = useState<ProcessedDataItem[]>([]);
  const [fonteKeys, setFonteKeys] = useState<string[]>([]);

  useEffect(() => {
    fetch('data.json')
      .then((response) => response.json())
      .then((jsonData) => {
        let finalData;
        const { processedData, fontes } = processData(jsonData, subsequenceRange);
        finalData = processedData;
        setFonteKeys(fontes);
        setData(finalData);
      })
      .catch((error) => console.error('Error loading data:', error));
  }, [subsequenceRange]);
  console.log(data);
  return (
    <div>
      <h1>Normalized Stacked Area Chart</h1>
      <div>
        <label>
          Subsequências (anos):
          <select value={subsequenceRange} onChange={(e) => setSubsequenceRange(Number(e.target.value))}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
        
      </div>
      <Timeline data={data} fonteKeys={fonteKeys} />
    </div>
  );
};

export default App;