import Promise from "bluebird";
import _ from "lodash";
import fs from "fs";
import * as utils from "./utils";

let IS_DB = false;
if (fs.existsSync(utils.sqlite3_file)) {
  IS_DB = true;
}

utils.db.open(utils.sqlite3_file, { Promise })
  .then(() => {
    return utils.db.run("CREATE TABLE IF NOT EXISTS `last` (`address` TEXT NOT NULL UNIQUE, `num` INTEGER NOT NULL DEFAULT 0)");
  })
  .then(() => {
    if (_.isEmpty(utils.billink) || _.isEmpty(utils.accountTaxman) || _.isEmpty(utils.privateTaxman) || _.isEmpty(utils.CORE)) {
      console.error('Проверь адреса billink accountTaxman privateTaxman CORE');
      return false;
    }
    return true;
  })
  .then((success) => {
    if (success) {
      let LASTBLOCK = 0;
      let addrContracts = [];
      utils.getBlock()
        .then((result) => {
          if (utils.LAST_BLOCK === 'latest') {
            LASTBLOCK = result
          } else {
            LASTBLOCK = Number(utils.LAST_BLOCK)
          }
          return utils.getContracts()
        })
        .then((contracts) => {
          addrContracts = contracts;
          const promises = [];
          _.forEach(addrContracts, (type, address) => {
            promises.push(utils.db.get("SELECT * FROM last WHERE address=?", [address]))
          });
          return Promise.all(promises);
        })
        .then((rows) => {
          const promises = [];
          _.forEach(rows, (row, i) => {
            let lastBlock = LASTBLOCK;
            if (row) {
              lastBlock = row.num;
            }
            promises.push(utils.getTransactions(addrContracts[row.address], row.address, lastBlock))
          });
          return Promise.all(promises);
        })
        .then((transactions) => {
          const balances = {}
          _.forEach(transactions, (result, i) => {
            if (result[1] > 0) {
              _.forEach(result[2], (balance, account) => {
                if (!_.has(balances, account)) {
                  balances[account] = balance
                } else {
                  balances[account] = balances[account].plus(balance)
                }
              })
              utils.db.get("SELECT * FROM last WHERE address=?", [result[0]])
                .then((row) => {
                  if (!row) {
                    utils.db.run("INSERT INTO last (address, num) VALUES (?, ?)", result[0], result[1]);
                  } else {
                    utils.db.run("UPDATE last SET num = ? WHERE address=?", result[1], result[0]);
                  }
                })
            }
          });
          return balances;
        })
        .then((balances) => {
          let count = utils.web3.eth.getTransactionCount(utils.accountTaxman);
          _.forEach(balances, (balance, account) => {
            utils.serviceFee(count, account, balance);
            count += 1;
          })
        })
        .catch((e) => {
          console.log('e', e);
        })
      }
  })
  .catch((e) => {
    console.log('e2', e);
  })
