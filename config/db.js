import { Sequelize } from 'sequelize';


const db = new Sequelize('new_schema_1', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

export default db