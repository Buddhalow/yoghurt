import Window from '../controls/Window'
import AboutWindow from './about'
import Control from '../controls';

export * from './document'
export * from './view'

/**
 * The Application class is a subclass of the {Window} class that will provide an starter kit for application windows.  
 * @extends {Window}
 */
export default class App extends Window {
    /**
     * 
     * @param {Control} parent The parent control
     * @param {String} id 
     * @param {String} type 
     * @param {*} DocumentType 
     * @param {*} ViewType 
     */
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
                    items: [
                        {
                            id: 'new'
                        },
                        {
                            id: 'open'
                        },
                        {
                            id: 'save'
                        },
                        {
                            id: 'print'
                        },
                        {
                            id: 'exit'
                        }
                    ]
                },
                edit: {
                    id: 'edit',
                    items: [
                        {
                            id: 'undo'
                        },
                        {
                            id: 'redo'
                        },
                        {
                            id: '-'
                        }
                    ]
                },
                window: {
                    id: 'window',
                    items: []
                },
                help: {
                    id: 'help',
                    items: []
                }
            }
            this.toolbars = {
                file: {
                    id: 'file',
                    items: [
                        {
                            id: 'new'
                        },
                        {
                            id: 'open'
                        },
                        {
                            id: 'save'
                        },
                        {
                            id: 'print'
                        },
                        {
                            id: 'exit'
                        }
                    ]
                }
            }    
            this.on('action', (actionId) => this.action(actionId))
            this.newDocument()     
        } else {
            this.menus = {
                file: {
                    id: 'file',
                    items: [
                        {
                            id: 'new'
                        },
                        {
                            id: 'open'
                        },
                        {
                            id: 'save'
                        },
                        {
                            id: 'print'
                        },
                        {
                            id: 'exit'
                        }
                    ]
                },
                help: {
                    id: 'help',
                    items: [
                        {
                            id: 'about',
                            command: (e) => {
                                let aboutwindow = new AboutWindow(this.desktop, 'about').show()
                                this.desktop.controls[aboutWindow.id] = aboutWindow
                                debugger
                            }
                        }
                    ]
                }
            }
            console.log(this.menus)
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