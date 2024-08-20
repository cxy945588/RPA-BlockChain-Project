<!DOCTYPE html>

<head>
  <meta charset="utf-8" />
  <title>查詢產檢資料-產檢流程證明系統</title>
  <link rel="stylesheet" href="../CSS/D_add.css">
  <link rel="icon" href="image/logo.ico" type="image/x-icon" />
  <link rel="shortcut icon" href="image/logo.ico" type="image/x-icon" />
  <!-- 引入 Web3.js 庫 -->
  <script src="https://cdn.jsdelivr.net/npm/web3@1.5.3/dist/web3.min.js"></script>
  <!-- 引入 jQuery -->
  <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
  <script type="module" src="../JS/JS_HTML/D_Nav.js"></script>
  <style>
    .signupFrm form {
    text-align: center;
    margin-top: -250px; 
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
<script>
  // 使用 jQuery 載入 nav.html
  $(document).ready(function () {
    $("#navContainer").load("D_nav.html", function () {
      // 在加载完成后显示导航栏
      $("#navContainer").css("opacity", 1);
      $(".signupFrm").css("opacity", 1);
      $(".startup-section").css("opacity", 1);

    });
  }); 
</script>

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
        $output = shell_exec("D_IPFS.py");

        // 輸出 Python 腳本的結果
        // echo "<pre>$output</pre>";
    }
    ?>
  </main>
  <div id="navContainer"></div>
  <br>
  <br><br>
  <main>
    <div class="signupFrm">
      <form action="enterprenatalinformation.html" id="addressForm" class="form">
        <h2 class="title">請輸入欲搜尋對象之身分證字號</h2>
        <div class="inputContainer">
          <input type="text" class="input" id="address" placeholder="a">
          <label for="address" class="label">身分證字號</label>
        </div>
        <input type="submit" class="submitBtn" value="確認搜尋">
      </form>
      <script>
        document.getElementById('addressForm').addEventListener('submit', function (event) {
          event.preventDefault();
          const address = document.getElementById('address').value;
          localStorage.setItem('address', address);
          window.location.href = 'D_QueryResult.html';
        });
      </script>
    </div>
    <script type="module" src="../JS/JS_SOL/D_add.js"></script>
</body>