import Control from './Control'

export default class Desktop extends Control {
    constructor(parent) {
        super(parent)
    }
    load() {
        this.on('load')
        
    }
}