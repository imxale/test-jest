const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');

const mongod = new MongoMemoryServer();

module.exports = {
    connect: async () => {
        const uri = await mongod.getUri();
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        return client;
    },
    close: async (client) => {
        await client.close();
        await mongod.stop();
    }
};
