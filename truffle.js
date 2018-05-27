var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*" // Match any network id
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, process.env.INFURA_ENDPOINT);
      },
      port: 8545,
      gas: 2900000,
      network_id: '42'
    }
  }
};
