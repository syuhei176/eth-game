const Todos = artifacts.require("./MonsterFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(Todos);
};
