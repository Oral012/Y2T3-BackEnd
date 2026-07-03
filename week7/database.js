const Sequalize = require('sequelize');
const sequelize = new Sequalize('backendW7', 'root', 'root',{
    host: 'localhost',
    dialect: 'mysql',
    port: 8889,
})