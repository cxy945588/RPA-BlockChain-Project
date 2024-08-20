import { contractAddress, contractABI } from '../List.js';

window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        window.web3 = new Web3(window.ethereum);

        try {
            await window.ethereum.enable();

            const accounts = await window.web3.eth.getAccounts();
            if (accounts.length === 0) {
                throw new Error('No accounts found in MetaMask. Please unlock your wallet.');
            }
            const userAddress = accounts[0];

            const contract = new window.web3.eth.Contract(contractABI, contractAddress);

            const checkButton = document.getElementById('connectWalletButton');
            const resultElement = document.getElementById('result');

            checkButton.addEventListener('click', async () => {
                try {
                    const listResult = await contract.methods.checkList(userAddress).call();

                    if (listResult === 'Address is in List 1') {
                        window.location.href = '../HTML/PM_index.html';
                    } else if (listResult === 'Address is in List 2') {
                        window.location.href = '../HTML/D_index.html';
                    } else if (listResult === 'Address is in List 3') {
                        window.location.href = '../HTML/P_N_index.html';
                    } else {
                        window.location.href = '4.html';
                    }
                } catch (error) {
                    console.error(error);
                    resultElement.textContent = 'Error: ' + error.message;
                }
            });
        } catch (error) {
            console.error(error);
        }
    } else {
        console.log('MetaMask未安装');
    }
});