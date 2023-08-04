import './App.css';
import { getDataEn, getDataPt } from './config/FilterData'; 
import { useEffect, useState } from 'react';
function App() {
  const [dataEn, setEn] = useState(null)
  useEffect(() => {
    setEn(getDataEn())
    console.log(dataEn)
  },[])
  useEffect(() => {
    console.log(dataEn)
  },[dataEn])
  return (
    <div className="App">
        loldele
    </div>  
  );
}

export default App;
