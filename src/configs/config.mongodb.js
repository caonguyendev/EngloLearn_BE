// Development config
const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 8080
    },
    db: {
        connectionString: process.env.DEV_MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017/shopDev'
    }
}

// Production config
const production = {
    app: {
        port: process.env.PRO_APP_PORT || 8000
    },
    db: {
        connectionString: process.env.PRO_MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017/shopPro'
    }
}

const config = { dev, production };
const env = process.env.NODE_ENV || 'dev';
console.log("🚀 ~ file: config.mongodb.js:23 ~ env:", env)

module.exports = config[env];
