import React, { useState } from "react";

import Item from "../../components/item/Item";
import Item0 from "../../data/assets/img/item0.png";
import Item1 from "../../data/assets/img/item1.png";
import Item2 from "../../data/assets/img/item2.png";
import Item3 from "../../data/assets/img/item3.png";
import Item4 from "../../data/assets/img/item4.png";
import Armor from "../../data/assets/img/icons/Armor_icon.png";
import AP from "../../data/assets/img/icons/Ability_power_icon.png";
import MR from "../../data/assets/img/icons/Magic_resistance_icon.png";
import AD from "../../data/assets/img/icons/Attack_damage_icon.png";
import Gold from "../../data/assets/img/icons/Gold_icon.png";
import HP from "../../data/assets/img/icons/Health_icon.png";
import "./Main.css";

export default function Main({ sortedItem, dataEn }) {
  const [sorted, setSorted] = useState(sortedItem);
  const [guesses, setGuesses] = useState([]);
  const [data, setData] = useState(dataEn);
  const [guess, setGuess] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [won, setWon] = useState(false);

  const makeGuess = (g) => {
    if (g.length > 0 && data.some((item) => item.name === g)) {
      setGuess("");
      setSuggestions([]);
      if (data) {
        const dataEnValues = Object.values(data);
        const foundItem = dataEnValues.find((item) => item.name === g);
        setGuesses([...guesses, foundItem]);
        if (foundItem.id === sortedItem) {
          setWon(true);
        }
      }
    }
  };
  const getImage = (sprite) => {
    switch (sprite) {
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
      default:
        return null;
    }
  };
  const selectSuggestion = (suggestion) => {
    setGuess(suggestion.name);
    setSuggestions([]);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setGuess(inputValue);

    if (data) {
      const dataEnValues = Object.values(dataEn);
      const filteredSuggestions = dataEnValues.filter(
        (item) =>
          !guesses.some((guessedItem) => guessedItem.name === item.name) &&
          item.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  return (
    <div className="background justify-content-center text-center">
      <div className="input-group input-group-sm">
        <div className="mx-auto w-100">
          <h1 className="mx-auto title">BUIDLE</h1>
          <div className="mx-auto w-100 input">
            {won ? (
              <div>
                <div>Congratulations! item was {sorted.name}!</div>
                <button className="restart-button">Restart Game</button>
              </div>
            ) : (
              ""
            )}
            <div>
              <div className=" d-flex align-items-center justify-content-center input-container mx-auto pt-5 my-auto">
                <input
                  type="text"
                  className="input-item p-2"
                  placeholder="Type an item..."
                  value={guess}
                  onChange={(e) => handleInputChange(e)}
                />

                <i
                  class="bi bi-chevron-right send-button"
                  onClick={() => makeGuess(guess)}
                ></i>
              </div>

              <div className="suggestions-container mx-auto d-flex justify-content-center">
                <div className="suggestions-padded" style={{ position: 'absolute', zIndex: 2 }}>
                  {guess !== ""
                    ? suggestions.map((suggestion, index) => (
                        <div
                          className="div-suggestion"
                          onClick={() => selectSuggestion(suggestion)}
                        >
                          <div
                            className="div-suggestion"
                            onClick={() => selectSuggestion(suggestion)}
                            style={{
                              position: "relative",
                              width: "48px",
                              height: "48px",
                              backgroundImage: `url(${getImage(
                                suggestion.image.sprite
                              )})`,
                              backgroundPosition: `-${suggestion.image.x}px -${suggestion.image.y}px`,
                            }}
                          ></div>

                          <button
                            key={index}
                            className="suggestion py-2 m-auto"
                          >
                            {suggestion.name}
                          </button>
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            </div>
            <div
              className="guesses-titles justify-content-center px-5"
              style={guesses.length > 0 ? null : { opacity: 0 }}
            >
              <div className="guess-item vertical-separator">
                <div className="d-flex align-items-center w-100 h-100 justify-content-around">
                  <div>Item</div>
                </div>
                
              </div>
              <div className="guess-item vertical-separator">
                <div className="d-flex align-items-center w-100 h-100 justify-content-around">
                  <div>Attack Damage</div>
                  <img
                    alt="Attack damage icon"
                    src={AD}
                    width={15}
                    height={15}
                  />
                </div>
                
              </div>
              <div className="guess-item vertical-separator">
                <div className="d-flex align-items-center w-100 h-100 justify-content-around">
                  <div>Ability Power</div>
                  <img
                    alt="Ability Power Icon"
                    src={AP}
                    width={15}
                    height={15}
                  />
                </div>
                
              </div>
              <div className="guess-item vertical-separator">
                <div className="d-flex align-items-center w-100 h-100 justify-content-around">
                  <div>Life</div>
                  <img alt="Life icon" src={HP} width={15} height={15} />
                </div>
                
              </div>
              <div className="guess-item vertical-separator">
                <div className="d-flex align-items-center w-100 h-100 justify-content-around">
                  <div>Armor</div>
                  <img alt="Armor icon" src={Armor} width={15} height={15} />
                </div>
                
              </div>
              <div className="guess-item vertical-separator">
                <div className="d-flex align-items-center w-100 h-100 justify-content-around">
                  <div>Magic Resistance</div>
                  <img
                    alt="Magic Resistance icon"
                    src={MR}
                    width={15}
                    height={15}
                  />
                </div>
                
              </div>

              {/* Adicione uma classe "vertical-separator" para a borda */}
              <div className="guess-item vertical-separator">
                <div className="d-flex align-items-center w-100 h-100 justify-content-around">
                  <div>Price</div>
                  <img alt="Gold icon" src={Gold} width={15} height={15} />
                </div>
                
              </div>
            </div>
            <div className="guesses-container mx-auto px-5">
              {guesses.map((item, index) => (
                <Item key={index} itemData={item} item_to_guess={sorted}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
