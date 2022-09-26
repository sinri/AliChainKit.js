class AliChainEntity {
    constructor(object) {
        this._object = object
    }

    get(key) {
        return this._object[key]
    }
}

module.exports=AliChainEntity