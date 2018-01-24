//npm install
//gcloud beta functions deploy LabDetails --stage-bucket makerlab --trigger-http
//webhook for DailogFlow -> https://us-central1-my-weather-1565d.cloudfunctions.net/LabDetails

const http = require('http');

exports.LabDetails = (req, res) => {
  // let city = req.body.result.parameters['geo-city']; // city is a required param
  let list_type = req.body.result.parameters['list']; // city is a required param
  if(list_type == "products"){
      callProducts().then((output) => {
        // Return the results of the weather API to Dialogflow
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ 'speech': output, 'displayText': output }));
      }).catch((error) => {
        // If there is an error let the user know
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ 'speech': error, 'displayText': error }));
      });
  }else{
    callUsers().then((output) => {
      // Return the results of the weather API to Dialogflow
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ 'speech': output, 'displayText': output }));
    }).catch((error) => {
      // If there is an error let the user know
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ 'speech': error, 'displayText': error }));
    });
  }
};
function callProducts () {
  return new Promise((resolve, reject) => {
    let path = '/list_products';
    http.get({host: "my-weather-1565d.appspot.com", path: path}, (res) => {
      let body = ''; // var to store the response chunks
      res.on('data', (d) => { body += d; }); // store each response chunk
      res.on('end', () => {
        // After all the data has been received parse the JSON for desired data
        let response = JSON.parse(body);
        // Create response
        let a = JSON.stringify(response)
        let output = `Product list in MongoDB mLab ${a}`;
        // response.forEach(function (product, i) {
        //   output += i + " " product.name + " \n"
        // })
        // Resolve the promise with the output text
        console.log(output);
        resolve(output);
      });
      res.on('error', (error) => {
        resolve("output7");
        reject(error);
      });
    });
  });
}
function callUsers () {
  return new Promise((resolve, reject) => {
    let path = '/list_users';
    http.get({host: "my-weather-1565d.appspot.com", path: path}, (res) => {
      let body = ''; // var to store the response chunks
      res.on('data', (d) => { body += d; }); // store each response chunk
      res.on('end', () => {
        // After all the data has been received parse the JSON for desired data
        let response = JSON.parse(body);
        // Create response
        let a = JSON.stringify(response)
        let output = `Users list in MongoDB mLab ${a}`;
        // response.forEach(function (product, i) {
        //   output += i + " " product.name + " \n"
        // })
        // Resolve the promise with the output text
        console.log(output);
        resolve(output);
      });
      res.on('error', (error) => {
        resolve("output7");
        reject(error);
      });
    });
  });
}
