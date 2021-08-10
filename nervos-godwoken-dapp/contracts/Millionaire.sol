pragma solidity >=0.8.0;

contract Millionaire {
  uint storeda;
  uint storedb;

  constructor() payable {
    storeda = 0;
    storedb = 0;
  }

  function seta(uint x) public payable {
    storeda = x;
  }

  function setb(uint y) public payable {
    storedb = y;
  }

  function change(uint x) public pure returns (uint) {
    return (2**x)*9;
  }

  function get() public view returns (string memory) {
    if(change(storeda)>change(storedb)){
      return "A is bigger than B";
    }
    else if (change(storeda)==change(storedb)){
      return "A is the same as B";
    }
    return "B is bigger than A";
  }
}