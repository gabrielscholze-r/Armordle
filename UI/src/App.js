import './App.css';
// import { getDataEn, getDataPt } from './config/FilterData';
import dataenus from './data/DATA_enus.json'
import { useState } from 'react';
import Main from './page/mainpage/Main';
import API from './config/API';
import "bootstrap-icons/font/bootstrap-icons.css";
function App() {
  const [dataEn, setEn] = useState(dataenus)
  const sortItem = async () => {
    var result = await API.get('/data/sorted')
    return result.data
  }

  return (
    <div className="App">
      <div className="w-100">
      
      <Main sortedItem={sortItem()} dataEn={dataEn}/>

      </div>
    </div>
  );
}

export default App;
