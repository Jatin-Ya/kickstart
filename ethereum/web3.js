const Web3 = require('web3');

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'){
    window.ethereum.request({method : "eth_requestAccounts"})
    web3= new Web3(window.ethereum);
}
else {
    const Provider = new Web3.providers.HttpProvider(
        process.env.MY_ENDPOINT
    );
    web3 = new Web3(Provider);
}

export default web3;