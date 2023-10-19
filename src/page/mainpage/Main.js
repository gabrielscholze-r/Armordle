import React, { useEffect, useState } from 'react';
import Item from '../../components/item/Item';
import Item0 from '../../data/assets/img/item0.png'
import Item1 from '../../data/assets/img/item1.png'
import Item2 from '../../data/assets/img/item2.png'
import Item3 from '../../data/assets/img/item3.png'
import Item4 from '../../data/assets/img/item4.png'
import './Main.css';

export default function Main({ sortedItem, dataEn }) {
  const [sorted, setSorted] = useState(sortedItem);
  const [guesses, setGuesses] = useState([]);
  const [data, setData] = useState(dataEn);
  const [guess, setGuess] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [won, setWon] = useState(false);
  useEffect(() => { console.log(sorted) }, [])
  
  const makeGuess = (g) => {
    setGuess('')
    setSuggestions([])
    if (data) {
      const dataEnValues = Object.values(data);
      const foundItem = dataEnValues.find((item) => item.name === g);
      console.log(foundItem)
      console.log(sortedItem)
      setGuesses([...guesses, foundItem])
      if (foundItem === sortedItem) {
        setWon(true)
      }
    }
  };
  const getImage = (sprite)=>{
    switch(sprite){
      case "item0.png":
        return Item0;
      case "item1.png":
        return Item1;
      case "item2.png":
        return Item2;
      case "item3.png":
        return Item3;
      case "item4.png":
        return Item4;
    }
  }
  const selectSuggestion = (suggestion) => {
    setGuess(suggestion.name)
    setSuggestions([]);
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setGuess(inputValue);

    if (data) {
      const dataEnValues = Object.values(dataEn);
      const filteredSuggestions = dataEnValues.filter(
        (item) => !guesses.some((guessedItem) => guessedItem.name === item.name) &&
          item.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  return (
    <div className="background justify-content-center text-center">

      <div className="input-group input-group-sm">
        <div className="mx-auto w-100">
          <h1 className='mx-auto title'>BUIDLE</h1>
          <div className='mx-auto w-100 input mt-auto'>
            {won ? (
              <div>
                Parabéns, você acertou! O item era {sorted.name}
              </div>
            ) : ''}
            <div>
            <div className=" d-flex align-items-center justify-content-center input-container mx-auto pt-5 my-auto">
              <input
                type="text"
                className="input-item p-2"
                placeholder='Type an item...'
                value={guess}
                onChange={(e) => handleInputChange(e)}
              />
             <i class="bi bi-chevron-right send-button" onClick={()=>makeGuess(guess)}></i>
            </div>

            <div className="suggestions-container mx-auto d-flex justify-content-center">
              <div className="suggestions-padded">
                {guess !== '' ? suggestions.map((suggestion, index) => (
                    
                      
                    <div className='div-suggestion' onClick={() => selectSuggestion(suggestion)}>
                      <div 
                        className='div-suggestion' 
                        onClick={() => selectSuggestion(suggestion)} 
                        key={index} 
                        style={{
                          position: 'relative',
                          width: '48px',
                          height: '48px',
                          backgroundImage: `url(${getImage(suggestion.image.sprite)})`,
                          backgroundPosition: `-${suggestion.image.x}px -${suggestion.image.y}px`,
                        }}
                      ></div>

                      <button key={index} className="suggestion py-2 m-auto" >{suggestion.name}</button>
                    </div>
                  
                )) : ''}
                </div>

            </div>
          </div>
        </div>
        <div className="guesses-container mx-auto">
          {guesses.map((item, index) => (
            <Item key={index} itemData={item} />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
