import { contractAddress, contractABI } from '../D_Checkup.js';

window.addEventListener("DOMContentLoaded", async () => {
  const address = localStorage.getItem("address");

 

    // 創建Web3實例
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
      return;
    }
    if (window.ethereum && window.ethereum.selectedAddress) {
      // 設置默認帳戶為已連接的帳戶
      web3.eth.defaultAccount = window.ethereum.selectedAddress;
    } else {
      console.log("請連接以太坊帳戶，或使用MetaMask等工具來連接您的帳戶。");
      return;
    }
    // 定義智能合約地址和ABI
    

    // 創建合約實例
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    
    contract.methods.isIdNumberUsed(address).call((error, result) => {
      if (!error) {
        if (result) {
          console.log("身分證號碼已存在於 List3 中");
        } else {
          console.log("身分證號碼 List3 中");
          alert("身分證字號輸入有誤或不存在！");
          localStorage.removeItem("address");
          window.history.back();
        }
      } else {
        console.error("调用 isIdNumberUsed 函数时出错：", error);
      }
    });
    // 身份證字號的資料
    contract.methods
      .getPregnantWomanInfo(address)
      .call()
      .then((result) => {
        // 处理 Solidity 函数的返回结果
        console.log("Pregnant Woman Info:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // 获取结果容器元素
    const resultContainer = document.getElementById("resultContainer");

    // 调用 Solidity 函数并更新结果容器中的内容
    contract.methods
      .getPregnantWomanInfo(address)
      .call()
      .then((result) => {
        // 处理 Solidity 函数的返回结果
        const html = `
      <br><p>孕婦姓名：${result[3]} &nbsp身分證字號：${result[2]}<br>錢包地址：${result[0]}</p>`;

        // 更新结果容器中的内容
        resultContainer.innerHTML = html;
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    //監聽表單提交事件
    const inspectionForm = document.getElementById("inspectionForm");
    inspectionForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // 阻止表單的預設提交行為

      // 從表單元素中獲取用戶輸入的值
      //const PATIENT_ADDRESS = document.getElementById('PATIENT_ADDRESS').value;
      const weight = document.getElementById("weight").value;
      const SBP = document.getElementById("SBP").value;
      const DBP = document.getElementById("DBP").value;
      const heart = document.getElementById("heart").value;
      const position = document.getElementById("position").value;
      const edema = document.getElementById("edema").value;
      const varicose_veins = document.getElementById("varicose_veins").value;

      const urine_protein = document.getElementById("urine_protein").value;
      const urine_sugar = document.getElementById("urine_sugar").value;

      const Bleeding = document.getElementById("Bleeding").value;
      const Stomach_ache = document.getElementById("Stomach_ache").value;
      const Headache = document.getElementById("Headache").value;
      const Spasms = document.getElementById("Spasms").value;

      const GAP = document.getElementById("GAP").value;
      const FHB = document.getElementById("FHB").value;
      const FCPosition = document.getElementById("FCPosition").value;
      const CRL = document.getElementById("CRL").value;
      const BPD = document.getElementById("BPD").value;
      const SR = document.getElementById("SR").value;
      const CID = document.getElementById("CID").value;

      //console.log('PATIENT_ADDRESS', PATIENT_ADDRESS);
      console.log("weight", weight);
      console.log("SBP", SBP);
      console.log("DBP", DBP);
      console.log("heart", heart);
      console.log("position", position);
      console.log("edema", edema);
      console.log("varicose_veins", varicose_veins);

      console.log("urine_protein", urine_protein);
      console.log("urine_sugar", urine_sugar);

      console.log("Bleeding", Bleeding);
      console.log("Stomach_ache", Stomach_ache);
      console.log("Headache", Headache);


      console.log("GAP", GAP);
      console.log("FHB", FHB);
      console.log("FCPosition", FCPosition);
      console.log("CRL", CRL);
      console.log("BPD", BPD);
      console.log("SR", SR);
      console.log("CID", CID);

      if (weight !== null) {
        try {
          const checkupData = [
            Stomach_ache,
            Stomach_ache,
            Headache,
            Spasms,
            weight,
            SBP,
            DBP,
            heart,
            position,
            edema,
            varicose_veins,
            urine_protein,
            urine_sugar,
            GAP,
            FHB,
            FCPosition,
            CRL,
            BPD,
            SR,
            CID,
          ];

          // 調用智能合約的setInfo函式，並將用戶輸入的值傳遞給該函式
          const receipt = await contract.methods
            .addCheckupResult(address, checkupData)
            .send({ from: web3.eth.defaultAccount });

          alert("成功新增資料！");
          console.log("交易收據：", receipt);
          // 在這裡處理交易收據或其他後續處理
        } catch (error) {
          alert(
            "錯誤：只有合約擁有者可以添加檢查結果！\nError : Only contract owner can add checkup result !"
          );
          console.error("設置合約狀態變數時出現錯誤：", error);
        }
      }
    });
  
});
