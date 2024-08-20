import { contractAddress, contractABI } from '../List.js';

// 創建 Web3 實例
const web3 = new Web3(window.ethereum);

// 創建合約實例
const contract = new web3.eth.Contract(contractABI, contractAddress);

document.addEventListener("DOMContentLoaded", function () {
    // 获取当前用户的以太坊地址
    async function getCurrentUserAddress() {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      console.log('用户的以太坊地址是：', accounts[0]); // 使用 accounts[0] 作为用户地址
      return accounts[0];
    }

    // 获取 URL 中的参数
    const urlParams = new URLSearchParams(window.location.search);
    const hospitalName = urlParams.get('hospitalname');

    // 将医院名称填充到输入框中
    document.getElementById('hospitalname').value = hospitalName;

    // 获取表单元素
    const employeeIdInput = document.getElementById('employeeId');
    const employeeNameInput = document.getElementById('employeeName');
    const employeeAddressInput = document.getElementById('employeeAddress');

    // 表单提交事件处理程序
    async function submitForm(event) {
      event.preventDefault(); // 阻止默认的表单提交行为

      try {
        // 调用智能合约的 addToList2 函数，将员工信息传递给它
        await contract.methods.addToList2(employeeAddressInput.value, employeeIdInput.value, employeeNameInput.value, hospitalName).send({ from: await getCurrentUserAddress() });

        // 成功添加员工到 List2，可以执行其他操作，如显示成功消息或重定向到其他页面
        alert('添加成功');
      } catch (error) {
        console.error('Error adding employee to List2:', error);
        // 处理错误，可能是智能合约交互错误
        alert('發生錯誤，請稍後再試');
      }
    }

    // 获取表单并监听提交事件
    const employeeForm = document.getElementById('employeeForm');
    employeeForm.addEventListener('submit', submitForm);

    const goToHomeButton = document.getElementById('goToHomeButton');

    // 添加点击事件处理程序来返回首页
    goToHomeButton.addEventListener('click', () => {
      // 使用 window.location.href 返回首页的 URL
      window.location.href = '權限管理.html'; // 替换成您的 list1.html 的 URL
    });
  });