import React, { useEffect, useState } from 'react';
import Item from '../../components/item/Item';
import './Main.css';
import { UilMessage } from '@iconscout/react-unicons';

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
    <div className="background justify-content-center align-items-center text-center">
      
      <div className="input-group input-group-sm mb-3">
         <h1 className='mx-auto'>BUILDLE</h1>
        <div className='mx-auto w-100'>
          {won ? (
            <div>
              Parabéns, você acertou! O item era {sorted.name}
            </div>
          ) : ''}
          <div className="input-container mx-auto py-5">
            <input
              type="text"
              className="input-item p-2"
              placeholder='Type an item...'
              value={guess}
              onChange={(e) => handleInputChange(e)}
            />
            <UilMessage className="send-button p-2 rounded m-2" onClick={() => makeGuess(guess)} size='70' />
            <div className="suggestions-container">
              {guess !== '' ? suggestions.map((suggestion, index) => (
                <div className='align-items-center d-flex div-suggestion' onClick={() => selectSuggestion(suggestion)} key={index}>
                  <img src={`http://ddragon.leagueoflegends.com/cdn/13.15.1/img/item/${suggestion.image.full}`} style={{ width: '48px', height: '48px' }} alt="" />
                  <button key={index} className="suggestion py-2 m-auto" >{suggestion.name}</button>
                </div>
              )) : ''}
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
  );
}
