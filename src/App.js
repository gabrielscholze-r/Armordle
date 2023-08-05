import './App.css';
import { getDataEn, getDataPt } from './config/FilterData';
import { useState } from 'react';
import Main from './page/mainpage/Main';
function App() {
  const [dataEn, setEn] = useState(getDataEn())
  const [dataPt, setPt] = useState(getDataPt())

  const sortItem = () => {
    var sort = dataEn[Math.floor(Math.random() * Object.keys(dataEn).length)]
    return sort
  }

  return (
    <div className="App">

      <h1>BUILDLE</h1>
      <Main sortedItem={sortItem} dataEn={dataEn} />
    </div>
  );
}

export default App;
