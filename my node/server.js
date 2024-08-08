// const express = require('express');
// const path = require('path');
// const {dirname} = require("path");
// const {fileURLToPath} = require("url");
// const app = express();
// const port = 5000;
//
// const __dirname = dirname(fileURLToPath(import.meta.url));
// // Middleware to parse JSON request bodies
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // Serve the index.html file at the root URL
//
// // Function to find the summation of numbers from 1 to N
// function findSummation(n = 1) {
//   if (typeof n !== 'number' || n <= 0) return false;
//   return (n * (n + 1)) / 2;
// }
//
// Function to capitalize the first and last letter of each word in a string
// function uppercaseFirstandLast(str) {
//   if (typeof str !== 'string') return false;
//   return str.split(' ').map(word => {
//     if (word.length < 2) return word.toUpperCase();
//     return word[0].toUpperCase() + word.slice(1, -1) + word[word.length - 1].toUpperCase();
//   }).join(' ');
// }
//
// // Function to find average and median of an array of numbers
// function findAverage_and_Median(numbers) {
//   if (!Array.isArray(numbers) || numbers.some(num => typeof num !== 'number')) return false;
//   const sum = numbers.reduce((a, b) => a + b, 0);
//   const average = sum / numbers.length;
//
//   numbers.sort((a, b) => a - b);
//   const mid = Math.floor(numbers.length / 2);
//   const median = numbers.length % 2 !== 0 ? numbers[mid] : (numbers[mid - 1] + numbers[mid]) / 2;
//
//   return { average, median };
// }
//
// // Function to find the first four-digit number in a string
// function find4Digits(str) {
//   const string = str.replace(/\s+/g,' ');
//   const match = string.match(/\d\d\d\d/);
//   return match ? match[0] : false;
// }
//
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'form.html'));
// });
//
// // Route to handle summation
// app.post('/summation', (req, res) => {
//   const n = parseInt(req.query.n);
//   const result = findSummation(n);
//   document.getElementById('summation-result').innerText = result;
//   res.send({ result });
//
// });
//
// // Route to handle uppercaseFirstandLast
// app.get('/uppercase', (req, res) => {
//   const str = req.query.str;
//   const result = uppercaseFirstandLast(str);
//   res.send({ result });
// });
//
// // Route to handle findAverage_and_Median
// app.post('/average_median', (req, res) => {
//   const numbers = req.body.numbers;
//   const result = findAverage_and_Median(numbers);
//   res.send({ result });
// });
//
// // Route to handle find4Digits
// app.get('/find4digits', (req, res) => {
//   const str = req.query.str;
//   const result = find4Digits(str);
//   res.send({ result });
// });
//
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Function to find the summation of numbers from 1 to N
function findSummation(n = 1) {
  if (typeof n !== 'number' || n <= 0) return false;
  return (n * (n + 1)) / 2;
}
// Function to capitalize the first and last letter of each word in a string
function uppercaseFirstandLast(str) {
  if (typeof str !== 'string') return false;
  return str.split(' ').map(word => {
    if (word.length < 2) return word.toUpperCase();
    return word[0].toUpperCase() + word.slice(1, -1) + word[word.length - 1].toUpperCase();
  }).join(' ');
}
// Function to find average and median of an array of numbers
function findAverage_and_Median(numbers) {
  if (!Array.isArray(numbers) || numbers.some(num => typeof num !== 'number')) return false;
  const sum = numbers.reduce((a, b) => a + b, 0);
  const average = sum / numbers.length;

  numbers.sort((a, b) => a - b);
  const mid = Math.floor(numbers.length / 2);
  const median = numbers.length % 2 !== 0 ? numbers[mid] : (numbers[mid - 1] + numbers[mid]) / 2;

  return { average, median };
}
// Function to find the first four-digit number in a string
function find4Digits(str) {
  if (typeof str !== 'string') return false;
  const numbers = str.split(' ');
  for (const num of numbers) {
    if (/^\d{4}$/.test(num)) {
      return num;
    }
  }
  return false;
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});
app.post('/summation', (req, res) => {
  const n = parseInt(req.body.n, 10);
  const result = findSummation(n);
  res.send(`<h1>Summation Result</h1><p>The summation of numbers from 1 to  ${n} is  :${result}</p>`);
});
app.post('/uppercaseFirstandLast',(req,res)=>{
  const str = req.body.string;
  const result=uppercaseFirstandLast(str);
  res.send(`<h1>to upper case result </h1><p>${result}</p>`)
})
// Route to handle findAverage_and_Median
app.post('/average_median', (req, res) => {
  const numbers = req.body.numbers.split(',').map(Number); // Parse the input string into an array of numbers
  const result = findAverage_and_Median(numbers);
  res.send(`<h1>Average and Median Result</h1><p>Average: ${result.average}, Median: ${result.median}</p>`);
});
app.post('/find4Digits', (req, res) => {
  const str = req.body.str;
  const result = find4Digits(str);
  res.send(`<h1>Find 4 Digits Result</h1><p>${result}</p>`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
