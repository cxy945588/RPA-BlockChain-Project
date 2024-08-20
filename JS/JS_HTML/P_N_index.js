import { contractAddress, contractABI } from '../D_check.js';

// 檢查是否有以太坊瀏覽器插件（例如：MetaMask）
if (typeof window.ethereum !== 'undefined') {
    const web3 = new Web3(window.ethereum);
    window.ethereum.enable().then(async function () {
        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0]; // 獲取當前使用者的以太坊地址
        
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // 調用智能合約中的 getDataRecordsByAddress 函數
        const recordIndices = await contract.methods.getDataRecordsByAddress(userAddress).call();
        
        if (recordIndices == ""){
            console.log("No data inside.");

            alert("沒有產檢紀錄。");
            window.location.href = "../HTML/login.html";

        }
       
        const resultDiv = document.getElementById('result');

        for (let i = 0; i < recordIndices.length; i++) {
            const index = recordIndices[i];
            const record = await contract.methods.getDataRecord(index).call();
            const date = new Date(record[4] * 1000).toLocaleString();

            resultDiv.innerHTML += `<div class='cd-timeline__block'>
                <div class='cd-timeline__img cd-timeline__img--picture'>
                    <img src='../CSS/P_icon.png' alt='Picture'>
                </div> <!-- cd-timeline__img -->
                <div id='content1' class='cd-timeline__content text-component'>
                    <h2>${record[1]}</h2>
                    <div class='flex justify-between items-center'>
                        <span class='cd-timeline__date'>${date}</span>
                        <a id='downloadReportButton' class='btn btn--subtle' data-ipfs-cid='${record[2]}'>產檢報告</a>
                        <a id='viewCertificateButton' class='btn btn--subtle' data-ipfs-cid='${record[2]}'>查看憑證</a>
                    </div>
                </div> <!-- cd-timeline__content -->
            </div>`;
        }

        // 在頁面加載後，為所有查看憑證按鈕添加點擊事件監聽器
        const viewCertificateButtons = document.querySelectorAll('#viewCertificateButton');
        viewCertificateButtons.forEach(button => {
            button.addEventListener('click', () => viewCertificate(button));
        });
        const downloadReportButton = document.querySelectorAll('#downloadReportButton');
        downloadReportButton.forEach(button => {
            button.addEventListener('click', () => DRB(button));
        });

        // 新增下載報告的功能
        //const downloadReportButton = document.getElementById('downloadReportButton');
/*
        if (downloadReportButton) {
            downloadReportButton.addEventListener('click', function () {
                const pdfUrl = 'https://ipfs.io/ipfs/QmbzaocWn2Yn9hpLRphvzfMfVhnBqtfyuhPXP2nu6Ey4er?filename=A123123%E7%AC%AC%E4%B8%80%E6%AC%A1%E7%94%A2%E6%AA%A2%E6%86%91%E8%AD%89.pdf';
                window.open(pdfUrl, '_blank');
            });
        } else {
            console.error('無法找到下載報告按鈕（downloadReportButton）。');
        }
        */
    });
} else {
    console.log('請安裝以太坊瀏覽器插件（例如：MetaMask）');
}

// 查看憑證的函數
async function DRB(button) {
    
    const ipfsCID = button.getAttribute('data-ipfs-cid');
    const pdfUrl = 'https://ipfs.io/ipfs/' + ipfsCID + '?';
    window.open(pdfUrl, '_blank');

}

// 查看憑證的函數
async function viewCertificate(button) {
    const ipfsCID = button.getAttribute('data-ipfs-cid');
    const pdfViewer = document.getElementById('pdfViewer');

    try {
        // 使用IPFS網頁閘道的URL來載入PDF憑證
        const pdfUrl = `https://ipfs.io/ipfs/${ipfsCID}`;
        const response = await fetch(pdfUrl);

        if (response.ok) {
            const pdfBlob = await response.blob();
            const pdfBlobUrl = URL.createObjectURL(pdfBlob);

            // 顯示PDF憑證在iframe中
            pdfViewer.innerHTML = `<iframe src="${pdfBlobUrl}" width="100%" height="600px"></iframe>`;

            // 添加點擊事件監聽器，單擊窗口以外的地方時，關閉窗口
            document.addEventListener('click', closePdfViewer);

            // 阻止點擊事件冒泡到查看憑證按鈕，以防止立即關閉
            button.addEventListener('click', e => e.stopPropagation());
        } else {
            console.error('無法載入PDF憑證。');
        }
    } catch (error) {
        console.error('發生錯誤：', error);
    }
}

// 關閉 PDF 顯示窗口的函數
function closePdfViewer() {
    const pdfViewer = document.getElementById('pdfViewer');
    pdfViewer.innerHTML = '';  // 清空內容
    document.removeEventListener('click', closePdfViewer);  // 移除點擊事件監聽器
}
