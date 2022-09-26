const AliChainContract = require("../main/AliChainContract");
const AliChainEntity = require("../main/entity/AliChainEntity");
const AliChainApiResult = require("../main/entity/AliChainApiResult");
const AliChainTransactionReceiptEntity = require("../main/entity/AliChainTransactionReceiptEntity");

class TestContractA extends AliChainContract {
    Issue(identity, value, account_name) {
        return new Promise((resolve, reject) => {
            this._contract.Issue(identity, value, {from: account_name}, (err, output, data) => {
                if (err) {
                    reject(err)
                } else {
                    let TestContractAIssueResult = class extends AliChainEntity {
                        /**
                         *
                         * @returns {boolean}
                         */
                        output() {
                            return this.get('output')
                        }

                        data() {
                            let TestContractAIssueResultData=class extends AliChainApiResult {
                                receipt(){
                                    return new AliChainTransactionReceiptEntity(this.get("receipt"))
                                }
                                block_number(){
                                    return this.get('block_number')
                                }
                                transaction_index(){
                                    return this.get('transaction_index')
                                }
                                txhash(){
                                    return this.get('txhash')
                                }
                            }

                           return new TestContractAIssueResultData(this.get('data'))
                        }
                    }
                    resolve(new TestContractAIssueResult({output: output, data: data}))
                }
            })
        })

    }

    Query(account_hash,account_name){
        return new Promise((resolve, reject)=>{
            this._contract.Query(account_hash,{from: account_name}, (err, output, data) => {
                if (err) {
                    reject(err)
                } else {
                    let TestContractAQueryResult=class extends AliChainApiResult{
                        /**
                         *
                         * @returns {BigNumber}
                         */
                        output(){
                            return this.get('output')
                        }
                        data(){
                            let QueryTransactionReceiptResult=class extends AliChainApiResult{
                                block_number(){
                                    return this.get('block_number')
                                }
                                receipt(){
                                    return new AliChainTransactionReceiptEntity(this.get('receipt'))
                                }
                                transaction_index(){
                                    return this.get('transaction_index')
                                }
                            }
                            return new QueryTransactionReceiptResult(this.get('data'))
                        }
                    }
                    resolve(new TestContractAQueryResult({
                        output:output,
                        data:data,
                    }))
                }
            })
        })
    }
}

module.exports = TestContractA