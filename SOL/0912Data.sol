// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataStorageContract {
    struct DataRecord {
        address userAddress;
        string dataString; // 新增的 dataString 字段
        string ipfsHash1; // 第一個IPFS哈希
        string ipfsHash2; // 第二個IPFS哈希
        uint256 uploadTime;
    }

    DataRecord[] public dataRecords;
    uint256 public recordCount;

    event DataRecordAdded(address indexed userAddress, uint256 indexed cid);

    function addDataRecord(address _userAddress, string memory _dataString, string memory _ipfsHash1, string memory _ipfsHash2) public returns (uint256) {
        uint256 newCid = dataRecords.length;
        uint256 currentTime = block.timestamp;
        dataRecords.push(DataRecord(_userAddress, _dataString, _ipfsHash1, _ipfsHash2, currentTime));
        recordCount++;

        emit DataRecordAdded(_userAddress, newCid);

        return newCid; // 返回新生成的 CID
    }

    function getDataRecord(uint256 _cid) public view returns (address, string memory, string memory, string memory, uint256) {
        require(_cid < dataRecords.length, "Record with this CID does not exist");
        DataRecord memory record = dataRecords[_cid];
        return (record.userAddress, record.dataString, record.ipfsHash1, record.ipfsHash2, record.uploadTime);
    }

    function getDataRecordsByAddress(address _userAddress) public view returns (uint256[] memory) {
        uint256[] memory matchingRecords = new uint256[](recordCount);
        uint256 matchCount = 0;

        for (uint256 i = 0; i < recordCount; i++) {
            if (dataRecords[i].userAddress == _userAddress) {
                matchingRecords[matchCount] = i;
                matchCount++;
            }
        }

        uint256[] memory result = new uint256[](matchCount);
        for (uint256 i = 0; i < matchCount; i++) {
            result[i] = matchingRecords[i];
        }

        return result;
    }
}
