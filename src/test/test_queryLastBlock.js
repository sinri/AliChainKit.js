const env = require('./test_env')

env.api.queryLastBlock()
    .then(result => {
        console.log('result', result)
    })
    .catch(err => {
        console.error(err)
    })