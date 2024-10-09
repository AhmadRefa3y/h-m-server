const { readFileSync } = require("fs");

const products = JSON.parse(readFileSync("allData.json", "utf-8"));
console.log(products.length);
