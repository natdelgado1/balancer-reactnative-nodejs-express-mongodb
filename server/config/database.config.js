const mongoose = require('mongoose');

const DB_NAME = "BalancerReactNative";

mongoose.set('strictQuery', false);//importante
mongoose.connect(`mongodb://127.0.0.1/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("CONNECTED TO DB"))
    .catch(err => console.log("ERROR WITH DB: " + err))