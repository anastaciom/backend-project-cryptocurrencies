const app = require('./app')
const mongoDBConnect = require('./database/config')
mongoDBConnect()

app.listen(process.env.PORT || 3001, () => {
    console.log('Server running')
})