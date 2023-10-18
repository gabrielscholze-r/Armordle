import './App.css';
// import { getDataEn, getDataPt } from './config/FilterData';
import dataenus from './data/DATA_enus.json'
import { useState } from 'react';
import Main from './page/mainpage/Main';
function App() {
  const [dataEn, setEn] = useState(dataenus)
  // const [dataPt, setPt] = useState(getDataPt())

  const sortItem = () => {
    var sort = dataEn[Math.floor(Math.random() * Object.keys(dataEn).length)]
    return sort
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
