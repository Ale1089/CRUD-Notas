import pool from '../config/database.js';

const noteModel = {
    // Obtener todas las notas
    getAll: async () => {
        const result = await pool.query('SELECT * FROM notas ORDER BY id DESC');
        return result.rows;
    },

    // Crear una nota
    create: async (titulo, contenido, categoria) => {
        const query = 'INSERT INTO notas (titulo, contenido, categoria) VALUES ($1, $2, $3) RETURNING id';
        const values = [titulo, contenido, categoria];
        const result = await pool.query(query, values);
        return { insertId: result.rows[0].id };
    },

    // Actualizar una nota
    update: async (id, titulo, contenido, categoria) => {
        const query = 'UPDATE notas SET titulo = $1, contenido = $2, categoria = $3 WHERE id = $4 RETURNING *';
        const values = [titulo, contenido, categoria, id];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    // Eliminar una nota
    remove: async (id) => {
        const query = 'DELETE FROM notas WHERE id = $1';
        const result = await pool.query(query, [id]);
        return { affectedRows: result.rowCount };
    }
};

export default noteModel;