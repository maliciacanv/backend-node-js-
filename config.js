const config = {
    dbUrl: process.env.DB_URL || 'mongodb+srv://db_user_chat:dbuserchat@cluster0-8idkn.mongodb.net/test',
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'http://localhost',
    publicRoute: process.env.PUBLIC_ROUTE || '/app',
    filesRoute: process.env.FILES_ROUTE || 'files',
}

module.exports = config;