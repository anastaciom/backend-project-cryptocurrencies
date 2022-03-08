const app = require('./app')
const port = process.env.PORT || 3001
const mongoDBConnect = require('./database/config')
mongoDBConnect()

app.listen(port, () => {
    console.log('Server running on port', port)
})