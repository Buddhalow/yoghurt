import Window from '../controls/Window'


/**
 * Application
 */
export default class App extends Window {
    constructor(parent, id, type='mdi', DocumentType, ViewType) {
        super(parent, id)
        this.view = null
        this.views = []
        this.type = type
        if (DocumentType) {
            this.DocumentType = DocumentType
            this.ViewType = ViewType
            this.menus = {
                file: {
                    id: 'file',
                    items: {
                        new: {
                            id: 'new'
                        },
                        open: {
                            id: 'open'
                        },
                        save: {
                            id: 'save'
                        },
                        print: {
                            id: 'print'
                        },
                        exit: {
                            id: 'exit'
                        }
                    }
                },
                edit: {
                    id: 'edit',
                    items: {
                        undo: {
                            id: 'undo'
                        },
                        redo: {
                            id: 'redo'
                        },
                        sep: {
                            id: '-'
                        }
                    }
                },
                window: {
                    id: 'window',
                    items: {

                    }
                },
                help: {
                    id: 'help',
                    items: {

                    }
                }
            }
            this.toolbars = {
                file: {
                    id: 'file',
                    items: {
                        new: {
                            id: 'new'
                        },
                        open: {
                            id: 'open'
                        },
                        save: {
                            id: 'save'
                        },
                        print: {
                            id: 'print'
                        },
                        exit: {
                            id: 'exit'
                        },
                        undo: {
                            id: 'undo'
                        },
                        redo: {
                            id: 'redo'
                        },
                        sep1: {
                            id: 'sep1'
                        }
                        
                    }
                }
            }    
            this.on('action', (actionId) => this.action(actionId))
            this.newDocument()     
        }   
    }
    newDocument() {
        let docId  = this.constructor.name.toLowerCase() + '.doc.' + this.views.length
        switch (this.type) {
            case 'sdi': {
                if (this.view != null) {
                    let newApp = new App(this.parent, docId) // TODO Fix prototype
                    this.parent.controls[docId] = newApp
                    return
                }
                this.controls['content'] = new ViewType(this, 'content', new DocumentType())
                this.view = this.controls['content']
                break;
            }
            case 'mdi': {
                let docId  ='doc-' + this.views.length
                let view = new ViewType(this, docId, new DocumentType())
                this.views.push(view)
                this.content.controls[docId] = view
                view.text = 'Document ' + this.views.length
                break
            }
            default:
                throw "Invalid application type"
        }
    }
    action(actionId) {
        switch (actionId) {
            case 'new': {
                this.newDocument()
                
                break;
            }
            case 'exit':
                return this.close()
        }
        if (this.view) {
            this.view.action(actionId)
        }
    }
}