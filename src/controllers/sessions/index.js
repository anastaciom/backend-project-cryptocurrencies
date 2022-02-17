const UserModel = require('../../models/User');
const api = require('../../config/api')

const sessions = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId.id);
        if (!user) {
        return res.status(404).json({ message: `User does not exist or is not authenticated` })  
        } 
        const { data } = await api.get('markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h')

        return res.status(200).json({ data: data, user: {name: user.name, email: user.email}})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'internal error' })
    }
}


module.exports = { sessions }