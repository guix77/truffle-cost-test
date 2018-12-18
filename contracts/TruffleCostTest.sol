pragma solidity ^0.4.24;

import './ownership/Ownable.sol';

contract TruffleCostTest is Ownable {

    string myString = "Hello";

    event MyEvent(string _string);

    function getString() external view returns (string) {
        return myString;
    }

    function setString(string _string) external onlyOwner {
        myString = _string;
        emit MyEvent(myString);
    }
}
