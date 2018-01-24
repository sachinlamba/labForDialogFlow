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
