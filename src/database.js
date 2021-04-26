const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/simple-jwt', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    
})
    .then(db=>console.log('Database is connected'))