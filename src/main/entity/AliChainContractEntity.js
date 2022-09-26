const AliChainEntity = require("./AliChainEntity");
const AliChainAccountMapItemEntity = require("./AliChainAccountMapItemEntity");

class AliChainContractEntity extends AliChainEntity {

    /**
     *
     * @returns {string}    合约的标识 ID，16 进制表示的字符串
     */
    identity() {
        return this.get('identity')
    }

    /**
     *
     * @returns {BigNumber} 余额
     */
    balance() {
        return this.get('balance')
    }

    /**
     *
     * @returns {AliChainAccountMapItemEntity[]} 账户或者合约的公钥和权重值
     */
    auth_map() {
        let x = this.get('auth_map')
        let y = []
        for (let i = 0; i < x.length; i++) {
            y.push(new AliChainAccountMapItemEntity(x[i]))
        }
        return y
    }

    /**
     *
     * @returns {string} 恢复公钥，用于帐户私钥丢失的情况，16 进制表示的字符串
     */
    recover_key() {
        return this.get('recover_key')
    }

    /**
     *
     * @returns {number} 上次成功恢复的时间
     */
    recover_time() {
        return this.get('recover_time')
    }

    /**
     *
     * @returns {number} 状态，0：NORMAL；1：FREEZE；2：RECOVERING
     */
    status() {
        return this.get('status')
    }

    /**
     *
     * @returns {string} 加密公钥，用来加密智能合约中的交易金额，16 进制表示的字符串
     */
    encryption_key() {
        return this.get('encryption_key')
    }

    /**
     *
     * @returns {string} 世界状态的默克尔哈希根，16 进制表示的字符串
     */
    storage_root() {
        return this.get('storage_root')
    }

    /**
     *
     * @returns {string} 合约代码哈希，16 进制表示的字符串
     */
    code_hash() {
        return this.get('code_hash')
    }

    /**
     *
     * @returns {string} 合约代码，16 进制表示的字符串
     */
    code() {
        return this.get('code')
    }
}

module.exports=AliChainContractEntity