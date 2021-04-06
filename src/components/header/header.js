import './header.scss'

const header = function () {
    const header = document.querySelector('#header')
    header.classList.add('header')
    //  <button class="burger">
    //         <span class="burger__inner">
    //             <span class="burger__line"></span>
    //         </span>
    //     </button>
    header.insertAdjacentHTML('afterbegin', `

    <button class="hamburger hamburger--spin" type="button"
            aria-label="Menu" aria-controls="navigation">
        <span class="hamburger-box">
        <span class="hamburger-inner"></span>
        </span>
    </button>


        <div class="header__bars">
            <div class="header__bars-icon"><span>i</span></div>
            <div class="header__bars-icon"><span>i</span></div>
            <div class="header__bars-icon"><span>i</span></div>
        </div>
    `)
}
header()
const burger = document.querySelector('.hamburger')

burger.addEventListener('click', function() {
    this.classList.toggle('is-active')
})

