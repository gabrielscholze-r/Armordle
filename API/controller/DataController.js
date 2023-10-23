const { ok } = require("assert");
const { json } = require("express");
const session = require('express-session');
const fs = require("fs");

const path = "data/DATA_enus.json";
var conteudo = JSON.parse(fs.readFileSync(path));
module.exports = {
  sort(req, res) {
    const itemAleatorio = conteudo[Math.floor(Math.random() * conteudo.length)];
    return itemAleatorio.id
  },
  getStatsById(req, res) {
    const { id } = req.body;
    let item = conteudo.find((item) => item.id === id);
    console.log(item.stats)
    console.log(conteudo)
    return res.json(
      item.stats
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
  },

};
