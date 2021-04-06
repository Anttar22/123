import './select.scss'

const createBackDrop = () => {
    const backDrop = document.createElement('div')
    backDrop.classList.add('select__backdrop')
    backDrop.setAttribute('data-type', 'backdrop')

    return backDrop
}

const getTemplateSelect = (dataList, placeholder, currentID) => {

    let currentValue = ''
    
    const items = dataList.map(item => {
       let cls = '' 
        if(item.id === currentID) {
            currentValue = item.value
            cls = 'selected'
        }
        
        return `
            <li class="select__dropdown-item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>
        `
    })
     
    return `
        <div class="select__input" data-type="input">
            <div class="select__input-title" data-type="value">${currentValue || placeholder || 'Выбор'}</div>
        </div>

        <div class="select__dropdown">
            <ul class="select__dropdown-list">${items.join('')}</ul>
        </div>
    `
}

export class Select {
    constructor(selector, options) {
        this.$elem = document.querySelector(selector)
        this.options = options
        this.currentID = this.options.currentValue

        this.#render()
        this.#setup()

    }
    #render() {
        const { dataList, placeholder } = this.options

        this.$elem.classList.add('select')
        this.$elem.innerHTML = getTemplateSelect(dataList, placeholder, this.currentID)
    }

    #setup() {
        this.clickHandler = this.clickHandler.bind(this)
        this.$elem.addEventListener('click', this.clickHandler)

        this.$value = this.$elem.querySelector('[data-type="value"]')
    }

    clickHandler(event) {
        const { type } = event.target.dataset

        if (type === 'input') {
            this.toggle()

        } else if (type === 'item') {
            const id = event.target.dataset.id
            this.select(id)

        } else if (type === 'backdrop') {
            this.close()
        }
    }

    select(id) {
        this.currentID = id
        this.$value.innerHTML = this.current.value

        this.$elem.querySelectorAll(`[data-type="item"]`).forEach(item => {
            item.classList.remove('selected')
        });
        this.$elem.querySelector(`[data-id="${id}"]`).classList.add('selected')

        this.close()
    }

    get current() {
        return this.options.dataList.find(item => item.id === +this.currentID )
    }

    get isOpen() {
        return this.$elem.classList.contains('open')
    }



    toggle() {
        this.isOpen ? this.close() : this.open()
    }

    open() {
        this.$elem.classList.add('open')

        this.$elem.appendChild(createBackDrop())
    }
    close() {
        this.$elem.classList.remove('open')

        this.$elem.querySelector('.select__backdrop').remove()
    }
}