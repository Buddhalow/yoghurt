import App from '../../../src/apps'
import Label from '../../../src/controls/Label'
import Button from '../../../src/controls/Button'
import TextBox from '../../../src/controls/TextBox';

export default class DemoApp extends App {
    constructor(parent, id) {
        super(parent, id)
        this.text = 'Welcome to Yoghurt!'
    }
    load() {
        super.load()
        this.left = 200
        this.top = 200
        
        this.content.controls['start'] = new Label(this.content, 'label')
        this.content.controls['start'].text = 'Welcome to Yoghurt OS Demo!'
        this.content.controls['start'].width = 320
        this.content.controls['start'].width = 120
        this.content.controls['start'].x = 12
        this.content.controls['start'].y = 52  
        this.content.controls['ok'] = new Button(this.content, 'ok')
        this.content.controls['ok'].top= 220
        this.content.controls['ok'].left = 82
        this.content.controls['ok'].width = 122
        this.content.controls['ok'].height = 28
        this.content.controls['ok'].text = 'OK'
        this.content.backgroundColor = 'white'
        this.content.controls['ok'].on('click', (e) => {
            this.close()
        })

        this.content.controls['textbox'] = new TextBox(this, 'textbox')
        this.content.controls['textbox'].width = 100
        this.content.controls['textbox'].height = 38
        this.content.controls['textbox'].left = 28
        this.content.controls['textbox'].top =  28
        this.content.controls['textbox'].text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut interdum quam.'
        this.content.controls['textbox'].show()
        this.x = 222
        this.y = 111
        this.width = 321  
        this.height = 321
    }
}