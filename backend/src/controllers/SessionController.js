const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const sebo = await connection('sebo')
            .where('id', id)
            .select('name')
            .first();
        
        if (!sebo) {
            return response.status(400).json({ error: 'No Sebo found with this ID' });
        }

        return response.json(sebo);
    }
}
