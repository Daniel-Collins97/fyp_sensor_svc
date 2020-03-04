const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: '35.228.14.148',
  database: 'finalyearprojectdb',
  password: 'Daniel_joseph1',
})

const getAllSensorData = (request, response) => {
  pool.query('SELECT * FROM "Sensors"', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
}

const getSpecificSensorData = (request, response) => {
  const sensor_id = parseInt(request.params.sensor_id);

  pool.query('SELECT * FROM "Sensors" WHERE "sensor_id" = $1', [sensor_id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
}

const getSensorDatafromSpecificGame = (request, response) => {
  const game_id = parseInt(request.params.game_id);

  pool.query('SELECT * FROM "Sensors" WHERE "game_id" = $1', [game_id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
}

const getSensorDataFromSpecificUser = (request, response) => {
  const user_id = parseInt(request.params.user_id);

  pool.query('SELECT * FROM "Sensors" WHERE "user_id" = $1', [user_id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
}

const createSensorEntry = (request, response) => {
  const { user_id, game_id, impact_force, sensor_id } = request.body;

  pool.query('INSERT INTO "Sensors" ("user_id", "game_id", "impact_force", "sensor_id") VALUES ($1, $2, $3, $4)', [user_id, game_id, impact_force, sensor_id], (error) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Sensor Entry Added`);
  })
}

const updateSensorEntry = (request, response) => {
  const entry_id = parseInt(request.params.entry_id);
  const { game_id } = request.body;

  pool.query('UPDATE "Sensors" SET "game_id" = $1 WHERE "id" = $2', [game_id, entry_id], (error) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Sensor Entry ${entry_id} updated`)
  })
}

const deleteSensorEntry = (request, response) => {
  const entry_id = parseInt(request.params.entry_id);

  pool.query('DELETE FROM "Sensors" WHERE "id" = $1', [entry_id], (error) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Sensor Entry ${entry_id} deleted`)
  })
}

module.exports = {
  getAllSensorData,
  getSpecificSensorData,
  getSensorDatafromSpecificGame,
  getSensorDataFromSpecificUser,
  createSensorEntry,
  updateSensorEntry,
  deleteSensorEntry
}