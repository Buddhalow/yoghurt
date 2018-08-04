import { EventEmitter } from "events";

/**
 * A service is a background worker that can intercept with the Yoghurt operating system and will
 * also be shown in the 
 */
export default class Service extends EventEmitter {
    constructor(yoghurt, id, iconUrl, text=null) {
        super()
        this.id = id
        this.yoghurt = yoghurt
        this.icon = new Image()
        this.icon.src = iconUrl
        this.text = text
        this.isActive = false
    }
    get isActive() {
        return this._isActive
    }
    set isActive(value) {
        this._isActive = value
        this.emit(value ? 'started' : 'stopped', this)
    }
    /**
     * Calls when the service starts
     */
    start() {
        this.isActive = true
    }

    /**
     * Calls to stop the service
     */
    stop() {
        this.isActive = false
    }
}