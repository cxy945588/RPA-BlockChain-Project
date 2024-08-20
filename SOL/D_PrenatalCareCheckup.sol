// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "./List123Manager1.sol"; // 导入List123Manager合约的ABI

contract NewPrenatalCareCheckup {
    address public list123ManagerAddress; // 存储List123Manager合约地址

    //
    // 紀錄每一次檢查的結果
    struct Checkup {
        uint256 checkupTime; // 檢查時間
        CheckupData data;
    }
    struct CheckupData {
        string FCBleeding; //出血
        string FCStomach_ache; //腹痛
        string FCHeadache; //頭痛
        string FCSpasms; //痙攣
        string FCWeight; //體重
        string FCBlood_SBP; //血壓
        string FCBlood_DBP; //血壓
        string FCFetal_heart_sounds; //胎心音
        string FCFetal_position; //胎位
        string FCEdema; //浮腫
        string FCVaricose_veins; //靜脈曲張
        string FCUrine_protein; //尿蛋白
        string FCUrine_sugar; //尿糖

        string FCGAP; //胎數
        string FCFHB; //胎兒心跳
        string FCPosition; //著床位置
        string FCCRL; //胎兒頭臀長
        string FCBPD; //胎兒頭雙頂骨徑
        string FCSR; //篩檢結果


        string CID; //超音波圖片
    }
    // 建立檢查項目紀錄
    mapping(address => Checkup[]) public checkupRecord;

    //

    constructor(address _list123ManagerAddress) {
        list123ManagerAddress = _list123ManagerAddress;
    }

    // 调用List123Manager合约中的checkList函数，并返回结果
    function getWalletAddressByIdNum(
        string memory _idNumber
    ) public view returns (address) {
        // 使用 call 调用List123Manager合约的checkList函数
        List123Manager list123Manager = List123Manager(list123ManagerAddress);
        address AddressByIdNum = list123Manager.getWalletAddressByIdNumber(
            _idNumber
        );

        return AddressByIdNum;
    }

    function isAddressInList2(address _address) public view returns (bool) {
        List123Manager list123Manager = List123Manager(list123ManagerAddress);
        List123Manager.EmployeeInfo[] memory list2Employees = list123Manager
            .displayList2Employees();

        for (uint256 i = 0; i < list2Employees.length; i++) {
            if (list2Employees[i].employeeAddress == _address) {
                return true;
            }
        }

        return false;
    }

    // 檢查身份證字號是否已存在於 List3 中
    function isIdNumberUsed(string memory idNumber) public view returns (bool) {
        List123Manager list123Manager = List123Manager(list123ManagerAddress);
        List123Manager.PregnantWomanInfo[] memory list3PregnantWomen = list123Manager
            .displayList3PregnantWomen();
        for (uint256 i = 0; i < list3PregnantWomen.length; i++) {
            if (
                keccak256(abi.encodePacked(list3PregnantWomen[i].idNumber)) ==
                keccak256(abi.encodePacked(idNumber))
            ) {
                return true;
            }
        }
        return false;
    }
    
    function getPregnantWomanInfo(string memory idNumber) public view returns (List123Manager.PregnantWomanInfo memory) {
        List123Manager list123Manager = List123Manager(list123ManagerAddress);
        List123Manager.PregnantWomanInfo[] memory list3PregnantWomen = list123Manager.displayList3PregnantWomen();
        for (uint256 i = 0; i < list3PregnantWomen.length; i++) {
            if (
                keccak256(abi.encodePacked(list3PregnantWomen[i].idNumber)) ==
                keccak256(abi.encodePacked(idNumber))
            ) {
                return list3PregnantWomen[i];
            }
        }
        
        // 如果没有找到匹配的idNumber，返回一个空的PregnantWomanInfo结构
        List123Manager.PregnantWomanInfo memory emptyInfo;
        return emptyInfo;
    }

    function WomanInfoByAddress(address _walletAddress) public view returns (List123Manager.PregnantWomanInfo memory) {
        List123Manager list123Manager = List123Manager(list123ManagerAddress);
        List123Manager.PregnantWomanInfo[] memory list3PregnantWomen = list123Manager.displayList3PregnantWomen();
        for (uint256 i = 0; i < list3PregnantWomen.length; i++) {
            if (
                keccak256(abi.encodePacked(list3PregnantWomen[i].walletAddress)) ==
                keccak256(abi.encodePacked(_walletAddress))
            ) {
                return list3PregnantWomen[i];
            }
        }
        
        // 如果没有找到匹配的idNumber，返回一个空的PregnantWomanInfo结构
        List123Manager.PregnantWomanInfo memory emptyInfo;
        return emptyInfo;
    }



    function addCheckupResult(
        string memory _idNumber,
        CheckupData memory data
    ) public {
        // 只有合約擁有者才能新增檢查結果
        require(
            isAddressInList2(msg.sender),
            "Only List2 user can add checkup result"
        );

        Checkup memory newCheckup = Checkup({
            checkupTime: block.timestamp,
            data: data
        });
        address AddressByIdNum = getWalletAddressByIdNum(_idNumber);

        checkupRecord[AddressByIdNum].push(newCheckup); // 將新的檢查結果加入檢查紀錄中
    }

    // 查詢檢查結果
    function getCheckupRecord(
        string memory _idNumber
    ) public view returns (Checkup[] memory) {
        // 只有合約擁有者或患者才能查詢檢查紀錄
        address AddressByIdNum = getWalletAddressByIdNum(_idNumber);
        require(
            isAddressInList2(msg.sender) || msg.sender == AddressByIdNum,
            "Only List2 user or patient can view checkup record"
        );

        return checkupRecord[AddressByIdNum]; // 返回患者的檢查紀錄
    }
}
