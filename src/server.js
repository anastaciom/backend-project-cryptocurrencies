const app = require('./app')
const PORT = process.env.PORT | 3001
const mongoDBConnect = require('./database/config')
mongoDBConnect()

app.listen(PORT, () => {
    console.log('Server running on port', PORT)
})