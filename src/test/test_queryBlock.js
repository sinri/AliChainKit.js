const env = require('./test_env')
const AliChainDataReader = require("../main/entity/AliChainDataReader");
require("../main/AliChainKit");
env.api.queryBlockWithBlockNumber(26518031)
    .then(result => {
        console.log('result', result)
        console.log('result.block', result.block())
        console.log('result.block.block_header', result.block().block_header())
        console.log('result.block.block_body', result.block().block_body())

        let transaction_list= result.block().block_body().transaction_list()
        for(let i=0;i<transaction_list.length;i++){
            let transaction=transaction_list[i]
            console.log('transaction',i,transaction )
            console.log('total:',transaction.total())
            console.log('get 0',transaction.get([0]))
            console.log('get 5',transaction.get([5]))
            console.log('get 6',transaction.get([6]))
            console.log('get 12',transaction.get([12]))
        }

        let receipt_list=result.block().block_body().receipt_list()
        for(let i=0;i<receipt_list.length;i++){
            let receipt=receipt_list[i]
            console.log('receipt',i,receipt)
            console.log('total:',receipt.total())
            console.log('get 1',receipt.get([1]))
            console.log('get 2.0.1',receipt.get([2,0,1]))
            console.log('get 2.0.2',receipt.get([2,0,2]))
            console.log('get 2.0.3',receipt.get([2,0,3]))
        }
    })
    .catch(err => {
        console.error(err)
    })