const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(__dirname + '/db/is-it-down-db.db');

function DB (action, query) {
    return new Promise(function (resolve, reject) {
        db[action](query, (err, rows) => {
            if (err) reject(err);

            if (rows) {
                resolve(rows);
            } else {
                reject('Couldnt find anything with that name :(')
            }

        })
    })
}

module.exports = {
    getSites: () => {
        return DB('all', `SELECT siteUrl, lastAccess FROM sites`);
    },
    insertSite: (url) => {
        db.run("INSERT OR REPLACE into sites(siteUrl, lastAccess) VALUES ('" + url + "'," + new Date().getTime() + ")");
    }
};