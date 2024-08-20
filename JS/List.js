const contractAddress = '0xD5F255A6e9E78d94e43aab033F1ce28e14454B3c';
const contractABI = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_newOwner",
                type: "address",
            },
        ],
        name: "addOwner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
            {
                internalType: "string",
                name: "_hospitalName",
                type: "string",
            },
            {
                internalType: "string",
                name: "_employeeId",
                type: "string",
            },
            {
                internalType: "string",
                name: "_employeeName",
                type: "string",
            },
        ],
        name: "addToList1",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
            {
                internalType: "string",
                name: "_employeeId",
                type: "string",
            },
            {
                internalType: "string",
                name: "_employeeName",
                type: "string",
            },
            {
                internalType: "string",
                name: "_hospitalName",
                type: "string",
            },
        ],
        name: "addToList2",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_walletAddress",
                type: "address",
            },
            {
                internalType: "string",
                name: "_name",
                type: "string",
            },
            {
                internalType: "string",
                name: "_idNumber",
                type: "string",
            },
            {
                internalType: "string",
                name: "_hospitalName",
                type: "string",
            },
        ],
        name: "addToList3",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
        ],
        name: "checkList",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "displayList2Employees",
        outputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "employeeAddress",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "listName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "employeeId",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "employeeName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "hospitalName",
                        type: "string",
                    },
                ],
                internalType: "struct List123Manager.EmployeeInfo[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "displayList3PregnantWomen",
        outputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "walletAddress",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "listName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "idNumber",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "hospitalName",
                        type: "string",
                    },
                ],
                internalType: "struct List123Manager.PregnantWomanInfo[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_employeeId",
                type: "string",
            },
        ],
        name: "getEmployeeAddress",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
        ],
        name: "getEmployeeInfo",
        outputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "employeeAddress",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "listName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "employeeId",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "employeeName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "hospitalName",
                        type: "string",
                    },
                ],
                internalType: "struct List123Manager.EmployeeInfo",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "userAddress",
                type: "address",
            },
        ],
        name: "getHospitalNameForUser",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
        ],
        name: "getList1EmployeeId",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
        ],
        name: "getList1EmployeeName",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "userHospitalName",
                type: "string",
            },
        ],
        name: "getList2ByHospitalName",
        outputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "employeeAddress",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "listName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "employeeId",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "employeeName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "hospitalName",
                        type: "string",
                    },
                ],
                internalType: "struct List123Manager.EmployeeInfo[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "userHospitalName",
                type: "string",
            },
        ],
        name: "getList3PregnantWomenByHospitalName",
        outputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "walletAddress",
                        type: "address",
                    },
                    {
                        internalType: "string",
                        name: "listName",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "idNumber",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "hospitalName",
                        type: "string",
                    },
                ],
                internalType: "struct List123Manager.PregnantWomanInfo[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_idNumber",
                type: "string",
            },
        ],
        name: "getWalletAddressByIdNumber",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "isAddedToList1",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "isAddedToList2",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "idNumber",
                type: "string",
            },
        ],
        name: "isIdNumberUsed",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "isOwner",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "list1",
        outputs: [
            {
                internalType: "address",
                name: "employeeAddress",
                type: "address",
            },
            {
                internalType: "string",
                name: "hospitalName",
                type: "string",
            },
            {
                internalType: "string",
                name: "employeeId",
                type: "string",
            },
            {
                internalType: "string",
                name: "employeeName",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "list1EmployeeIds",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "list1EmployeeNames",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "list2",
        outputs: [
            {
                internalType: "address",
                name: "employeeAddress",
                type: "address",
            },
            {
                internalType: "string",
                name: "hospitalName",
                type: "string",
            },
            {
                internalType: "string",
                name: "employeeId",
                type: "string",
            },
            {
                internalType: "string",
                name: "employeeName",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "list3",
        outputs: [
            {
                internalType: "address",
                name: "walletAddress",
                type: "address",
            },
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "string",
                name: "idNumber",
                type: "string",
            },
            {
                internalType: "string",
                name: "hospitalName",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "owners",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
        ],
        name: "removeFromList1",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
        ],
        name: "removeFromList2",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
        ],
        name: "removeFromList3",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
        ],
        name: "upgradeToList1",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
export { contractAddress, contractABI };