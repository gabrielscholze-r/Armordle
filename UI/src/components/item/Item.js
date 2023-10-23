import React, { useEffect, useState } from "react";

import "./Item.css";
import API from "../../config/API";
export default function Item({ itemData, item_to_guess }) {
  const [data, setData] = useState([]);
  const [data_to_guess, setToGuess] = useState([]);
  useEffect(() => {
    console.log(item_to_guess)
    setData(
      itemData.stats
        .filter((stat) => {
          const excludedNames = [
            "Movement Speed",
            "Attack Speed",
            "Crit Chance",
            "Life Steal",
          ];
          return !excludedNames.includes(stat.name);
        })
        .map((stat) => stat.value)
    );
    setToGuess(API.get('/data/stats', {
      id:item_to_guess
    }));
  }, []);

  const getColorClass = (value, guessValue) => {
    if (value === guessValue) {
      return "background-green";
    } else if ((value > guessValue || value < guessValue) && guessValue !== 0) {
      return "background-yellow";
    } else if (value > 0 && guessValue === 0) {
      return "background-red";
    }
    return "";
  };

  return (
    <div className="item-container d-inline-flex mx-auto align-items-center justify-content-center">
      <div className="d-flex align-items-center width-div-pattern-img">
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/13.15.1/img/item/${itemData.id}.png`}
          alt={data.name}
        />
      </div>
      {data.map((value, index) => (
        <div
          key={index}
          className={`d-flex align-items-center width-div-pattern ${getColorClass(
            value,
            data_to_guess[index]
          )}`}
        >
          <p className="m-auto item-values">
            {value}
            {data_to_guess[index ] !== value ? (
              data_to_guess[index] > value ? (
                <i className="bi bi-arrow-up"></i>
              ) : (
                <i className="bi bi-arrow-down"></i>
              )
            ) : null}
          </p>
        </div>
      ))}
    </div>
  );
}
