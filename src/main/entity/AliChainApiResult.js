const AliChainEntity=require('./AliChainEntity')

class AliChainApiResult extends AliChainEntity {


    msg_type() {
        return this._object.msg_type
    }

    sequence() {
        return this._object.sequence
    }

    return_code() {
        return this._object.return_code
    }

    group_id() {
        return this._object.group_id
    }

    api() {
        return this._object.api
    }

}

module.exports=AliChainApiResult