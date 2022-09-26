const env = require('./test_env')

env.api.queryBlockHeaderWithBlockNumber(26518031)
    .then(result => {
        console.log('result', result)
        console.log('result.block_header', result.block_header())
    })
    .catch(err => {
        console.error(err)
    })