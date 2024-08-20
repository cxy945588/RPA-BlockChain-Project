import { contractAddress, contractABI } from '../D_check.js';

document.addEventListener('DOMContentLoaded', async function () {
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        console.error('No Ethereum provider detected. Please install MetaMask or use a browser with Ethereum support.');
        return;
      }

      const contract = new window.web3.eth.Contract(contractABI, contractAddress);

      document.getElementById('queryButton').addEventListener('click', function () {
        handleQuery();
      });

      async function handleQuery() {
        try {
          const idNumber = document.getElementById('idNumber').value;
          console.log('Querying for ID:', idNumber);

          const result = await contract.methods.getPregnantWomanInfo(idNumber).call();
          console.log('Pregnant Woman Info:', result);

          document.getElementById('result').innerHTML = '';

          if (result.idNumber !== '') {
            displayPregnantWomanInfo(result);

            // 查询数据记录
            const records = await contract.methods.getDataRecordsByAddress(result.walletAddress).call();
            console.log('Data Records:', records);
            displayDataRecords(records);
          } else {
            document.getElementById('result').innerHTML = '查無資料';
          }
        } catch (error) {
          console.error('合約查詢錯誤：', error);
          document.getElementById('result').innerHTML = '查詢時發生錯誤';
        }
      }

      function displayPregnantWomanInfo(info) {
        const resultDiv = document.getElementById('result');
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('mb-3', 'border', 'p-3');

        infoDiv.innerHTML = `
          <p><strong>身分證字號：</strong> ${info.idNumber}</p>
          <p><strong>姓名：</strong> ${info.name}</p>
        `;

        resultDiv.appendChild(infoDiv);
      }

      async function displayDataRecords(records) {
        const resultDiv = document.getElementById('result');

        if (records.length === 0) {
          resultDiv.innerHTML += '<p>查無產檢資料</p>';
        } else {
          const recordsDiv = document.createElement('div');
          recordsDiv.classList.add('mb-3', 'border', 'p-3');

          for (const recordIndex of records) {
            const record = await contract.methods.getDataRecord(recordIndex).call();
            console.log('Data Record:', record);

            const recordValues = Object.values(record);

            const recordInfo = document.createElement('div');
            recordInfo.innerHTML = `
              <p><strong>儲存地址：</strong> ${recordValues[0]}</p>
              <p><strong>醫生編號：</strong> ${recordValues[1]}</p>
              <p><strong>產檢名稱：</strong> ${recordValues[2]}</p>
              <p><strong>IPFS Hash 1：</strong> ${recordValues[3]}</p>
              <p><strong>IPFS Hash 2：</strong> ${recordValues[4]}</p>
              <p><strong>上傳時間：</strong> ${new Date(recordValues[5] * 1000)}</p>
            `;

            recordsDiv.appendChild(recordInfo);
          }

          resultDiv.appendChild(recordsDiv);
        }
      }
    } catch (error) {
      console.error('初始化錯誤：', error);
    }
  });