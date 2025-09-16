const express = require('express')
const mongoose = require('mongoose');
const { Client } = require('pg')
const redis = require('redis')
// app init
const app = express();
const PORT = process.env.PORT || 4000;
const HOST = '0.0.0.0';
// const HOST = 'localhost';

// connect to redis
const REDIS_PORT = 6379
const REDIS_HOST = 'redis'
const redisClient = redis.createClient(
    { url: `redis://${REDIS_HOST}:${REDIS_PORT}` }
)
// const redisClient = redis.createClient()
redisClient.on("error", (err) => console.log("Redis Client Error", err))
redisClient.on("connect", () => console.log("successfully connected to redis"))
redisClient.connect()
// connect to DB
const DB_USER = 'root'
const DB_PASSWORD = 'example'
const DB_PORT = 5432
const DB_HOST = "postgres"
const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
const client = new Client({
    connectionString: URI
})
client
    .connect()
    .then(() => console.log('successfully connected to postgres DB'))
    .catch((err) => console.log('failed to connect to postgres DB: ', err)
    );
// const DB_USER = 'root'
// const DB_PASSWORD = 'example'
// const DB_PORT = 27017
// // const DB_HOST = "172.18.0.2"
// const DB_HOST = "mongo"
// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
// mongoose
//     .connect(URI)
//     .then(() => console.log('successfully connected to DB'))
//     .catch((err) => console.log('failed to connect: ', err)
//     );

// app.get('/', (req, res) => res.send('<h1>welcome Anis to App!</h1><p>hello Anis</p>'));
app.get('/', (req, res) => {
    redisClient.set('products', 'porducts...')
    // res.send('<h1>welcome Anis to App!</h1>')
    res.send('<h1>welcome Anis to App from AWS!</h1><p>hello Anis from AWS</p>')
});
app.get('/data', (req, res) => {
    const products = redisClient.get('products')
    console.log(products);
    res.send(`<h1>welcome Anis to App! hh</h1><p>${products}</p>`)
});
app.listen(PORT, () => console.log(`app is running on http://${HOST}:${PORT}`));