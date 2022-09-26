const env = require('./test_env')
const AliChainKit = require("../main/AliChainKit");

const txhash = '0x380d6774a300974fab715fba9ea55bce467d204bf43b2ea2878c1bc440051778'
env.api.queryTransaction(txhash)
    .then(result => {
        console.log('result of query transaction ', txhash, result)
        console.log('transaction',result.transaction())
        console.log('transaction_index',result.transaction_index())

        console.log(AliChainKit.toUtf8(result.transaction().data()))
    })