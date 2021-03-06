const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./queries.js');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgress API' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}. (Docker Container Port 3002)`)
})

app.get('/sensors', db.getAllSensorData);
app.get('/sensors/sensor/:sensor_id', db.getSpecificSensorData);
app.get('/sensors/game/:game_id', db.getSensorDatafromSpecificGame);
app.get('/sensors/user/:user_id', db.getSensorDataFromSpecificUser);

app.post('/sensors/addSensorEntry/:user_id/:game_id', db.createSensorEntry);

app.put('/sensors/:entry_id', db.updateSensorEntry);

app.delete('/sensors/:entry_id', db.deleteSensorEntry);