var sql = require("mssql");

var encryptConnection;

if (process.env.ENCRYPT == false || process.env.ENCRYPT == "false") {
    encryptConnection = false;
} else {
    encryptConnection = true;
}

var config = {
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    port: process.env.SQL_PORT,
    options: {
        // encrypt: process.env.ENCRYPT != "false" ? true : false,
        encrypt: encryptConnection,
    },
    connectionTimeout: 120 * 60 * 1000,
    requestTimeout: 1000000
};

module.exports = {
    getConnection: function () {
        return new Promise((resolve, reject) => {
            sql.connect(config, function (err) {
                resolve(new sql.Request());
            });
        });
    },

    startConnection: function () {
        return new Promise((resolve, reject) => {
            sql.connect(config, function (err) {
                if (err)
                    reject(err);
                resolve(true);
            })
        });
    },

    transaction: function () {
        return new sql.Transaction();
    },

    transactionRequest: function (transaction) {
        return new sql.Request(transaction);
    }
};