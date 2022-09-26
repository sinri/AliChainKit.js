const env = require('./test_env')


function test(x) {
    env.api.queryContract(x)
        .then(result => {
            console.log('AliChainApiResultWithContract -> ', result);
            console.log('AliChainApiResultWithContract -> data', result.data());
        })
}

test(env.accountName) // not a contract identity -> 0x0000000000000000000000000000000000000000000000000000000000000000
test("leqee-sample-contract-20220924004100") // contract identity
