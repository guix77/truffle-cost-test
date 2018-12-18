pragma solidity >=0.4.21 <0.6.0;

import './ownership/Ownable.sol';

contract TruffleCostTest is Ownable {

    string myString = "Hello";

    event MyEvent(string _string);

    function getString() external view returns (string memory) {
        return myString;
    }

    function setString(string calldata _string) external onlyOwner {
        myString = _string;
        emit MyEvent(myString);
    }
}
