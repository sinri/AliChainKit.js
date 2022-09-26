const AliChainEntity = require("./AliChainEntity");

class AliChainLogEntity extends AliChainEntity{
    /**
     *
     * @returns {string} 交易的发送者
     */
    from(){
        return this.get('from')
    }
    /**
     *
     * @returns {string} 交易的接受者
     */
    to(){
        return this.get('to')
    }
    /**
     *
     * @returns {Array} 订阅的主题
     */
    topics(){
        return this.get('topics')
    }
    /**
     *
     * @returns {Array} 交易产生的日志
     */
    log_data(){
        return this.get('log_data')
    }
}

module.exports=AliChainLogEntity