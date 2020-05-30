class SlidingCheckboxComponent extends HTMLElement{
    constructor(){
        super()
        this.shadow = this.attachShadow({mode: 'closed'})
        this._checked = false
    }

    /** called when element is added to the DOM */
    connectedCallback(){
        const template = `
            <link rel='stylesheet' href='./css/components/sliding-checkbox.css'>
            <div class='sliding-checkbox'>
                <input class='internal-checkbox' type='checkbox' name=''>
            </div>
        `
        this.shadow.innerHTML = template

        this.internalCheckbox = this.shadow.querySelector('.internal-checkbox')
        this.internalCheckbox.checked = this._checked
        this.internalCheckbox.addEventListener('change', e => this.updateChecked())
    }

    set checked(checked){
        if(this._checked === checked) return
        this._checked = checked
        if(!!this.internalCheckbox) this.internalCheckbox.checked = checked
    }

    get checked(){
        return this._checked
    }

    updateChecked(){
        this.checked = this.internalCheckbox.checked
        this.dispatchEvent(new Event('change', {'checked': this._checked}))
    }
}

//registration requires the tag to contain a hyphen
window.customElements.define('sliding-checkbox', SlidingCheckboxComponent)