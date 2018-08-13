import Control from './Control'


export default class DesktopIcon extends Control {
	constructor(parent, id) {
		super(parent, id)
		this.width = 96;
		this.height = 120;
		this.isSelected = false
	}
	render(gc) {
		
	}
}