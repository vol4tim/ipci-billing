"use strict";

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _utils = require("./utils");

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IS_DB = false;
if (_fs2.default.existsSync(utils.sqlite3_file)) {
  IS_DB = true;
}

utils.db.open(utils.sqlite3_file, { Promise: _bluebird2.default }).then(function () {
  return utils.db.run("CREATE TABLE IF NOT EXISTS `last` (`address` TEXT NOT NULL UNIQUE, `num` INTEGER NOT NULL DEFAULT 0)");
}).then(function () {
  if (_lodash2.default.isEmpty(utils.billink) || _lodash2.default.isEmpty(utils.accountTaxman) || _lodash2.default.isEmpty(utils.privateTaxman) || _lodash2.default.isEmpty(utils.CORE)) {
    console.error('Проверь адреса billink accountTaxman privateTaxman CORE');
    return false;
  }
  return true;
}).then(function (success) {
  if (success) {
    var LASTBLOCK = 0;
    var addrContracts = [];
    utils.getBlock().then(function (result) {
      if (utils.LAST_BLOCK === 'latest') {
        LASTBLOCK = result;
      } else {
        LASTBLOCK = Number(utils.LAST_BLOCK);
      }
      return utils.getContracts();
    }).then(function (contracts) {
      addrContracts = contracts;
      var promises = [];
      _lodash2.default.forEach(addrContracts, function (address) {
        promises.push(utils.db.get("SELECT * FROM last WHERE address=?", [address]));
      });
      return _bluebird2.default.all(promises);
    }).then(function (rows) {
      var promises = [];
      _lodash2.default.forEach(rows, function (row, i) {
        var lastBlock = LASTBLOCK;
        if (row) {
          lastBlock = row.num;
        }
        promises.push(utils.getTransactions(addrContracts[i], lastBlock));
      });
      return _bluebird2.default.all(promises);
    }).then(function (transactions) {
      var balances = {};
      _lodash2.default.forEach(transactions, function (result, i) {
        if (result[1] > 0) {
          _lodash2.default.forEach(result[2], function (balance, account) {
            if (!_lodash2.default.has(balances, account)) {
              balances[account] = balance;
            } else {
              balances[account] = balances[account].plus(balance);
            }
          });
          utils.db.get("SELECT * FROM last WHERE address=?", [result[0]]).then(function (row) {
            if (!row) {
              utils.db.run("INSERT INTO last (address, num) VALUES (?, ?)", result[0], result[1]);
            } else {
              utils.db.run("UPDATE last SET num = ? WHERE address=?", result[1], result[0]);
            }
          });
        }
      });
      return balances;
    }).then(function (balances) {
      var count = utils.web3.eth.getTransactionCount(utils.accountTaxman);
      _lodash2.default.forEach(balances, function (balance, account) {
        utils.serviceFee(count, account, balance);
        count += 1;
      });
    }).catch(function (e) {
      console.log('e', e);
    });
  }
}).catch(function (e) {
  console.log('e2', e);
});