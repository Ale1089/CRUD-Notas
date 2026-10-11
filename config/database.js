import pkg from 'pg';
const { Pool } = pkg;

// Configura tus credenciales de PostgreSQL aquí o mediante variables de entorno
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'notas',
    password: '1234',
    port: 5432,
});

export default pool;