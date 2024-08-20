import { contractAddress, contractABI } from '../List.js';

// 創建 Web3 實例
const web3 = new Web3(window.ethereum);

// 創建合約實例
const contract = new web3.eth.Contract(contractABI, contractAddress);

// 新增 removeFromList3 函数
async function removeFromList3(address) {
  try {
    const accounts = await web3.eth.requestAccounts();
    const senderAddress = accounts[0];

    // 调用合约的 removeFromList3 函数，将 walletAddress 作为参数传递
    const result = await contract.methods
      .removeFromList3(address)
      .send({ from: senderAddress });

    // 更新网页上的列表或显示成功消息
    console.log(`Remove from List3 successful: ${result.transactionHash}`);
  } catch (error) {
    console.error(error);
  }
}

// 在页面加载时调用此函数
window.addEventListener("load", async () => {
  try {
    // 连接到 MetaMask 或其他以太坊提供者
    await window.ethereum.enable();

    // 获取当前用户的以太坊地址
    const userAddress = await getCurrentUserAddress();

    // 检查用户是否在 List1 中
    const userInList1 = await isUserInList1(userAddress);
    // 检查用户是否在 List2 中
    const userInList2 = await isUserInList2(userAddress);

    if (userInList1 || userInList2) {
      let userHospitalName = "";

      // 如果用户在 List1 中，获取医院名称
      if (userInList1) {
        userHospitalName = await getUserHospitalName(userAddress, "List1");
      }
      // 如果用户在 List2 中，获取医院名称
      if (userInList2) {
        userHospitalName = await getUserHospitalName(userAddress, "List2");
      }

      document.getElementById("hospitalName").textContent = userHospitalName;

      // 设置页面标题为 "hospitalname + 權限管理"
      const titleElement = document.querySelector("title");
      titleElement.textContent = userHospitalName + "孕婦名單權限管理";

      console.log("Contract instance:", contract);
      console.log("User Hospital Name:", userHospitalName);

      // 调用 getList3PregnantWomenByHospitalName 函数来获取匹配的 List3 数据
      const list3ByHospitalName = await getList3PregnantWomenByHospitalName(
        userHospitalName
      );

      // 显示匹配的 List3 数据
      displayList3(list3ByHospitalName);
    } else {
      // 用户不在 List1 或 List2 中的处理逻辑
      console.log("User is not authorized to view content.");
      alert("您的身分無法訪問此頁面。");
      // window.location.href = "其他頁面的 URL";
    }
  } catch (error) {
    console.error(`连接到以太坊失败: ${error}`);
    console.error("Error on page load:", error);
  }
});
// 辅助函数，获取当前用户的以太坊地址
async function getCurrentUserAddress() {
  const accounts = await ethereum.request({ method: "eth_accounts" });
  return accounts[0];
}

// 辅助函数，获取用户是否在 List1 中
async function isUserInList1(userAddress) {
  const isUserInList1 = await contract.methods
    .isAddedToList1(userAddress)
    .call();
  return isUserInList1;
}

// 辅助函数，获取用户是否在 List2 中
async function isUserInList2(userAddress) {
  const isUserInList2 = await contract.methods
    .isAddedToList2(userAddress)
    .call();
  return isUserInList2;
}

// 辅助函数，获取用户的医院名称
async function getUserHospitalName(userAddress) {
  const userHospitalName = await contract.methods
    .getHospitalNameForUser(userAddress)
    .call();
  return userHospitalName;
}

// 辅助函数，调用 getList3PregnantWomenByHospitalName 函数来获取匹配的 List3 数据
async function getList3PregnantWomenByHospitalName(userHospitalName) {
  try {
    // 调用合约的 getList3PregnantWomenByHospitalName 函数，传入用户的医院名称
    const pregnantWomen = await contract.methods
      .getList3PregnantWomenByHospitalName(userHospitalName)
      .call();
    return pregnantWomen;
  } catch (error) {
    console.error("Error in getList3PregnantWomenByHospitalName:", error);
    return [];
  }
}

// 辅助函数，显示匹配的 List3 数据
async function displayList3(list3Data) {
  console.log("list3Data:", list3Data);

  const tableContainer = document.getElementById("list3TableContainer");

  // 创建表格元素
  const table = document.createElement("table");

  // 创建表头行
  const headerRow = document.createElement("tr");

  // 创建表头单元格（身份证字号和孕妇姓名）
  const idNumberHeaderCell = document.createElement("th");
  idNumberHeaderCell.textContent = "身份證字號";
  idNumberHeaderCell.classList.add("th1");

  const nameHeaderCell = document.createElement("th");
  nameHeaderCell.textContent = "孕婦姓名";
  nameHeaderCell.classList.add("th1");

  const walletAddressHeaderCell = document.createElement("th");
  walletAddressHeaderCell.textContent = "錢包地址"; // 新增 "钱包地址" 表头单元格
  walletAddressHeaderCell.classList.add("th1");

  const actionHeaderCell = document.createElement("th");
  actionHeaderCell.textContent = "";
  actionHeaderCell.classList.add("th1");

  // 将表头单元格添加到表头行
  headerRow.appendChild(idNumberHeaderCell);
  headerRow.appendChild(nameHeaderCell);
  headerRow.appendChild(walletAddressHeaderCell);
  headerRow.appendChild(actionHeaderCell);

  // 将表头行添加到表格
  table.appendChild(headerRow);

  // 获取表格主体
  const tableBody = document.createElement("tbody");

  // 定义初始背景颜色
  let currentBackgroundColor = "white"; // 初始为白色

  // 遍历 List3 数据并创建表格行
  for (let i = 0; i < list3Data.length; i++) {
    // 创建表格行
    // 创建表格行
    const row = document.createElement("tr");

    // 创建身份证字号、孕妇姓名和钱包地址单元格
    const idNumberCell = document.createElement("td");
    idNumberCell.textContent = list3Data[i].idNumber;
    idNumberCell.classList.add("data-cell");

    const nameCell = document.createElement("td");
    nameCell.textContent = list3Data[i].name;
    nameCell.classList.add("data-cell");

    const walletAddressCell = document.createElement("td");
    walletAddressCell.textContent = list3Data[i].walletAddress; // 设置钱包地址数据
    walletAddressCell.classList.add("data-cell");

    // 创建操作单元格
    const actionsCell = document.createElement("td");
    actionsCell.classList.add("data-cell");

    // 创建操作按钮
    const actionButton = document.createElement("button");
    actionButton.textContent = "動作";
    actionButton.classList.add(
      "btn",
      "btn-secondary",
      "btn-sm",
      "dropdown-toggle"
    );
    actionButton.setAttribute("data-bs-toggle", "dropdown");

    // 创建下拉菜单
    const dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add("dropdown-menu");

    // 创建移除选项
    const removeOption = document.createElement("a");
    removeOption.textContent = "移除";
    removeOption.href = "#";
    removeOption.classList.add("dropdown-item");

    // 为移除选项添加点击事件监听器
    removeOption.addEventListener("click", async () => {
      console.log("移除選項被點擊");
      // 弹出确认对话框
      const confirmRemove = window.confirm(
        `確認將 ${list3Data[i].name} ${list3Data[i].idNumber} 移除名單？`
      );

      if (confirmRemove) {
        // 如果用户确认移除，执行 removeFromList3 函数并传递正确的 walletAddress
        try {
          await removeFromList3(list3Data[i].walletAddress);
          alert("移除成功");
          window.location.reload();
        } catch (error) {
          console.error("Error removing item from List3:", error);
          alert("移除時出現錯誤");
        }
      }
    });

    // 将移除选项添加到下拉菜单
    dropdownMenu.appendChild(removeOption);

    // 将操作按钮和下拉菜单添加到操作单元格
    actionsCell.appendChild(actionButton);
    actionsCell.appendChild(dropdownMenu);

    // 将单元格添加到行
    row.appendChild(idNumberCell);
    row.appendChild(nameCell);
    row.appendChild(walletAddressCell); // 将钱包地址单元格添加到行
    row.appendChild(actionsCell);

    // 设置整行的背景颜色
    row.style.backgroundColor = currentBackgroundColor;

    // 切换背景颜色
    currentBackgroundColor =
      currentBackgroundColor === "white" ? "rgb(217, 217, 217, 1)" : "white";

    // 将行添加到表格主体
    tableBody.appendChild(row);
  }

  // 将表格主体添加到表格
  table.appendChild(tableBody);

  // 将表格添加到表格容器
  tableContainer.appendChild(table);
}
