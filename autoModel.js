/*
 * @Date: 2023-08-03 10:01:55
 * @LastEditTime: 2023-08-04 14:44:22
 */
const SequelizeAuto = require('sequelize-auto')

const { database, user, password, host, dbPort } = require('./config/index')

const auto = new SequelizeAuto(database, user, password, {
        host,
        dialect: 'mysql',
        directory: './models', // where to write files
        port: dbPort,
        caseModel: 'p', // convert snake_case column names to camelCase field names: user_id -> userId
        caseFile: 'c', // file names created for each model use camelCase.js not snake_case.js
        // singularize: true, // convert plural table names to singular model names
        additional: {
                timestamps: false
                // ...options added to each model
        },
})


auto.run(function (err) {
        if (err) throwerr;//console.log(auto.tables); // table list
        //console.log(auto.foreignKeys); // foreign key list
        //生成models表后，直接执行项目
        // require('./bin/www');
});