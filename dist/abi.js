"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Core = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_owner", "type": "address" }], "name": "setOwner", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "first", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "abiOf", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "hammer", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "founder", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_module", "type": "address" }], "name": "contains", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_module", "type": "address" }], "name": "getName", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_name", "type": "string" }], "name": "get", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "description", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_name", "type": "string" }], "name": "remove", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "destroy", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_name", "type": "string" }], "name": "isConstant", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "size", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_current", "type": "address" }], "name": "next", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_hammer", "type": "address" }], "name": "setHammer", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_name", "type": "string" }, { "name": "_module", "type": "address" }, { "name": "_abi", "type": "string" }, { "name": "_constant", "type": "bool" }], "name": "set", "outputs": [], "payable": false, "type": "function" }, { "inputs": [{ "name": "_name", "type": "string" }, { "name": "_description", "type": "string" }], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "module", "type": "address" }], "name": "ModuleAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "module", "type": "address" }], "name": "ModuleRemoved", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }], "name": "ModuleReplaced", "type": "event" }];

var Token = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }], "name": "setPeriod", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_owner", "type": "address" }], "name": "setOwner", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }], "name": "burn", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "hammer", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "operator", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }], "name": "emission", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "emitentGroup", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "destroy", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "timestamp", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_hammer", "type": "address" }], "name": "setHammer", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "acl", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "period", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }], "name": "unapprove", "outputs": [], "payable": false, "type": "function" }, { "inputs": [{ "name": "_name", "type": "string" }, { "name": "_symbol", "type": "string" }, { "name": "_decimals", "type": "uint8" }, { "name": "_start_count", "type": "uint256" }, { "name": "_acl_storage", "type": "address" }, { "name": "_emitent_group", "type": "string" }, { "name": "_operator", "type": "address" }], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Approval", "type": "event" }];

var Billing = [{
  "constant": false,
  "inputs": [{
    "name": "_owner",
    "type": "address"
  }],
  "name": "setOwner",
  "outputs": [],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "",
    "type": "address"
  }],
  "name": "balances",
  "outputs": [{
    "name": "",
    "type": "int256"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "beneficiary",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "hammer",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "taxman",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_account",
    "type": "address"
  }, {
    "name": "_fee",
    "type": "uint256"
  }],
  "name": "serviceFee",
  "outputs": [],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [],
  "name": "destroy",
  "outputs": [],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_amount",
    "type": "uint256"
  }],
  "name": "payment",
  "outputs": [],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "owner",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_hammer",
    "type": "address"
  }],
  "name": "setHammer",
  "outputs": [],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "token",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "type": "function"
}, {
  "inputs": [{
    "name": "_token",
    "type": "address"
  }, {
    "name": "_taxman",
    "type": "address"
  }, {
    "name": "_beneficiary",
    "type": "address"
  }],
  "payable": false,
  "type": "constructor"
}];

exports.default = {
  Core: Core,
  Token: Token,
  Billing: Billing
};