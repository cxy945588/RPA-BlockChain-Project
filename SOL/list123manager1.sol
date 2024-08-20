// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract List123Manager {
    address[] public owners;

    constructor() {
        owners.push(msg.sender);
        isOwner[msg.sender] = true;
    }
    

    struct Employee {
        address employeeAddress;
        string hospitalName;
        string employeeId;
        string employeeName;
    }

    struct EmployeeInfo {
        address employeeAddress;
        string listName;
        string employeeId;
        string employeeName;
        string hospitalName;
    }

    struct PregnantWoman {
        address walletAddress;
        string name;
        string idNumber;
        string hospitalName;
    }
    struct PregnantWomanInfo {
        address walletAddress;
        string listName;
        string idNumber;
        string name;
        string hospitalName;
    }

    Employee[] public list1;
    Employee[] public list2;
    PregnantWoman[] public list3;

    mapping(address => bool) public isAddedToList1;
    mapping(address => bool) public isAddedToList2;
    mapping(address => string) public list1EmployeeIds;
    mapping(address => string) public list1EmployeeNames;
    mapping(address => bool) public isOwner;
    
    modifier onlyOwnerOrList1() {
        require(
            isOwner[msg.sender] || isAddedToList1[msg.sender],
            "Not authorized"
        );
        _;
    }
    modifier onlyOwner() {
        require(isOwner[msg.sender], "Only an owner can call this function");
        _;
    }

    // 添加新的拥有者，并允许他们调用list1函数
    function addOwner(address _newOwner) public onlyOwner {
        require(!isOwner[_newOwner], "Address is already an owner");
        owners.push(_newOwner);
        isOwner[_newOwner] = true;
    }

    function addToList1(
        address _address,
        string memory _hospitalName,
        string memory _employeeId,
        string memory _employeeName
    ) public onlyOwnerOrList1 {
        require(!isAddedToList1[_address], "Address is already in List 1");

        list1EmployeeIds[_address] = _employeeId;
        list1EmployeeNames[_address] = _employeeName;

        

        Employee memory newEmployee = Employee({
            employeeAddress: _address,
            hospitalName: _hospitalName,
            employeeId: _employeeId,
            employeeName: _employeeName
        });

        list1.push(newEmployee);
        isAddedToList1[_address] = true;
    }

    function getList1EmployeeId(
        address _address
    ) public view returns (string memory) {
        return list1EmployeeIds[_address];
    }

    function getList1EmployeeName(
        address _address
    ) public view returns (string memory) {
        return list1EmployeeNames[_address];
    }

    function removeFromList1(address _address) public {
        require(isAddedToList1[_address], "Address is not in List 1");
        for (uint256 i = 0; i < list1.length; i++) {
            if (list1[i].employeeAddress == _address) {
                list1[i] = list1[list1.length - 1];
                list1.pop();
                isAddedToList1[_address] = false;
                break;
            }
        }
    }

    function addToList2(
    address _address,
    string memory _employeeId,
    string memory _employeeName,
    string memory _hospitalName
    ) public {
    require(
        !isAddedToList1[_address],
        "Address is already in List 1"
    );
    require(
        !isAddedToList2[_address],
        "Address is already in List 2"
    );

    Employee memory newEmployee = Employee({
        employeeAddress: _address,
        hospitalName: _hospitalName,
        employeeId: _employeeId,
        employeeName: _employeeName
    });

    list2.push(newEmployee);
    isAddedToList2[_address] = true;
}


    function removeFromList2(address _address) public {
        require(isAddedToList2[_address], "Address is not in List 2");

        int256 employeeIndex = findEmployeeIndexInList2(_address);

        if (employeeIndex != type(int256).max) {
            list2[uint256(employeeIndex)] = list2[list2.length - 1];
            list2.pop();
            isAddedToList2[_address] = false;
        }
    }

    // 帮助函数：查找员工在 List 2 中的索引
    function findEmployeeIndexInList2(address _address)
        internal
        view
        returns (int256)
    {
        for (int256 i = 0; i < int256(list2.length); i++) {
            if (list2[uint256(i)].employeeAddress == _address) {
                return i;
            }
        }
        return type(int256).max;
    }

     function upgradeToList1(address _address) public onlyOwnerOrList1 {
        require(isAddedToList2[_address], "Address is not in List 2");

    // 查找员工在 List2 中的索引
    int256 employeeIndex = findEmployeeIndexInList2(_address);

        if (employeeIndex != type(int256).max) { // 使用 int256 的最大值
            // 复制员工信息
            Employee memory employeeToMove = list2[uint256(employeeIndex)];

            // 从 List 2 中移除员工
            removeFromList2(_address);

            // 将员工信息添加到 List 1，不需要提供 hospitalName 参数
            addToList1(employeeToMove.employeeAddress, "", employeeToMove.employeeId, employeeToMove.employeeName);
        }
    }
    function displayList2Employees() public view returns (EmployeeInfo[] memory) {
        EmployeeInfo[] memory employees = new EmployeeInfo[](list2.length);

        for (uint256 i = 0; i < list2.length; i++) {
            employees[i] = EmployeeInfo({
                listName: "List 2",
                employeeAddress: list2[i].employeeAddress,
                employeeId: list2[i].employeeId,
                employeeName: list2[i].employeeName,
                hospitalName: list2[i].hospitalName
            });
        }

        return employees;
    }

function getList2ByHospitalName(string memory userHospitalName) public view returns (EmployeeInfo[] memory) {
    EmployeeInfo[] memory matchingEmployees = new EmployeeInfo[](list2.length);
    uint256 matchingCount = 0;

    for (uint256 i = 0; i < list2.length; i++) {
        if (keccak256(abi.encodePacked(list2[i].hospitalName)) == keccak256(abi.encodePacked(userHospitalName))) {
            matchingEmployees[matchingCount] = EmployeeInfo({
                listName: "List 2",
                employeeAddress: list2[i].employeeAddress,
                employeeId: list2[i].employeeId,
                employeeName: list2[i].employeeName,
                hospitalName: list2[i].hospitalName
            });
            matchingCount++;
        }
    }

    // 创建一个新的数组，只包含匹配的员工信息
    EmployeeInfo[] memory result = new EmployeeInfo[](matchingCount);
    for (uint256 j = 0; j < matchingCount; j++) {
        result[j] = matchingEmployees[j];
    }

    return result;
}



// 辅助函数，获取调用者的医院名称
function getHospitalName(address _address) internal view returns (string memory) {
    for (uint256 i = 0; i < list1.length; i++) {
        if (list1[i].employeeAddress == _address) {
            return list1[i].hospitalName;
        }
    }
    return "";
}

    //p
    function addToList3(
        address _walletAddress,
        string memory _name,
        string memory _idNumber,
        string memory _hospitalName
    ) public {
        require(
            !isAddedToList1[_walletAddress],
            "Address is already in List 1"
        );
        require(
            !isAddedToList2[_walletAddress],
            "Address is already in List 2"
        );

        // 檢查身份證字號是否已存在於 List3 中
        require(
            !isIdNumberUsed(_idNumber),
            "ID number already exists in List 3"
        );

        PregnantWoman memory newPregnantWoman = PregnantWoman({
            walletAddress: _walletAddress,
            name: _name,
            idNumber: _idNumber,
            hospitalName: _hospitalName
        });

        list3.push(newPregnantWoman);
    }

    // 檢查身份證字號是否已存在於 List3 中
    function isIdNumberUsed(string memory idNumber) public view returns (bool) {
    for (uint256 i = 0; i < list3.length; i++) {
        if (
            keccak256(abi.encodePacked(list3[i].idNumber)) ==
            keccak256(abi.encodePacked(idNumber))
        ) {
            return true;
        }
    }
    return false;
}


    function removeFromList3(address _address) public {
        require(
                isOwner[msg.sender] ||
                isAddedToList1[msg.sender] ||
                isAddedToList2[msg.sender],
            "Not authorized to remove from List 3"
        );

        for (uint256 i = 0; i < list3.length; i++) {
            if (list3[i].walletAddress == _address) {
                // 使用 list3[i] 來表示找到的孕婦，將其標記為已刪除
                list3[i] = list3[list3.length - 1];
                list3.pop();
                break;
            }
        }
    }

    function displayList3PregnantWomen()
        public
        view
        returns (PregnantWomanInfo[] memory)
    {
        PregnantWomanInfo[] memory pregnantWomen = new PregnantWomanInfo[](
            list3.length
        );

        for (uint256 i = 0; i < list3.length; i++) {
            pregnantWomen[i] = PregnantWomanInfo({
                listName: "List 3",
                idNumber: list3[i].idNumber,
                name: list3[i].name,
                walletAddress: list3[i].walletAddress,
                hospitalName: list3[i].hospitalName
            });
        }

        return pregnantWomen;
    }

    function getList3PregnantWomenByHospitalName(
        string memory userHospitalName
    ) public view returns (PregnantWomanInfo[] memory) {
        PregnantWomanInfo[]
            memory matchingPregnantWomen = new PregnantWomanInfo[](
                list3.length
            );
        uint256 matchingCount = 0;

        for (uint256 i = 0; i < list3.length; i++) {
            if (
                keccak256(abi.encodePacked(list3[i].hospitalName)) ==
                keccak256(abi.encodePacked(userHospitalName))
            ) {
                matchingPregnantWomen[matchingCount] = PregnantWomanInfo({
                    listName: "List 3",
                    idNumber: list3[i].idNumber,
                    name: list3[i].name,
                    walletAddress: list3[i].walletAddress,
                    hospitalName: list3[i].hospitalName
                });
                matchingCount++;
            }
        }

        // 创建一个新的数组，只包含匹配的孕妇信息
        PregnantWomanInfo[] memory result = new PregnantWomanInfo[](
            matchingCount
        );
        for (uint256 j = 0; j < matchingCount; j++) {
            result[j] = matchingPregnantWomen[j];
        }

        return result;
    }
    function checkList(address _address) public view returns (string memory) {
        for (uint256 i = 0; i < list1.length; i++) {
            if (list1[i].employeeAddress == _address) {
                return "Address is in List 1";
            }
        }
        for (uint256 i = 0; i < list2.length; i++) {
            if (list2[i].employeeAddress == _address) {
                return "Address is in List 2";
            }
        }
        for (uint256 i = 0; i < list3.length; i++) {
            if (list3[i].walletAddress == _address) {
                return "Address is in List 3";
            }
        }
        return "Address is not in any list";
    }

    function getEmployeeInfo(
        address _address
    ) public view returns (EmployeeInfo memory) {
        // 检查地址是否在 List1 中
        for (uint256 i = 0; i < list1.length; i++) {
            if (list1[i].employeeAddress == _address) {
                return
                    EmployeeInfo({
                        listName: "List 1",
                        employeeAddress: list1[i].employeeAddress,
                        employeeId: list1[i].employeeId,
                        employeeName: list1[i].employeeName,
                        hospitalName: list1[i].hospitalName // 转换为字符串
                    });
            }
        }
        // 检查地址是否在 List2 中
        for (uint256 i = 0; i < list2.length; i++) {
            if (list2[i].employeeAddress == _address) {
                return
                    EmployeeInfo({
                        listName: "List 2",
                        employeeAddress: list2[i].employeeAddress,
                        employeeId: list2[i].employeeId,
                        employeeName: list2[i].employeeName,
                        hospitalName: list2[i].hospitalName // 转换为字符串，并包括医院名称
                    });
            }
        }
        return
            EmployeeInfo({
                listName: "Not found",
                employeeAddress: address(0),
                employeeId: "",
                employeeName: "",
                hospitalName: ""
            }); // 地址不在任何列表中
    }

    function getHospitalNameForUser(
        address userAddress
    ) public view returns (string memory) {
        require(isAddedToList1[userAddress], "Unauthorized");

        for (uint256 i = 0; i < list1.length; i++) {
            if (list1[i].employeeAddress == userAddress) {
                return list1[i].hospitalName;
            }
        }
        return "";
    }

    function getEmployeeAddress(
        string memory _employeeId
    ) public view returns (address) {
        for (uint256 i = 0; i < list1.length; i++) {
            if (
                keccak256(abi.encodePacked(list1[i].employeeId)) ==
                keccak256(abi.encodePacked(_employeeId))
            ) {
                return list1[i].employeeAddress;
            }
        }
        for (uint256 i = 0; i < list2.length; i++) {
            if (
                keccak256(abi.encodePacked(list2[i].employeeId)) ==
                keccak256(abi.encodePacked(_employeeId))
            ) {
                return list2[i].employeeAddress;
            }
        }
        // 如果没有找到匹配的员工，可以返回一个默认值或抛出异常
        revert("Employee not found");
    }
    function getWalletAddressByIdNumber(string memory _idNumber) public view returns (address) {
    for (uint256 i = 0; i < list3.length; i++) {
        if (
            keccak256(abi.encodePacked(list3[i].idNumber)) ==
            keccak256(abi.encodePacked(_idNumber))
        ) {
            return list3[i].walletAddress;
        }
    }
    // 如果没有找到匹配的 idNumber，可以返回一个默认值或抛出异常
    revert("IdNumber not found in List 3");
}

}