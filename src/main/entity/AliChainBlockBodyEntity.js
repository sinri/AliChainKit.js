const AliChainEntity = require("./AliChainEntity");
const AliChainDataReader = require("./AliChainDataReader");

class AliChainBlockBodyEntity extends AliChainEntity {
    /**
     * @returns {AliChainDataReader[]} 交易列表
     */
    transaction_list() {
        const x = this.get('transaction_list')
        let list = []
        for (let i = 0; i < x.length; i++) {
            list.push(new AliChainDataReader(x[i]))
        }
        return list
    }

    /**
     * @returns {AliChainDataReader[]} 收据列表
     */
    receipt_list() {
        const x = this.get('receipt_list')
        let list = []
        for (let i = 0; i < x.length; i++) {
            list.push(new AliChainDataReader(x[i]))
        }
        return list
    }

    /**
     * @returns {string} 共识证明
     */
    consensus_proof() {
        return this.get('consensus_proof')
    }

}

module.exports = AliChainBlockBodyEntity