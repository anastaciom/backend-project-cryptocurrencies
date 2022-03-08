const app = require('./src/app')
const mongoDBConnect = require('./src/database/config')
mongoDBConnect()

app.listen(process.env.PORT || 3001, () => {
    console.log('Server running')
})