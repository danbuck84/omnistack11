const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const sebo_id = request.headers.authorization;

        const books = await connection('books')
            .where('sebo_id', sebo_id)
            .select('*');

        return response.json(books);
    }
}
