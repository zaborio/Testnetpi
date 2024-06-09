async function loadBlockchain() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        return;
    }

    const contractAddress = 'YOUR_CONTRACT_ADDRESS';  // Remplacez par l'adresse de votre contrat
    const abi = [
        // ABI de votre contrat
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "x",
                    "type": "uint256"
                }
            ],
            "name": "set",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "get",
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

    const contract = new web3.eth.Contract(abi, contractAddress);
    const accounts = await web3.eth.getAccounts();

    const storedData = await contract.methods.get().call();
    document.getElementById('storedData').innerText = storedData;
}

async function setData() {
    const contractAddress = 'YOUR_CONTRACT_ADDRESS';  // Remplacez par l'adresse de votre contrat
    const abi = [
        // ABI de votre contrat
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "x",
                    "type": "uint256"
                }
            ],
            "name": "set",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "get",
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

    const contract = new web3.eth.Contract(abi, contractAddress);
    const accounts = await web3.eth.getAccounts();
    const value = document.getElementById('newData').value;

    await contract.methods.set(value).send({ from: accounts[0] });
    loadBlockchain();
}

window.onload = loadBlockchain;