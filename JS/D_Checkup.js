const contractAddress = "0x7DC782b927f0A2F7F0d0084ad7E37A46C5EE51b4";
const contractABI =[
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_list123ManagerAddress",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor",
        "signature": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_walletAddress",
                "type": "address"
            }
        ],
        "name": "WomanInfoByAddress",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "walletAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "listName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "idNumber",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "hospitalName",
                        "type": "string"
                    }
                ],
                "internalType": "struct List123Manager.PregnantWomanInfo",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0x41318b00"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_idNumber",
                "type": "string"
            },
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "FCBleeding",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCStomach_ache",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCHeadache",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCSpasms",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCWeight",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCBlood_SBP",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCBlood_DBP",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCFetal_heart_sounds",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCFetal_position",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCEdema",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCVaricose_veins",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCUrine_protein",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCUrine_sugar",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCGAP",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCFHB",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCPosition",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCCRL",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCBPD",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCSR",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "CID",
                        "type": "string"
                    }
                ],
                "internalType": "struct NewPrenatalCareCheckup.CheckupData",
                "name": "data",
                "type": "tuple"
            }
        ],
        "name": "addCheckupResult",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xd7f8927e"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "checkupRecord",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "checkupTime",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "FCBleeding",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCStomach_ache",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCHeadache",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCSpasms",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCWeight",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCBlood_SBP",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCBlood_DBP",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCFetal_heart_sounds",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCFetal_position",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCEdema",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCVaricose_veins",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCUrine_protein",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCUrine_sugar",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCGAP",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCFHB",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCPosition",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCCRL",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCBPD",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "FCSR",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "CID",
                        "type": "string"
                    }
                ],
                "internalType": "struct NewPrenatalCareCheckup.CheckupData",
                "name": "data",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0x97005911"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_idNumber",
                "type": "string"
            }
        ],
        "name": "getCheckupRecord",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "checkupTime",
                        "type": "uint256"
                    },
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "FCBleeding",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "FCStomach_ache",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "FCHeadache",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "FCSpasms",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "FCWeight",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "FCBlood_SBP",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "FCBlood_DBP",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "FCFetal_heart_sounds",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "FCFetal_position",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "FCEdema",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "FCVaricose_veins",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "FCUrine_protein",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "FCUrine_sugar",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "FCGAP",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "FCFHB",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "FCPosition",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "FCCRL",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "FCBPD",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "FCSR",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "CID",
                                "type": "string"
                            }
                        ],
                        "internalType": "struct NewPrenatalCareCheckup.CheckupData",
                        "name": "data",
                        "type": "tuple"
                    }
                ],
                "internalType": "struct NewPrenatalCareCheckup.Checkup[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0x376336ce"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "idNumber",
                "type": "string"
            }
        ],
        "name": "getPregnantWomanInfo",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "walletAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "listName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "idNumber",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "hospitalName",
                        "type": "string"
                    }
                ],
                "internalType": "struct List123Manager.PregnantWomanInfo",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0xa493c56d"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_idNumber",
                "type": "string"
            }
        ],
        "name": "getWalletAddressByIdNum",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0x016803c7"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "isAddressInList2",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0x4c0d409c"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "idNumber",
                "type": "string"
            }
        ],
        "name": "isIdNumberUsed",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0xfbb0048d"
    },
    {
        "inputs": [],
        "name": "list123ManagerAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true,
        "signature": "0x12a5310d"
    }
]; 
export { contractAddress, contractABI };