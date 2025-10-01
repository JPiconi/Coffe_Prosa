import { createConnection } from 'mysql';

const db = createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'cafe_prosa'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

export default db;
