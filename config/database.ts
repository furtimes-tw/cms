export default ({ env }) => ({
    connection: {
        client: 'postgres',
        connection: {
            host: env('DATABASE_HOST', 'localhost'),
            port: env.int('DATABASE_PORT', 5432),
            database: env('DATABASE_NAME', 'furtimes'),
            user: env('DATABASE_USERNAME', 'fttw'),
            password: env('DATABASE_PASSWORD', 'Furry_2025'),
            ssl: env.bool('DATABASE_SSL', false),
        },
    },
});

