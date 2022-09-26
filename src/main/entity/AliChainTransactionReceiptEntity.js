const AliChainEntity = require("./AliChainEntity");
const AliChainLogEntity = require("./AliChainLogEntity");

class AliChainTransactionReceiptEntity extends AliChainEntity{
    /**
     *
     * @returns {number} 交易结果
     */
    result(){
        return this.get('result')
    }
    /**
     *
     * @returns {number} 交易执行的消耗费用
     */
    gas_used(){
        return this.get('gas_used')
    }
    // logs	Array	交易执行的日志集合
    /**
     *
     * @returns {Array} 交易执行的日志集合
     */
    logs(){
        return this.get('logs')
    }

    /**
     *
     * @returns {AliChainLogEntity[]}交易执行的日志集合
     */
    log_entry(){
        let x=[]
        let l=this.get('log_entry');
        for(let i=0;i<l.length;i++){
            x.push(new AliChainLogEntity(l[i]))
        }
        return x
    }
    /**
     *
     * @returns {BigNumber} 合约的 output
     */
    output(){
        return this.get('output')
    }
    /**
     *
     * @returns {number} 解析合约 output 的偏移量
     */
    offset(){
        return this.get('offset')
    }

}

module.exports=AliChainTransactionReceiptEntity