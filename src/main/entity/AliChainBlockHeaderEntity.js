const AliChainEntity = require("./AliChainEntity");

class AliChainBlockHeaderEntity extends AliChainEntity {
    /**
     *
     * @returns {string} 区块头的哈希
     */
    hash() {
        return this.get('hash')
    }

    /**
     * @returns {number} 版本，兼容性区分
     */
    version() {
        return this.get('version')
    }

    /**
     * @returns {number} 区块号
     */
    number() {
        return this.get('number')
    }

    /**
     * @returns {string} 上一区块哈希
     */
    parent_hash() {
        return this.get('parent_hash')
    }

    /**
     * @returns {string} 区块体中的交易构成的默克尔哈希根
     */
    transaction_root() {
        return this.get('transaction_root')
    }

    /**
     * @returns {string} 区块体中的收据构成的默克尔哈希根
     */
    receipt_root() {
        return this.get('receipt_root')
    }

    /**
     * @returns {string} 世界状态的默克尔哈希根
     */
    state_root() {
        return this.get('state_root')
    }

    /**
     * @returns {number} 交易执行的总消耗量
     */
    gas_used() {
        return this.get('gas_used')
    }

    /**
     * @returns {number} 时间戳
     */
    timestamp() {
        return this.get('timestamp')
    }

    /**
     * @returns {string} 日志布隆过滤器
     */
    log_bloom() {
        return this.get('log_bloom')
    }

}

module.exports = AliChainBlockHeaderEntity