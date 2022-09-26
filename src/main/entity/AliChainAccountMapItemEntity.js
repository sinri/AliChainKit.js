const AliChainEntity = require("./AliChainEntity");

class AliChainAccountMapItemEntity extends AliChainEntity {
    auth_key() {
        return this.get('auth_key')
    }

    auth_weight() {
        return this.get('auth_weight')
    }
}

module.exports=AliChainAccountMapItemEntity