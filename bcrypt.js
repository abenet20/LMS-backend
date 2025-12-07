const bcrypt = require("bcrypt");

 bcrypt.hash("00001111", 10,(err, hash) => {
    if(err){
        console.log(err);
    }else{
        console.log("hashed", hash);
    }
 });