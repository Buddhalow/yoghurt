import Window from '../controls/Window'

export default class View extends Window {
    constructor(parent, id, document) {
        super(parent, id)
        this.document = document
    }
    action(actionId) {
        
    }
}