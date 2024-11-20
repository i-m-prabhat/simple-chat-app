const dotenv = require("dotenv");
dotenv.config({ path: './.env' });
const app = require("./app");
const http = require("http");

const dbConfig = require('./config/dbConfig')

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () =>
{
    console.log(`Server is running on port ${port}`);
})