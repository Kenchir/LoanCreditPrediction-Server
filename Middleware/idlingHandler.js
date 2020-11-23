const request = require("request");
const handleIdling = (url) => {
  request(url, (error, response, body) => {
    if (error) throw new Error(error);
  });
};
setInterval(() => {
  handleIdling("https://loan-eligibility-adalabs.herokuapp.com/home");
}, 1000 * 60 * 5);

setInterval(() => {
handleIdling("https://loan-prediction.herokuapp.com/home");
}, 1000 * 60 * 5);

setInterval(() => {
 handleIdling("https://loan-pred-back.herokuapp.com/");
}, 1000 * 60 * 5);


module.exports = handleIdling;
