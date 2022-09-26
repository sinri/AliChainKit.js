const AliChainEntity=require('./AliChainEntity')
const AliChainAccountMapItemEntity = require("./AliChainAccountMapItemEntity");

class AliChainAccountEntity extends AliChainEntity {
    /**
     *
     * @returns string    账户的标识 ID，16 进制表示的字符串
     */
    identity() {
        return this.get('identity')
    }

    /**
     *
     * @returns BigNumber，特别类型，参考 详情    余额
     */
    balance() {
        return this.get('balance')
    }

    /**
     *
     * @returns string    恢复公钥，用于帐户私钥丢失的情况，16 进制表示的字符串
     */
    recover_key() {
        return this.get('recover_key')
    }

    /**
     *
     * @returns number    上次成功恢复的时间
     */
    recover_time() {
        return this.get('recover_time')
    }

    /**
     *
     * @returns number    状态，0：NORMAL；1：FREEZE；2：RECOVERING
     */
    status() {
        return this.get('status')
    }

    code() {
        return this.get('code')
    }

    storage_root() {
        return this.get('storage_root')
    }

    code_hash() {
        return this.get('code_hash')
    }

    /**
     *
     * @returns string    加密公钥，用来加密智能合约中的交易金额，16 进制表示的字符串
     */
    encryption_key() {
        return this.get('encryption_key')
    }

    acc_version() {
        return this.get('acc_version')
    }

    auth_map() {
        let x = this.get('auth_map')
        let y = []
        for (let i = 0; i < x.length; i++) {
            y.push(new AliChainAccountMapItemEntity(x[i]))
        }
        return y
    }

    /*
    identity: '0x2aedf0556caf91bfafc0f316ffd8b603f6e5bc72a3fb66788305f839a25eee4b',
    balance: 0,
    recover_key: '0x0457173e6fc33289ec3bc2efe06cda6ffdb2422685979f957ae583f35ff545486d0becd8b9c0824964923eccc237c1c48c94fa799c9812d7c228cd81850c10f2',
    recover_time: 0,
    status: 0,
    code: '',
    storage_root: '0x0000000000000000000000000000000000000000000000000000000000000000',
    code_hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    encryption_key: '',
    acc_version: 2,
    auth_map: [ [Object] ]

     */
}

module.exports=AliChainAccountEntity