import Web3 from "web3";
import EthereumTx from "ethereumjs-tx";
import _ from "lodash";
import axios from 'axios';
import BigNumber from "bignumber.js";
import abi from "./abi";

export const billink = process.env.BILLING || ''
export const accountTaxman = process.env.TAXMAN || ''
export const privateTaxman = process.env.PRIVATE_KEY || '';
export const CORE = process.env.CORE || '';
export const LAST_BLOCK = process.env.LAST_BLOCK || 'latest';
const CHAINID = process.env.CHAINID || 1;
const GAS_PRICE = process.env.GAS_PRICE || 20000000000;
const GAS_LIMIT = process.env.GAS_LIMIT || 35000;
const PARITY = process.env.PARITY || 'https://mainnet.infura.io/metamask'

export const db = require('sqlite');
export const sqlite3_file=__dirname+'/data/db.sqlite3';

export const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(PARITY));

export const getContracts = () => {
  return new Promise((resolve) => {
    const addrContracts = [];
    // addrContracts.push('0x51b52d3a8eb9c2dad5b08ee66c2faa0ab38ad097')
    // addrContracts.push('0x259e4b009a1611f47231975bf9f5a585c70fe591')
    const contract = web3.eth.contract(abi.Core).at(CORE)
    let address = contract.first();
    while (address !== '0x0000000000000000000000000000000000000000') {
      const type = contract.abiOf(address);
      if (type !== '' && type !== 'agents') {
        addrContracts.push({ address: type })
      }
      address = contract.next(address);
    }
    resolve(addrContracts);
  });
}

export const getBlock = () => {
  return axios.get('https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=M1KX26NG5RF9P7R27XETQEB31IPAYUPVMS')
    .then((result) => {
      return parseInt(result.data.result, 16)
    })
}

export const getTransactions = (type, address, startblock = 0, endblock = 'latest') => {
  return axios.get('https://api.etherscan.io/api?module=account&action=txlist&address=' + address + '&startblock=' + startblock + '&endblock=' + endblock + '&sort=asc&apikey=M1KX26NG5RF9P7R27XETQEB31IPAYUPVMS')
    .then((result) => {
      let last = startblock;
      const balances = {};
      _.forEach(result.data.result, (tx) => {
        let commission = 0;
        if ((type === 'tokenAcl' || type === 'token-acl') && tx.input.substring(0,10) === '0xa9059cbb') { // transfer
          const amount = parseInt(tx.input.substring(74,138), 16)
          commission = Number(amount * 0.04 / 100)
        } else if ((type === 'tokenAcl' || type === 'token-acl') && tx.input.substring(0,10) === '0x58292a3d') { // emission
          const amount = parseInt(tx.input.substring(10,74), 16)
          commission = Number(amount * 0.02 / 100)
        }
        if (commission > 0) {
          if (!_.has(balances, tx.from)) {
            balances[tx.from] = new BigNumber(web3.toWei(commission))
          } else {
            balances[tx.from] = balances[tx.from].plus(new BigNumber(web3.toWei(commission)))
          }
        }
        last = Number(tx.blockNumber) + 1;
      });
      return [address, last, balances]
    })
}

export const serviceFee = (count, account, balance) => {
  const tx = sign(billink, count, account, balance);
  web3.eth.sendRawTransaction('0x'+tx, (err, hash) => {
    if (!err) {
      console.log('tx', hash);
    } else {
      console.log('tx e', err);
    }
  });
}

export const sign = function(to, count, account, amount) {
  const privateKey = Buffer.from(privateTaxman, 'hex');
  const txParams = {
    nonce: '0x'+ Number(count).toString(16),
    gasPrice: Number(GAS_PRICE),
    gasLimit: Number(GAS_LIMIT),
    from: accountTaxman,
    to: to,
    data: '0x81edaae4000000000000000000000000'+ account.replace(/^0x/, '') + _.padStart(Number(amount).toString(16), 64, '0'),
    chainId: Number(CHAINID)
  };
  const tx = new EthereumTx(txParams);
  tx.sign(privateKey);
  return tx.serialize().toString('hex');
}
