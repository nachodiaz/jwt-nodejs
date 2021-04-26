const app = require('./app')
            
//connection database
require('./database')

app.use(require('./controllers/auth.controller'))

async function init() {
    await app.listen(3000)
    console.log('Server on port 3000')
}

init () 