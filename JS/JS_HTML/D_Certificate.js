import { contractAddress, contractABI } from "../D_check.js";

window.addEventListener("DOMContentLoaded", async () => {
    // 創建Web3實例
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        alert('No Ethereum provider detected. Please install MetaMask or use a browser with Ethereum support.');
        console.log("No Ethereum provider detected. Please install MetaMask or use a browser with Ethereum support.");
        return;
    }
    if (window.ethereum && window.ethereum.selectedAddress) {
        // 設置默認帳戶為已連接的帳戶
        web3.eth.defaultAccount = window.ethereum.selectedAddress;
    } else {
        alert('請連接以太坊帳戶，或使用MetaMask等工具來連接您的帳戶。');
        console.log("請連接以太坊帳戶，或使用MetaMask等工具來連接您的帳戶。");
        return;
    }


    // 建立合約實例
    const dataStorageContract = new web3.eth.Contract(contractABI, contractAddress);

    window.uploadData = async function () {
        const userAddress = document.getElementById("userAddress").value;
        const dataString = document.getElementById("dataString").value;
        const cid1 = document.getElementById("cid1").value;
        const cid2 = document.getElementById("cid2").value;

        try {
            const accounts = await web3.eth.requestAccounts();
            const senderAddress = accounts[0];

            // 檢查合約中是否存在 addDataRecord 函數
            if (dataStorageContract.methods.addDataRecord) {
                const result = await dataStorageContract.methods.addDataRecord(
                    userAddress,
                    dataString,
                    cid1,
                    cid2
                ).send({ from: senderAddress });

                document.getElementById("result").textContent = 'Data uploaded.';

                if (result.events && result.events.DataRecordAdded) {
                    const userAddress = result.events.DataRecordAdded.returnValues.userAddress;
                    const cid = result.events.DataRecordAdded.returnValues.cid;
                    document.getElementById("result").textContent += ` CID: ${userAddress}-${cid}`;
                } else {
                    document.getElementById("result").textContent += ' (Event not found)';
                }
            } else {
                console.error("addDataRecord function not found in the contract");
            }
        } catch (error) {
            console.error(error);
            document.getElementById("result").textContent = `Error uploading data: ${error.message}`;
        }
    };

    
});
