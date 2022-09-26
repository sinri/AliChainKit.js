class AliChainDataReader {
    constructor(data) {
        this._data=data
    }

    raw(){
        return this._data
    }

    total(){
        return this._data.length
    }

    /**
     *
     * @param {int[]} indices
     * @returns {null|Buffer|Array}
     */
    get_raw(indices){
        if(indices.length<=0){
            //throw new Error('indices nested empty')
            return null
        }
        const x=this._data[indices[0]]
        if(indices.length===1){
            if(Buffer.isBuffer(x)) {
                return x
            }
            if(Array.isArray(x)){
                return x;
            }
            //throw new Error('not buffer')
            return null
        }
        if(Array.isArray(x)) {
            return new AliChainDataReader(x).get_raw(indices.slice(1))
        }
        return null
    }

    /**
     *
     * @returns {string|null}
     * @param indices
     */
    get(indices){
        const buffer=this.get_raw(indices)
        if(buffer===null)return null
        if(Array.isArray(buffer)){
            return 'Array'
        }
        if(buffer.length===0){
            return '';
        }
        return '0x'+buffer.toString('hex')
    }
}

module.exports=AliChainDataReader