const contractAddress = '0x4b20CdE03f7229D035eF21820796b9086Fcd8091';
const contractABI =  [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "cid",
                "type": "uint256"
            }
        ],
        "name": "DataRecordAdded",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_userAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_dataString",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_ipfsHash1",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_ipfsHash2",
                "type": "string"
            }
        ],
        "name": "addDataRecord",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "dataRecords",
        "outputs": [
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "dataString",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "ipfsHash1",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "ipfsHash2",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "uploadTime",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_cid",
                "type": "uint256"
            }
        ],
        "name": "getDataRecord",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_userAddress",
                "type": "address"
            }
        ],
        "name": "getDataRecordsByAddress",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "recordCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

export { contractAddress, contractABI };