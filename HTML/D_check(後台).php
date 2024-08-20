<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script>document.getElementsByTagName("html")[0].className += " js";</script>
  <title>憑證上傳-產檢流程證明系統</title>
  <link rel="icon" href="image/logo.ico" type="image/x-icon" />
  <link rel="shortcut icon" href="image/logo.ico" type="image/x-icon" />
  <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css?family=ABeeZee&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet" />
  <style>
    .bgc {
        background-color: #e8eff5;
        width: 100vw;
    }
    .table-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      border-radius: 10px;
      background-color: #ffffff;
      text-align: center;
      margin-top: 50px;
    }

    h2{
        font-size: 24px;
        margin-bottom: 20px;
    }

    label {
      display: block;
      margin: 1%;
      font-size: 20px;
      text-align: left;
    }

    input[type="text"],
    input[type="number"] {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      padding: 10px 20px;
      cursor: pointer;
    }

    button:hover {
      background-color: #0056b3;
    }

    h2 {
      margin: 1% auto 2%;
    }

    ul {
      list-style-type: none;
      padding: 0;
    }

    .form-control-default {
      margin-bottom: 2%;
    }

    .submitBtn {
      display: block;
      margin-left: auto;
      border: none;
      background-color: #698aab;
      /* rgb(147, 177, 205) */
      color: white;
      border-radius: 6px;
      cursor: pointer;
      font-size: 20px;
      width: 15%;
      margin-top: 3%;
    }

    .submitBtn:hover {
      background-color: #44617b;
      transform: translateY(-2px);
    }
     /* 啟動流程的 CSS 樣式 */
  .startup-section h1 {
      margin-top: 80px;
      text-align: center;
    }
  .startup-section form {
      text-align: center;
      margin-top: 20px;
    }
  .startup-section form input[name="run_python"] {
        padding: 15px 30px; /* 調整按鈕的 padding */
        font-size: 20px; /* 調整按鈕的字體大小 */
        width: 200px; /* 調整按鈕的寬度 */
        height: 60px; /* 調整按鈕的高度 */
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
  .startup-section form input[name="run_python"]:hover {
      background-color: #45a049;
    }
  </style>
</head>

<body class="bgc">
    <!-- 啟動流程的部分 -->
  <main class="startup-section">
    <h1>按下按鈕啟動自動流程</h1>
    <form method="post">
      <input type="submit" name="run_python" value="啟動流程">
    </form>

    <?php
    // 啟動流程的 PHP 部分
    if (isset($_POST['search'])) {
        // 處理搜尋的相關邏輯
        // ...
    } elseif (isset($_POST['run_python'])) {
        // 執行 Python 腳本
        $output = shell_exec("D_check.py");

        // 輸出 Python 腳本的結果
        // echo "<pre>$output</pre>";
    }
    ?>
  </main>
    <div id="navContainer"></div>

  <!-- 表格 -->
  <div class="table-container">
    <h2>憑證上傳</h2>
    <form id="uploadForm">
      <label for="userAddress">使用者地址：</label>
      <input class="form-control form-control-default" type="text" id="userAddress" required>

      <label for="dataString">憑證名稱：</label>
      <input class="form-control form-control-default" type="text" id="dataString" required>

      <label for="cid1">CID 1：</label>
      <input class="form-control form-control-default" type="text" id="cid1" required>

      <label for="cid2">CID 2：</label>
      <input class="form-control form-control-default" type="text" id="cid2" required>


      <button class="submitBtn" type="button" id="uploadButton">上傳</button>
    </form>

    <div id="result"></div>
  </div>
  <!-- 表格結束 -->
  <script src="https://cdn.jsdelivr.net/npm/web3@1.4.0/dist/web3.min.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', async () => {
      // 初始化 Web3
      if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
      } else {
        // 提示用户安装 MetaMask 或其他以太坊浏览器插件
        alert("Please install MetaMask or other Ethereum browser extension.");
      }

      // 获取智能合约地址和 ABI（接口）
      const contractAddress = "0x62a9D7ee03AF08fCADE35D525AF6d40720278379"; // 请替换为您的合约地址
      const contractABI =[
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "_list123ManagerAddress",
                  "type": "address"
              }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "userAddress",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "cid",
                  "type": "uint256"
              }
          ],
          "name": "DataRecordAdded",
          "type": "event"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "_userAddress",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "_count",
                  "type": "uint256"
              },
              {
                  "internalType": "string",
                  "name": "_dataString",
                  "type": "string"
              },
              {
                  "internalType": "string",
                  "name": "_ipfsHash1",
                  "type": "string"
              },
              {
                  "internalType": "string",
                  "name": "_ipfsHash2",
                  "type": "string"
              },
              {
                  "internalType": "string",
                  "name": "_metadata",
                  "type": "string"
              }
          ],
          "name": "addDataRecord",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "name": "dataRecords",
          "outputs": [
              {
                  "internalType": "address",
                  "name": "userAddress",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "count",
                  "type": "uint256"
              },
              {
                  "internalType": "string",
                  "name": "dataString",
                  "type": "string"
              },
              {
                  "internalType": "string",
                  "name": "ipfsHash1",
                  "type": "string"
              },
              {
                  "internalType": "string",
                  "name": "ipfsHash2",
                  "type": "string"
              },
              {
                  "internalType": "uint256",
                  "name": "uploadTime",
                  "type": "uint256"
              },
              {
                  "internalType": "string",
                  "name": "metadata",
                  "type": "string"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "_cid",
                  "type": "uint256"
              }
          ],
          "name": "getDataRecord",
          "outputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              },
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              },
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              },
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              },
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              },
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "_userAddress",
                  "type": "address"
              }
          ],
          "name": "getDataRecordsByAddress",
          "outputs": [
              {
                  "internalType": "uint256[]",
                  "name": "",
                  "type": "uint256[]"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "string",
                  "name": "idNumber",
                  "type": "string"
              }
          ],
          "name": "getPregnantWomanInfo",
          "outputs": [
              {
                  "components": [
                      {
                          "internalType": "address",
                          "name": "walletAddress",
                          "type": "address"
                      },
                      {
                          "internalType": "string",
                          "name": "listName",
                          "type": "string"
                      },
                      {
                          "internalType": "string",
                          "name": "idNumber",
                          "type": "string"
                      },
                      {
                          "internalType": "string",
                          "name": "name",
                          "type": "string"
                      },
                      {
                          "internalType": "string",
                          "name": "hospitalName",
                          "type": "string"
                      }
                  ],
                  "internalType": "struct List123Manager.PregnantWomanInfo",
                  "name": "",
                  "type": "tuple"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "list123ManagerAddress",
          "outputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "recordCount",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      }
  ];
      const dataStorageContract = new web3.eth.Contract(contractABI, contractAddress);

      // 处理数据上传
      async function uploadData() {
        const userAddress = document.getElementById("userAddress").value;
        const count = parseInt(document.getElementById("count").value);
        const dataString = document.getElementById("dataString").value;
        const cid1 = parseInt(document.getElementById("cid1").value);
        const cid2 = parseInt(document.getElementById("cid2").value);

        try {
          const accounts = await web3.eth.requestAccounts();
          const senderAddress = accounts[0];

          const result = await dataStorageContract.methods.addDataRecord(userAddress, count, dataString, cid1, cid2).send({ from: senderAddress });

          document.getElementById("result").textContent = `Data uploaded. CID: ${result.events.DataRecordAdded.returnValues.cid}`;
        } catch (error) {
          console.error(error);
          document.getElementById("result").textContent = `Error uploading data: ${error.message}`;
        }
      }

      // 将上传数据函数与按钮点击事件关联
      document.getElementById("uploadButton").addEventListener("click", function (event) {
        event.preventDefault();
        uploadData();
      });
    });
  </script>
   <!--nav-->
    <!-- 引入 jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script>
        // 使用 jQuery 載入 nav.html
        $(document).ready(function () {
            $("#navContainer").load("../HTML/D_nav.html");
        });
    </script>
    <script type="module" src="../JS/JS_HTML/D_Nav.js"></script>

</body>

</html>