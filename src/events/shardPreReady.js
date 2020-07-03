class ShardPreReadyReceive {
    constructor (client) {
        this.client = client;
    }

    run (shardId) {
        console.log(`Starting shard: ${shardId}`);
    }
}

module.exports = ShardPreReadyReceive;
