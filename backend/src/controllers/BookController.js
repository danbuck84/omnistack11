const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('books').count();

        const books = await connection('books')
            .join('sebo', 'sebo.id', '=', 'books.sebo_id')
            .limit(10)
            .offset((page - 1) * 5)
            .select([
                'books.*',
                'sebo.name',
                'sebo.email',
                'sebo.whatsapp',
                'sebo.city',
                'sebo.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);
        
        return response.json(books);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const sebo_id = request.headers.authorization;

        const [id] = await connection('books').insert({
            title,
            description,
            value,
            sebo_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const sebo_id = request.headers.authorization;

        const book = await connection('books')
            .where('id', id)
            .select('sebo_id')
            .first();
        
        if (book.sebo_id !== sebo_id) {
            return response.status(401).json({ error: 'You have no authorization.' });
        }

        await connection('books').where('id', id).delete();

        return response.status(204).send();
    }
};
