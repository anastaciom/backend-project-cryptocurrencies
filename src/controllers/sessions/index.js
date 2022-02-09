
const api = require('../../config/api')

const sessions = async (req, res) => {
    try {
        const { data } = await api.get('markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h')
        return res.status(200).json({ data: data })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'internal error' })
    }
}


module.exports = { sessions }