"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sign = exports.serviceFee = exports.getTransactions = exports.getBlock = exports.getContracts = exports.web3 = exports.sqlite3_file = exports.db = exports.LAST_BLOCK = exports.CORE = exports.privateTaxman = exports.accountTaxman = exports.billink = undefined;

var _web = require("web3");

var _web2 = _interopRequireDefault(_web);

var _ethereumjsTx = require("ethereumjs-tx");

var _ethereumjsTx2 = _interopRequireDefault(_ethereumjsTx);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _bignumber = require("bignumber.js");

var _bignumber2 = _interopRequireDefault(_bignumber);

var _abi = require("./abi");

var _abi2 = _interopRequireDefault(_abi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var billink = exports.billink = process.env.BILLING || '';
var accountTaxman = exports.accountTaxman = process.env.TAXMAN || '';
var privateTaxman = exports.privateTaxman = process.env.PRIVATE_KEY || '';
var CORE = exports.CORE = process.env.CORE || '';
var LAST_BLOCK = exports.LAST_BLOCK = process.env.LAST_BLOCK || 'latest';
var CHAINID = process.env.CHAINID || 1;
var GAS_PRICE = process.env.GAS_PRICE || 20000000000;
var GAS_LIMIT = process.env.GAS_LIMIT || 35000;
var PARITY = process.env.PARITY || 'https://mainnet.infura.io/metamask';
var COMMISSION = process.env.COMMISSION || 0.01;

var db = exports.db = require('sqlite');
var sqlite3_file = exports.sqlite3_file = __dirname + '/data/db.sqlite3';

var web3 = exports.web3 = new _web2.default();
web3.setProvider(new web3.providers.HttpProvider(PARITY));

var getContracts = exports.getContracts = function getContracts() {
  return new Promise(function (resolve) {
    var addrContracts = [];
    // addrContracts.push('0x51b52d3a8eb9c2dad5b08ee66c2faa0ab38ad097')
    // addrContracts.push('0x259e4b009a1611f47231975bf9f5a585c70fe591')
    var contract = web3.eth.contract(_abi2.default.Core).at(CORE);
    var address = contract.first();
    while (address !== '0x0000000000000000000000000000000000000000') {
      var type = contract.abiOf(address);
      if (type !== '' && type !== 'agents') {
        addrContracts.push(address);
      }
      address = contract.next(address);
    }
    resolve(addrContracts);
  });
};

var getBlock = exports.getBlock = function getBlock() {
  return _axios2.default.get('https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=M1KX26NG5RF9P7R27XETQEB31IPAYUPVMS').then(function (result) {
    return parseInt(result.data.result, 16);
  });
};

var getTransactions = exports.getTransactions = function getTransactions(address) {
  var startblock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var endblock = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'latest';

  return _axios2.default.get('https://api.etherscan.io/api?module=account&action=txlist&address=' + address + '&startblock=' + startblock + '&endblock=' + endblock + '&sort=asc&apikey=M1KX26NG5RF9P7R27XETQEB31IPAYUPVMS').then(function (result) {
    var last = startblock;
    var balances = {};
    _lodash2.default.forEach(result.data.result, function (tx) {
      var commission = 0;
      if (tx.input.substring(0, 10) === '0xa9059cbb') {
        commission = Number(COMMISSION);
      }
      if (commission > 0) {
        if (!_lodash2.default.has(balances, tx.from)) {
          balances[tx.from] = new _bignumber2.default(web3.toWei(commission));
        } else {
          balances[tx.from] = balances[tx.from].plus(new _bignumber2.default(web3.toWei(commission)));
        }
      }
      last = Number(tx.blockNumber) + 1;
    });
    return [address, last, balances];
  });
};

var serviceFee = exports.serviceFee = function serviceFee(count, account, balance) {
  var tx = sign(billink, count, account, balance);
  web3.eth.sendRawTransaction('0x' + tx, function (err, hash) {
    if (!err) {
      console.log('tx', hash);
    } else {
      console.log('tx e', err);
    }
  });
};

var sign = exports.sign = function sign(to, count, account, amount) {
  var privateKey = Buffer.from(privateTaxman, 'hex');
  var txParams = {
    nonce: '0x' + Number(count).toString(16),
    gasPrice: Number(GAS_PRICE),
    gasLimit: Number(GAS_LIMIT),
    from: accountTaxman,
    to: to,
    data: '0x81edaae4000000000000000000000000' + account.replace(/^0x/, '') + _lodash2.default.padStart(Number(amount).toString(16), 64, '0'),
    chainId: Number(CHAINID)
  };
  var tx = new _ethereumjsTx2.default(txParams);
  tx.sign(privateKey);
  return tx.serialize().toString('hex');
};