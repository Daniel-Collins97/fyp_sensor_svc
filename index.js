const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./queries.js');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgress API' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

app.get('/sensors', db.getAllSensorData);
app.get('/sensors/sensor/:sensor_id', db.getSpecificSensorData);
app.get('/sensors/game/:game_id', db.getSensorDatafromSpecificGame);
app.get('/sensors/user/:user_id', db.getSensorDataFromSpecificUser);

app.post('/sensors', db.createSensorEntry);

app.put('/sensors/:entry_id', db.updateSensorEntry);

app.delete('/sensors/:entry_id', db.deleteSensorEntry);