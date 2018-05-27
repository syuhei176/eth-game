pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/MonsterFactory.sol";

contract TestMonsterFactory {

  function testCreateMonster() public {
    MonsterFactory monsterFactory = MonsterFactory(DeployedAddresses.MonsterFactory());

    string expected = "aaa";

    Assert.equal(monsterFactory.createMonster("aaa").name, expected, "Owner should have 10000 MetaCoin initially");
  }

}
