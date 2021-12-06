if(process.env.MODE==="DEV"){
    const dotenv = require("dotenv").config();
}


module.exports = process.env;
