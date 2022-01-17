const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose.connect(DB
    //     {
    //     useNewUrlParser: true,
    //     useCreateIndex: true,
    //     useUnifiendTopology: true,
    //     useFindAndModify: false
    // }
    ).then(() =>{
        console.log('connection is successful');
    }).catch((err) =>{
        console.log(' no connection' , err);
    });
    