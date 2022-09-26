const env = require('./test_env')
const TestContractA = require("./TestContractA");
const AliChainSolidityCompiler = require("../main/AliChainSolidityCompiler")
const AliChainKit = require("../main/AliChainKit");

let s = new AliChainSolidityCompiler("./s1.solc")
let contract_name = "leqee-sample-contract-20220924004100"
let contract = env.api.contract(TestContractA, contract_name, s.getAbi())

let accountNameHash = AliChainKit.getHash(env.accountName)
contract.Issue(accountNameHash, 1, env.accountName)
    .then(result => {
        console.log('result.output', result.output())
        console.log('result.data', result.data())
        console.log('result.data.receipt', result.data().receipt())
        let log_entry_list = result.data().receipt().log_entry()
        for (let i = 0; i < log_entry_list.length; i++) {
            console.log('result.data.receipt.log_entry[' + i + ']', log_entry_list[i])
        }
        console.log('result.data.txhash', result.data().txhash())
    })
    .catch(err => {
        console.error(err)
    })