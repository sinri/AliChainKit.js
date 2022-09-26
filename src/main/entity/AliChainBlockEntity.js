const AliChainEntity = require("./AliChainEntity");
const AliChainBlockHeaderEntity = require("./AliChainBlockHeaderEntity");
const AliChainBlockBodyEntity = require("./AliChainBlockBodyEntity");

class AliChainBlockEntity extends AliChainEntity{
    block_header(){
        return new AliChainBlockHeaderEntity(this.get('block_header'))
    }
    block_body(){
        return new AliChainBlockBodyEntity(this.get('block_body'))
    }
}

module.exports=AliChainBlockEntity