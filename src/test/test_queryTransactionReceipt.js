const env = require('./test_env')
const AliChainKit = require("../main/AliChainKit");

const txhash = '0x6da1cb42571fe52da08173e479ab8477f582087c127fc1d43dcf4112da0806e9'

env.api.queryTransactionReceipt(txhash)
    .then(result => {
        console.log('queryTransactionReceipt of ', txhash, ' result is ', result)
    })
    .catch(err => {
        console.error(err)
    })