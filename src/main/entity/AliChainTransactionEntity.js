const AliChainEntity = require("./AliChainEntity");

class AliChainTransactionEntity extends AliChainEntity{
    /**
     *
     * @returns {string} 交易的哈希，由排除 signature 字段的所有字段构成
     */
    hash(){
        return this.get("hash")
    }
    /**
     *
     * @returns {number} 交易的类型
     */
    type(){
        return this.get("type")
    }
    /**
     *
     * @returns {number} 交易的时间戳
     */
    timestamp(){
        return this.get("timestamp")
    }
    /**
     *
     * @returns {number} 防止重放攻击
     */
    nonce(){
        return this.get("nonce")
    }
    /**
     *
     * @returns {number} 单位为毫秒，事务开始或结束的时间，为未来扩展使用。
     */
    period(){
        return this.get("period")
    }
    /**
     *
     * @returns {string} 交易的发送者
     */
    from(){
        return this.get("from")
    }
    /**
     *
     * @returns {string} 交易的接受者
     */
    to(){
        return this.get("to")
    }
    /**
     *
     * @returns {number} 转账金额
     */
    value(){
        return this.get("value")
    }
    /**
     *
     * @returns {number} 交易执行的消耗费用
     */
    gas(){
        return this.get("gas")
    }
    /**
     *
     * @returns {string} 见交易对象 data 编码方式
     */
    data(){
        return this.get("data")
    }
    /**
     *
     * @returns {string} 交易在一个群组中执行
     */
    group_id(){
        return this.get("group_id")
    }
    /**
     *
     * @returns {string} 签名，使用一个或者多个私钥对 hash 加签
     */
    signature(){
        return this.get("signature")
    }
    /**
     *
     * @returns {string} 交易扩展字段，目前 JS SDK 尚不支持
     */
    extensions(){
        return this.get("extensions")
    }
}

module.exports=AliChainTransactionEntity