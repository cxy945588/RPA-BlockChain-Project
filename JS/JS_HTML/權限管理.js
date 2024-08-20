import { contractAddress, contractABI } from '../List.js';


// 創建 Web3 實例
const web3 = new Web3(window.ethereum);

// 創建合約實例
const contract = new web3.eth.Contract(contractABI, contractAddress);

//addToList2 函数
async function addToList2(address, employeeId, employeeName, hospitalName) {
	try {
		const accounts = await web3.eth.requestAccounts();
		const senderAddress = accounts[0];

		// 调用合约的 addToList2 函数
		const result = await contract.methods
			.addToList2(address, employeeId, employeeName, hospitalName)
			.send({ from: senderAddress });

		// 处理成功后的逻辑，例如更新网页上的列表或显示成功消息
		console.log(`Add to List 2 successful: ${result.transactionHash}`);
	} catch (error) {
		console.error(error);
	}
}

// 调用 upgradeToList1 函数的 JavaScript 函数
async function upgradeToList1(employeeAddress) {
	try {
		const accounts = await web3.eth.requestAccounts();
		const senderAddress = accounts[0];

		// 调用合约的 upgradeToList1 函数，只传递员工的地址参数
		const result = await contract.methods
			.upgradeToList1(employeeAddress)
			.send({ from: senderAddress });

		// 更新网页上的列表或显示成功消息
		console.log(`Upgrade successful: ${result.transactionHash}`);
	} catch (error) {
		console.error(error);
	}
}

// 新增 removeFromList2 函数
async function removeFromList2(address) {
	try {
		const accounts = await web3.eth.requestAccounts();
		const senderAddress = accounts[0];

		// 调用合约的 removeFromList2 函数，注意将 address 作为字符串传递
		const result = await contract.methods
			.removeFromList2(address)
			.send({ from: senderAddress });

		// 更新网页上的列表或显示成功消息
		console.log(`Remove successful: ${result.transactionHash}`);
	} catch (error) {
		console.error(error);
	}
}

// 在页面加载时调用此函数
window.addEventListener("DOMContentLoaded", async () => {
	try {
		// 连接到 MetaMask 或其他以太坊提供者
		const accounts = await ethereum.request({ method: "eth_requestAccounts" });
		const userAddress = accounts[0]; // 获取用户地址
		console.log("User Address:", userAddress);

		// 检查用户是否在 List1 中
		const isUserInList1 = await isAddressInList1(userAddress);
		console.log("Is User in List1:", isUserInList1);

		if (isUserInList1) {
			// 用户在 List1 中，获取用户的医院名称
			const userHospitalName = await getUserHospitalName(userAddress);
			console.log("User Hospital Name:", userHospitalName);
			document.getElementById("hospitalName").textContent = userHospitalName;

			// 设置页面标题为"hospitalname + 權限管理"
			const titleElement = document.querySelector("title");
			titleElement.textContent = userHospitalName + "權限管理";

			// 调用 getList2ByHospitalName 函数来获取匹配的 List2 数据
			const list2ByHospitalName = await getList2ByHospitalName(
				userHospitalName
			);
			console.log("List2 Data:", list2ByHospitalName);

			// 显示匹配的 List2 数据
			displayList2(list2ByHospitalName);
		} else {
			// 用户不在 List1 中的处理逻辑
			console.log("User is not authorized to view content.");
			alert("您的身分無法訪問此頁面。");
			window.location.href = "../HTML/D_index.html";
		}
	} catch (error) {
		console.error("Error on page load:", error);
	}
});

// 辅助函数，获取当前用户的以太坊地址
async function getCurrentUserAddress() {
	const accounts = await ethereum.request({ method: "eth_accounts" });
	return accounts[0];
}

// 辅助函数，检查用户是否在 List1 中
async function isAddressInList1(userAddress) {
	const isUserInList1 = await contract.methods
		.isAddedToList1(userAddress)
		.call();
	console.log(
		"isAddressInList1 result for user",
		userAddress,
		":",
		isUserInList1
	);
	return isUserInList1;
}

// 辅助函数，获取用户的医院名称
async function getUserHospitalName(userAddress) {
	const userHospitalName = await contract.methods
		.getHospitalNameForUser(userAddress)
		.call();
	return userHospitalName;
}

// 辅助函数，调用 getList2ByHospitalName 函数来获取匹配的 List2 数据
async function getList2ByHospitalName(userHospitalName) {
	try {
		// 调用合约的 getList2ByHospitalName 函数，传入用户的医院名称
		const employees = await contract.methods
			.getList2ByHospitalName(userHospitalName)
			.call();
		console.log(employees);
		return employees;
	} catch (error) {
		console.error("Error in getList2ByHospitalName:", error);
		return [];
	}
}

// 异步函数，获取员工的钱包地址
async function getEmployeeAddress(employee) {
	try {
		const employeeAddress = await contract.methods
			.getEmployeeAddress(employee.employeeId)
			.call();
		return employeeAddress;
	} catch (error) {
		console.error("Error getting employee address:", error);
		return null; // 如果出现错误，返回 null 或适当的默认值
	}
}

// 在全局范围内定义一个变量来跟踪是否已经显示了弹出框
let isPopupDisplayed = false;

// 辅助函数，显示员工详细信息
async function showEmployeeDetails(employee) {
	// 如果弹出框已经显示，则不再创建
	if (isPopupDisplayed) {
		return;
	}

	// 获取员工的钱包地址
	const employeeAddress = await getEmployeeAddress(employee);

	// 创建一个弹出框或模态框来显示员工详细信息
	// 这里只是一个示例，您可以根据需求自定义显示方式

	const detailsPopup = document.createElement("div");
	detailsPopup.classList.add("popup");

	// 创建员工详细信息的 HTML 内容，包括换行
	const detailsHTML = `
    <p>員工編號： ${employee.employeeId}</p>
    <p>員工姓名： ${employee.employeeName}</p>
    <p>錢包地址： ${employeeAddress}</p>
  `;

	// 创建 "設為管理員" 按钮
	const setAsAdminButton = document.createElement("button");
	setAsAdminButton.textContent = "設為管理員";
	setAsAdminButton.classList.add("btn", "btn-secondary", "btn-sm", "list1btm");
	setAsAdminButton.addEventListener("click", () => {
		// 弹出确认对话框
		const confirmResult = window.confirm(
			`確認將${employee.employeeName} (${employee.employeeId}) 設為管理員？`
		);
		if (confirmResult) {
			// 用户点击了确认按钮
			// 在这里调用 upgradeToList1 函数，传递员工的地址作为参数
			upgradeToList1(employeeAddress)
				.then(() => {
					// 升级成功后显示成功提示
					alert("設置成功");
					window.location.reload();
				})
				.catch((error) => {
					// 处理升级失败的情况，显示错误信息
					console.error("Error upgrading to admin:", error);
					alert("設置失敗，請稍後再試");
				});
		}
	});

	// 创建 "移除" 按钮
	const removeButton = document.createElement("button");
	removeButton.textContent = "移除";
	removeButton.classList.add("btn", "btn-secondary", "btn-sm", "list1btm");
	removeButton.addEventListener("click", async () => {
		// 在点击移除按钮时，显示确认消息并执行 removeFromList2 函数
		const confirmRemove = window.confirm(
			`確認將${employee.employeeName} (${employee.employeeId}) 移除名單？`
		);
		if (confirmRemove) {
			try {
				// 执行 removeFromList2 函数
				await removeFromList2(employeeAddress);
				// 移除成功后显示成功提示
				alert("移除成功");
				// 重新加载页面
				window.location.reload();
			} catch (error) {
				// 处理移除失败的情况，显示错误信息
				console.error("Error removing from list:", error);
				alert("移除失敗，請稍後再試");
			}
		}
	});

	// 将按钮添加到弹出框
	detailsPopup.appendChild(setAsAdminButton);
	detailsPopup.appendChild(removeButton);

	// 创建关闭按钮
	const closeButton = document.createElement("button");
	closeButton.textContent = "關閉";
	closeButton.classList.add(
		"btn",
		"btn-outline-secondary",
		"btn-sm",
		"list1btm"
	);
	closeButton.addEventListener("click", () => {
		// 关闭弹出框
		detailsPopup.style.display = "none";
		// 设置弹出框已经关闭
		isPopupDisplayed = false;
	});

	// 将详细信息和关闭按钮添加到弹出框
	detailsPopup.innerHTML = detailsHTML; // 使用 innerHTML 将 HTML 内容插入
	detailsPopup.appendChild(setAsAdminButton);
	detailsPopup.appendChild(removeButton);

	detailsPopup.appendChild(closeButton);

	// 将弹出框添加到页面的 body 元素下
	document.body.appendChild(detailsPopup);

	// 显示弹出框
	detailsPopup.style.display = "block";
	// 设置弹出框已经显示
	isPopupDisplayed = true;
}

// 辅助函数，显示匹配的 List2 数据
async function displayList2(list2Data) {
	const list2ByHospitalNameUL = document.getElementById("list2ByHospitalName");

	// 获取表格容器元素
	const tableContainer = document.getElementById("list2TableContainer");

	// 创建表格元素
	const table = document.createElement("table");

	// 创建表头行
	const headerRow = document.createElement("tr");

	// 创建表头单元格（员工编号、姓名和钱包地址）
	const idHeaderCell = document.createElement("th");
	idHeaderCell.textContent = "員工編號";
	idHeaderCell.classList.add("th1");

	const nameHeaderCell = document.createElement("th");
	nameHeaderCell.textContent = "員工姓名";
	nameHeaderCell.classList.add("th1");

	const actionHeaderCell = document.createElement("th"); // 新增 "动作" 表头单元格
	actionHeaderCell.textContent = "動作"; // 设置内容为 "動作"
	actionHeaderCell.classList.add("th1");

	// 将表头单元格添加到表头行
	headerRow.appendChild(idHeaderCell);
	headerRow.appendChild(nameHeaderCell);
	//headerRow.appendChild(addressHeaderCell); // 添加钱包地址列到表头
	headerRow.appendChild(actionHeaderCell);

	// 将表头行添加到表格
	table.appendChild(headerRow);

	// 获取表格主体
	const tableBody = document.createElement("tbody");

	// 定义初始背景颜色
	let currentBackgroundColor = "white"; // 初始为白色

	// 遍历List2数据并创建表格行
	for (let i = 0; i < list2Data.length; i++) {
		// 创建表格行
		const row = document.createElement("tr");

		// 创建员工编号和姓名单元格
		const idCell = document.createElement("td");
		idCell.textContent = list2Data[i].employeeId;
		idCell.classList.add("data-cell"); // 添加一个CSS类名以便后续样式选择

		const nameCell = document.createElement("td");
		nameCell.textContent = list2Data[i].employeeName;
		nameCell.classList.add("data-cell"); // 添加一个CSS类名以便后续样式选择

		// 创建查看按钮单元格
		const actionsCell = document.createElement("td");
		const viewButton = document.createElement("button");
		viewButton.textContent = "查看";
		viewButton.classList.add("btn", "btn-secondary", "btn-sm"); // 添加Bootstrap按钮类
		actionsCell.classList.add("data-cell"); // 添加一个CSS类名以便后续样式选择

		// 为查看按钮添加点击事件处理程序
		viewButton.addEventListener("click", () =>
			showEmployeeDetails(list2Data[i])
		);

		// 将查看按钮添加到单元格
		actionsCell.appendChild(viewButton);

		// 将单元格添加到行
		row.appendChild(idCell);
		row.appendChild(nameCell);
		row.appendChild(actionsCell);

		// 设置整行的背景颜色
		row.style.backgroundColor = currentBackgroundColor;

		// 切换背景颜色
		currentBackgroundColor =
			currentBackgroundColor === "white" ? "rgb(217,217,217,1)" : "white";

		// 将行添加到表格主体
		tableBody.appendChild(row);
	}
	// 将表格主体添加到表格
	table.appendChild(tableBody);
	// 将表格添加到表格容器
	tableContainer.appendChild(table);
}

async function getHospitalNameForUser(userAddress) {
	try {
		console.log(
			"Calling getHospitalNameForUser function with user address:",
			userAddress
		);

		// 调用智能合约中的 getHospitalNameForUser 函数
		const hospitalName = await contract.methods
			.getHospitalNameForUser(userAddress)
			.call();

		console.log("Received hospital name from the contract:", hospitalName);

		return hospitalName;
	} catch (error) {
		console.error("Error getting hospital name:", error);
		throw error;
	}
}

// 获取新增数据按钮元素
const addEmployeeButton = document.getElementById("addEmployeeButton");
// 监听新增数据按钮的点击事件
addEmployeeButton.addEventListener("click", async () => {
	// 获取当前用户的地址
	const userAddress = await getCurrentUserAddress();

	// 调用智能合约的 getHospitalNameForUser 函数获取医院名称
	const hospitalName = await getHospitalNameForUser(userAddress);

	// 构建跳转链接，带入医院名称作为参数
	const redirectTo = `新增醫生資料.html?hospitalname=${encodeURIComponent(
		hospitalName
	)}`;

	// 执行页面跳转
	window.location.href = redirectTo;
});
