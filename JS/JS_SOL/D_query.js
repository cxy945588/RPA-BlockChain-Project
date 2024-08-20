import { contractAddress, contractABI } from '../D_Checkup.js';

window.addEventListener('DOMContentLoaded', async () => {

  const address = localStorage.getItem("address");
  console.log("address:", address);

  // 創建Web3實例
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    return;
  }

  if (window.ethereum && window.ethereum.selectedAddress) {
    // 設置默認帳戶為已連接的帳戶
    web3.eth.defaultAccount = window.ethereum.selectedAddress;
  } else {
    console.log('請連接以太坊帳戶，或使用MetaMask等工具來連接您的帳戶。');
    return;
  }
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
  contract.methods.getPregnantWomanInfo(address).call().then((result) => {
    // 处理 Solidity 函数的返回结果
    console.log("Pregnant Woman Info:", result);
  })
    .catch((error) => {
      console.error("Error:", error);
    });


  const PATIENT_ADDRESS = address;
  console.log('PATIENT_ADDRESS', PATIENT_ADDRESS);

  if (PATIENT_ADDRESS !== null) {
    // 讀取合約狀態變量
    contract.methods.getCheckupRecord(PATIENT_ADDRESS).call()
      .then((result) => {
        displayCheckupRecord(result);
        // 在這裡處理讀取的值，您可以將它們顯示在網頁上或進行其他處理
      })
      .catch((error) => {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML += `<p>錯誤：無法讀取檢查記錄</p>`;
        console.error('讀取合約狀態變量時出現錯誤：', error);
      });
  }

  // 顯示檢查記錄的函數
  function displayCheckupRecord(checkupRecord) {


    // 顯示每條檢查記錄的時間、項目和結果
    for (let i = 0; i < checkupRecord.length; i++) {
      const checkup = checkupRecord[i];
      const checkupDate = new Date(checkup.checkupTime * 1000).toLocaleDateString();
      const checkupTime = new Date(checkup.checkupTime * 1000).toLocaleString();
      const checkupData = checkup.data;

      const TimeLine = document.querySelector(".swiper-pagination-custom");
      TimeLine.innerHTML += `<li class='swiper-pagination-switch'><span class='switch-title'>${checkupDate}</span></li>`;


      const Wrapper = document.querySelector(".swiper-wrapper");
      const WrapperHTML =
        `
          <div class="swiper-slide">
            <form class="form" id="inspectionForm">
              <div class="formheader">
                <div class="left-content">
                  <h2 style="margin-bottom: 0px;">產檢報告紀錄</h2>
                  <h6>檢查時間：${checkupTime}</h6>
                </div>
                <div class="right-content">
                  <h5 style="font-size: 18px;" id="resultContainer" class="resultContainer" ></h5>
                </div>
              </div>
              <div class="form-card">
                <h3>問診內容</h3>

                <div class="box">
                  <label class="label" for="Bleeding">出血</label>
                  <input class="form-control form-control-default" type="text" id="Bleeding" name="Bleeding"
                    placeholder="+ , -" readonly value="${checkupData.FCBleeding}">
                </div>
                <div class="box">
                  <label class="label" for="Stomach_ache">腹痛</label>
                  <input class="form-control form-control-default" type="text" id="Stomach_ache" name="Stomach_ache"
                    placeholder="+ , -" readonly value="${checkupData.FCStomach_ache}">
                </div>
                <div class="box">
                  <label class="label" for="Headache">頭痛</label>
                  <input class="form-control form-control-default" type="text" id="Headache" name="Headache"
                    placeholder="+ , -" readonly value="${checkupData.FCHeadache}">
                </div>
                <div class="box">
                  <label class="label" for="Spasms">痙攣</label>
                  <input class="form-control form-control-default" type="text" id="Spasms" name="Spasms"
                    placeholder="+ , -" readonly value="${checkupData.FCSpasms}">
                </div>
              </div>

              <div class="form-card">
                <h3>身體檢查</h3>
                <div class="box">
                  <label class="label" for="weight">體重</label>
                  <input class="form-control form-control-default" type="text" id="weight" name="weight"
                    placeholder="kg" readonly value="${checkupData.FCWeight}">
                </div>
                <div class="box">
                  <label class="label" for="SBP">血壓收縮壓</label>
                  <input class="form-control form-control-default" type="text" id="SBP" name="SBP" placeholder="mmHg"
                    readonly value="${checkupData.FCBlood_SBP}">
                </div>
                <div class="box">
                  <label class="label" for="DBP">血壓舒張壓</label>
                  <input class="form-control form-control-default" type="text" id="DBP" name="DBP" placeholder="mmHg"
                    readonly value="${checkupData.FCBlood_DBP}">
                </div>
                <div class="box">
                  <label class="label" for="heart">胎心音</label>
                  <input class="form-control form-control-default" type="text" id="heart" name="heart"
                    placeholder="次/分鐘" readonly value="${checkupData.FCFetal_heart_sounds}">
                </div>
                <div class="box">
                  <label class="label" for="position">胎位</label>
                  <input class="form-control form-control-default" type="text" id="position" name="position"
                    placeholder="正常/異常" readonly value="${checkupData.FCFetal_position}">
                </div>
                <div class="box">
                  <label class="label" for="edema">浮腫</label>
                  <input class="form-control form-control-default" type="text" id="edema" name="edema"
                    placeholder="+ , -" readonly value="${checkupData.FCEdema}">
                </div>
                <div class="box">
                  <label class="label" for="varicose_veins">靜脈曲張</label>
                  <input class="form-control form-control-default" type="text" id="varicose_veins" name="varicose_veins"
                    placeholder="+ , -" readonly value="${checkupData.FCVaricose_veins}">
                </div>
              </div>
              <div class="form-card">
                <h3>實驗室檢查</h3>
                <div class="box">
                  <label class="label" for="urine_protein">尿蛋白</label>
                  <input class="form-control form-control-default" type="text" id="urine_protein" name="urine_protein"
                    placeholder="+ , -" readonly value="${checkupData.FCUrine_protein}">
                </div>
                <div class="box">
                  <label class="label" for="urine_sugar">尿糖</label>
                  <input class="form-control form-control-default" type="text" id="urine_sugar" name="urine_sugar"
                    placeholder="+ , -" readonly value="${checkupData.FCUrine_sugar}">
                </div>
              </div>
              <div class="form-card">
                <h3>超音波檢查</h3>
                <div class="box">
                  <label class="label" for="GAP">胎數</label>
                  <input class="form-control form-control-default" type="text" id="GAP" name="GAP" placeholder=""
                     value="${checkupData.FCGAP}">
                </div>
                <div class="box">
                  <label class="label" for="FHB">胎兒心跳</label>
                  <input class="form-control form-control-default" type="text" id="FHB" name="FHB" placeholder="有/無"
                     value="${checkupData.FCFHB}">
                </div>
                <div class="box">
                  <label class="label" for="FCPosition">著床位置</label>
                  <input class="form-control form-control-default" type="text" id="FCPosition" name="FCPosition"
                    placeholder="正常/異常" value="${checkupData.FCPosition}">
                </div>
                <div class="box">
                  <label class="label" for="CRL">胎兒頭臀長</label>
                  <input class="form-control form-control-default" type="text" id="CRL" name="CRL" placeholder="公分"
                     value="${checkupData.FCCRL}">
                </div>
                <div class="box">
                  <label class="label" for="BPD">胎兒頭雙頂骨徑</label>
                  <input class="form-control form-control-default" type="text" id="BPD" name="BPD" placeholder="公分"
                     value="${checkupData.FCBPD}">
                </div>
                <div class="box">
                  <label class="label" for="SR">篩檢結果</label>
                  <input class="form-control form-control-default" type="text" id="SR" name="SR" placeholder="正常/異常"
                     value="${checkupData.FCSR}">
                </div>
                <div class="box">
                  <label class="label" for="CID">超音波圖片</label>
                  <input class="form-control form-control-default" type="text" id="CID" name="CID" placeholder="CID"
                    readonly value="${checkupData.CID}">
                </div>
              </div>
            </form>
            <div id="result" style="display: none;"></div>
          </div>
      `;
      Wrapper.innerHTML += WrapperHTML;

      // 获取结果容器元素
      const resultContainer = document.getElementsByClassName("resultContainer");

      // 调用 Solidity 函数并更新结果容器中的内容
      contract.methods.getPregnantWomanInfo(address).call().then((result) => {
        // 处理 Solidity 函数的返回结果
        const html = `孕婦姓名：${result[3]} &nbsp身分證字號：${result[2]}<br>錢包地址：${result[0]}<br>`;
        // 更新结果容器中的内容

        for (var i = 0; i < resultContainer.length; i++) {
          resultContainer[i].innerHTML = html;
        }
      }).catch((error) => {
        console.error("Error:", error);
      });



      applyStyling("position");
      applyStyling("weight");
      applyStyling("Bleeding");
      applyStyling("Stomach_ache");
      applyStyling("Headache");
      applyStyling("Spasms");
      applyStyling("SBP");
      applyStyling("DBP");
      applyStyling("heart");
      applyStyling("position");
      applyStyling("edema");
      applyStyling("varicose_veins");
      applyStyling("urine_protein");
      applyStyling("urine_sugar");
      applyStyling("FHB");
      applyStyling("FCPosition");
      applyStyling("CRL");
      applyStyling("BPD");
      applyStyling("SR");
      applyStyling("CID");


    }
  }

  /////////
  var mySwiper = new Swiper(".swiper", {
    autoHeight: true,

    speed: 500,
    direction: "horizontal",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar"
    },
    loop: false,
    effect: "slide",
    spaceBetween: 30,
    on: {
      init: function () {
        $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
        $(".swiper-pagination-custom .swiper-pagination-switch").eq(0).addClass("active");
      },
      slideChangeTransitionStart: function () {
        $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
        $(".swiper-pagination-custom .swiper-pagination-switch").eq(mySwiper.realIndex).addClass("active");

      }
    }
  });
  $(document).on("click", ".swiper-pagination-custom .swiper-pagination-switch", function () {
    mySwiper.slideTo($(this).index());
    $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
    $(this).addClass("active");
  });


});

function applyStyling(className) {
  // 将样式应用于元素的函数
  function applyStyle(element, color, fontWeight) {
    element.style.color = color;
    element.style.fontWeight = fontWeight;
  }

  const selected = '.form-control[name="' + className + '"]';
  const inputFields = document.querySelectorAll(selected);

  for (const inputField of inputFields) {
    const inputValue = inputField.value;

    switch (className) {
      case "SBP":
        if (parseInt(inputValue) < 80 || parseInt(inputValue) > 140) {
          applyStyle(inputField, "red", "bold");
        } else {
          applyStyle(inputField, "black", "normal");
        }
        break;
      case "DBP":
        if (parseInt(inputValue) < 50 || parseInt(inputValue) > 90) {
          applyStyle(inputField, "red", "bold");
        } else {
          applyStyle(inputField, "black", "normal");
        }
        break;
      case "heart":
        if (parseInt(inputValue) < 110 || parseInt(inputValue) > 160) {
          applyStyle(inputField, "red", "bold");
        } else {
          applyStyle(inputField, "black", "normal");
        }
        break;
      case "position":
        if (inputValue === "異常") {
          applyStyle(inputField, "red", "bold");
        } else {
          applyStyle(inputField, "black", "normal");
        }
        break;
      case "edema":
      case "varicose_veins":
        if (inputValue === "+") {
          applyStyle(inputField, "red", "bold");
        } else {
          applyStyle(inputField, "black", "normal");
        }
        break;
      case "urine_protein":
      case "urine_sugar":
        if (["++", "+++", "++++"].includes(inputValue)) {
          applyStyle(inputField, "red", "bold");
        } else {
          applyStyle(inputField, "black", "normal");
        }
        break;
      case "Bleeding":
      case "Stomach_ache":
      case "Headache":
      case "Spasms":
        if (inputValue === "+") {
          applyStyle(inputField, "red", "bold");
        } else {
          applyStyle(inputField, "black", "normal");
        }
        break;
      default:
        applyStyle(inputField, "black", "normal");
      case "FHB":
        if (inputValue === "無") {
          inputField.style.color = "red";
          inputField.style.fontWeight = "bold";
        } else {
          inputField.style.color = "black";
          inputField.style.fontWeight = "normal";
        }
        break;
      case "FCPosition":
        if (inputValue === "異常") {
          inputField.style.color = "red";
          inputField.style.fontWeight = "bold";
        } else {
          inputField.style.color = "black";
          inputField.style.fontWeight = "normal";
        }
        break;

      case "CRL":
        const numericValueCRL = parseFloat(inputValue);
        if (numericValueCRL >= 1.6 && numericValueCRL <= 2.0) {
          inputField.style.color = "black";
          inputField.style.fontWeight = "normal";
        } else {
          inputField.style.color = "red";
          inputField.style.fontWeight = "bold";
        }
        break;

      case "BPD":
        const numericValueBPD = parseFloat(inputValue);
        if (numericValueBPD >= 1.3 && numericValueBPD <= 1.8) {
          inputField.style.color = "black";
          inputField.style.fontWeight = "normal";
        } else {
          inputField.style.color = "red";
          inputField.style.fontWeight = "bold";
        }
        break;
      case "SR":
        if (inputValue === "需進一步追蹤檢查") {
          inputField.style.color = "red";
          inputField.style.fontWeight = "bold";
        } else {
          inputField.style.color = "black";
          inputField.style.fontWeight = "normal";
        }
        break;

    }
  }
}


