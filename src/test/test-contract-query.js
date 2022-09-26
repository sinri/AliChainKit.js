const env = require('./test_env')
const TestContractA = require("./TestContractA");
const AliChainSolidityCompiler = require("../main/AliChainSolidityCompiler")
const AliChainKit = require("../main/AliChainKit");

let s = new AliChainSolidityCompiler("./s1.solc")
let contract_name = "leqee-sample-contract-20220924004100"
let contract = env.api.contract(TestContractA, contract_name, s.getAbi())

let accountNameHash = AliChainKit.getHash(env.accountName)

contract.Query(accountNameHash,env.accountName)
    .then(queryResult=>{
        console.log('output',queryResult.output().toString(),'fixed',queryResult.output().toFixed())
        console.log('data',queryResult.data())
        console.log('data.receipt',queryResult.data().receipt())
    })
    .catch(err => {
        console.error(err)
    })