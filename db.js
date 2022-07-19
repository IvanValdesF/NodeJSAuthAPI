	
const config = {
  user: "NewSA",
  password: "pass",
  server: "DESKTOP-PAV3CGH",
  database: "SellsDB",
  options: {
    trustedconnection: true,
    enableArithAbort: true,
    instancename: "",
    trustServerCertificate: true
  },
  port: 61109
};
 
module.exports = config;


// const promise = require('bluebird');
// const options = {
//     promiseLib: promise,
//     query: e => {
//       console.log(e.query);
//     }
//   };

// const pgp = require('pg-promise')(options)



// const cn = {
//     host: process.env.PGHOST, // server name or IP address;
//     port: process.env.PGPORT,
//     database: process.env.PGDATABASE,
//     user: process.env.PGUSER,
//     password: process.env.PGPASSWORD
// };





// const db = pgp(cn);



// module.exports = db;