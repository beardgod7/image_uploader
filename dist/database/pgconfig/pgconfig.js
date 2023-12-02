"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: 'postgres',
    logging: false,
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'francis',
    database: 'ibenefit',
    define: {
        underscored: true,
    },
    pool: {
        max: 50000,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
exports.default = sequelize;
