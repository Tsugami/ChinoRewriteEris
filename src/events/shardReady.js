class ShardReadyReceive {
    constructor (client) {
        this.client = client;
    }

    run (shardId) {
        console.log(`Shard: ${shardId} is ready`);
    }
}

module.exports = ShardReadyReceive;
