# labForDialogFlow

first install gcloud and npm to use this app.


## server.js
this file is used to create gcloud server website.
  - npm install
  - gcloud app deploy
  - gcloud app browse
## index.js
this file is used to create webhook for DialogFlow project.
  - npm install
  - gcloud beta functions deploy LabDetails --stage-bucket makerlab --trigger-http


# app running urls - 
  http://localhost:8080/
  https://my-weather-1565d.appspot.com/
  https://my-weather-1565d.appspot.com/list_users
  https://my-weather-1565d.appspot.com/list_products
  
# webhook - 
  https://us-central1-my-weather-1565d.cloudfunctions.net/LabDetails
  
