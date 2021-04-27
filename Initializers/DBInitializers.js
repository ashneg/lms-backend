const mongoose = require('mongoose');

//Connection to MongoDB
module.exports = function(){
    mongoose.set('useCreateIndex', true);
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.set('useFindAndModify', false);

    mongoose.connect(`mongodb+srv://ashneg:@3dU9qXBn_!AWya@mainmongo.wisd3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
            .then(()=>console.log(`## successful connection => ${mongoose.connection.host}`))
}