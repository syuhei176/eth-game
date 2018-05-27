pragma solidity ^0.4.2;

contract MonsterFactory {

    event NewMonster(uint zombieId, Monster monster);

    struct Monster {
        string name;
        uint8 hp;
        uint8[3] skills;
    }

    Monster[] public monsters;

	mapping (address => uint) balances;
    mapping (uint => address) public monsterToOwner;
    mapping (address => uint) public ownerToMonster;
    mapping (address => uint) ownerMonsterCount;

	function MonsterFactory() public {
		balances[tx.origin] = 100000;
	}

    function createMonster(string _name) public {
        require(ownerMonsterCount[msg.sender] == 0);
        Monster memory monster = _generateRandomMonster(_name);
        _createMonster(monster);
    }

    function getMonsterCount() public view returns (uint256) {
        return monsters.length;
    }

    function getMonster(uint _id) public view returns (string, uint8) {
        Monster memory monster = monsters[_id];
        return (monster.name, monster.hp);
    }

    function getMonsters() public view returns (string, uint8) {
        uint id = ownerToMonster[msg.sender];
        Monster memory monster = monsters[id];
        return (monster.name, monster.hp);
    }

    function _generateRandomMonster(string name) private view returns (Monster) {
        uint8 power = 100;
        bytes32 namehash = keccak256(name);
        uint8 hp = uint8(namehash[0]);
        hp = hp % 100;
        power = power - hp;
        uint8[3] memory skills;
        skills[0] = uint8(namehash[1]);
        skills[0] = (skills[0] % power);
        power = power - skills[0];
        skills[1] = uint8(namehash[2]);
        skills[1] = skills[1] % power;
        power = power - skills[1];
        skills[2] = power;
        return Monster(name, hp, skills);
    }

    function _createMonster(Monster monster) internal {
        uint id = monsters.push(monster) - 1;
        monsterToOwner[id] = msg.sender;
        ownerToMonster[msg.sender] = id;
        ownerMonsterCount[msg.sender]++;
        NewMonster(id, monster);
    }

}