const app = require('./src/app')
const port = process.env.PORT || 3001
const mongoDBConnect = require('./src/database/config')
mongoDBConnect()

app.listen(port, () => {
    console.log('Server running on port', port)
})