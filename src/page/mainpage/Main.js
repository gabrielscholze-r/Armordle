import React, { useEffect, useState } from 'react';
import Item from '../../components/item/Item';
import './Main.css';
import { UilMessage } from '@iconscout/react-unicons'

export default function Main({ sortedItem, dataEn }) {
  const [sorted, setSorted] = useState(sortedItem);
  const [guesses, setGuesses] = useState([]);
  const [data, setData] = useState(dataEn);
  const [guess, setGuess] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const makeGuess = (g) => {
    if (dataEn) {
      const dataEnValues = Object.values(dataEn);
      const foundItem = dataEnValues.find((item) => item.name === g);
      if (foundItem) {
        setGuesses([...guesses, foundItem]);
        setGuess('');
        setSuggestions([]);
      } else {
        alert('Item not found in DataEn');
      }
    }
  }; 
  const selectSuggestion = (suggestion) => {
    setGuess(suggestion.name)
  }
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setGuess(inputValue);

    if (dataEn) {
      const dataEnValues = Object.values(dataEn);
      const filteredSuggestions = dataEnValues.filter(
        (item) => item.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };
  return (
    <div className="w-75">
      <div className="input-group input-group-sm mb-3">
        <div className="input-container mx-auto py-5">
          <input
            type="text"
            className="input-item p-2"
            value={guess}
            onChange={handleInputChange}
          />
          {/* <button className="send-button p-2 rounded m-2" onClick={() => makeGuess(guess)}>
            Send
          </button> */}
          <UilMessage className="send-button p-2 rounded m-2" onClick={() => makeGuess(guess)} size='70'/>
          <div className="suggestions-container mx-auto">
            {guess !== '' ? suggestions.map((suggestion, index) => (
              <div className='align-items-center d-flex div-suggestion' onClick={()=>selectSuggestion(suggestion)}>
                <img src={`http://ddragon.leagueoflegends.com/cdn/13.15.1/img/item/${suggestion.image.full}`} style={{width: '48px', height:'48px'}} alt=""/>
                <button key={index} className="suggestion py-2 m-auto" >{suggestion.name}</button>
              </div>
            )) : ''}
          </div>
        </div>
        {/* Render suggestions */}
      </div>
      {guesses.map((item, index) => (
        <Item key={index} itemData={item} />
      ))}

    </div>
  );
}
