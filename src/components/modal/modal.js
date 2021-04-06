import './modal.scss'

Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
};

function noop() {}

const getTemplateBtn = (buttons = []) => {
    if(buttons.length === 0) {
        return document.createElement('div')
    }

    const footer = document.createElement('div')
    footer.classList.add('modal__window-footer')


    buttons.forEach(button => {
        const $btn = document.createElement('button')
        $btn.classList.add('button')
        $btn.classList.add(`button--${button.class || 'secondary'}`)
        $btn.textContent = button.value
        $btn.onclick = button.handler || noop

        footer.appendChild($btn)
    })

    return footer
}

const getTemplateModal = (options) => {
    const template = document.createElement('div')
    template.classList.add("modal__overlay")
    template.setAttribute('data-type', 'close')

    template.insertAdjacentHTML('afterbegin', `
        <div class="modal__window">
            <div class="modal__window-header">
                <h2 class="modal__window-title">${options.title || 'Окно'}</h2>
                ${options.closeing ? '<span class="modal__window-close" data-type="close"></span>' : ''}
                
            </div>
            <div class="modal__window-body" data-type="content">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
            </div>
        </div>
    `)

    const footer = getTemplateBtn(options.buttons)
    footer.appendAfter(template.querySelector('[data-type="content"]'))

    return template
}

export class Modal {
    constructor(selector, options) {
        this.$elem = document.querySelector(selector)
        this.options = options

        this.#render()
        this.#setup()
    }

    #render() {
        const { title, closeing, buttons} = this.options
        this.$elem.classList.add('modal')

        this.$elem.insertAdjacentElement('afterbegin', getTemplateModal(this.options))

    }
    #setup() {
        this.clickHendler = this.clickHendler.bind(this)

        this.$elem.addEventListener('click', this.clickHendler)
    }

    clickHendler(event) {
        const {type} = event.target.dataset

        if( type === 'close') {
            this.close()
        }
    }

    setContent(html) {
        this.$elem.querySelector('[data-type="content"]').innerHTML = html
    }

    open() {
        this.$elem.classList.add('open')
    }
    close() {
        this.$elem.classList.remove('open')
    }
    destroy() {
        this.$elem.remove()
        this.$elem.removeEventListener('click', this.clickHendler)
    }
}