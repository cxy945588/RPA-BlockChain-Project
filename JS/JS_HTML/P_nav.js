import { contractAddress, contractABI } from "../D_Checkup.js";

window.addEventListener("DOMContentLoaded", async () => {
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
  // 獲取當前使用者錢包地址
  const accounts = await web3.eth.getAccounts();
  const userAddress = accounts[0];

  // 建立合約實例
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  try {
    // 調用 getPregnantWomanInfo 函數
    const result = await contract.methods.WomanInfoByAddress(userAddress).call();

    // 獲取名稱和 listName
    const userName = result.name;

    // 更新 HTML 元素的內容
    const welcomeElement = document.getElementById("nav_username");

    // 設置歡迎消息
    welcomeElement.innerText = `媽咪　${userName}，您好！`;

    console.log("User Name:", userName);
    console.log(welcomeElement);
  } catch (error) {
    console.error("Error:", error);
  }
  // 獲取登出按鈕元素
  const logoutButton = document.getElementById("logoutButton");
  // 添加點擊事件處理程序
  logoutButton.addEventListener("click", async () => {
    try {
      // 斷開與 MetaMask 的連接
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // 生成隨機查詢字串
      const randomQueryString = Math.random().toString(36).substring(7);

      // 重新導向到帶有查詢字串的登入頁面
      window.location.href = `login.html?${randomQueryString}`;
    } catch (error) {
      console.error("Error during logout:", error);
    }
  });
});
