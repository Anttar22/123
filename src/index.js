/*
    Функционал
        селектора по частям речи (сущ, гл, прил, местоим, предлоги и тд.)
        какой язык учавствует (русский, англиский, оба)

*/

import './style/main.scss'
import { Select } from './components/select/select'
import './components/header/header'
import { Modal } from './components/modal/modal'
// import './components/header/hamburgers-master/_sass/hamburgers/'


const select = new Select('#select', {
    placeholder: 'Ваш выбор',
    dataList: [
        {'id': 1, value: 'Value-1'},
        {'id': 2, value: 'Value-2'},
        {'id': 3, value: 'Value-3'},
        {'id': 4, value: 'Value-4'},
        {'id': 5, value: 'Value-5'},
        {'id': 6, value: 'Value-6'},
    ],
    currentValue: 4,
})

window.s = select


const modal = new Modal('#modal', {
    title: 'Заготовок Toni',
    closeing: true,
    width: 200,
    buttons: [
        {value: 'Ок', class: 'primary', handler() {
            console.log('clicked OK')
            m.close()
        }},
        {value: 'Отмена', class: 'secondary', handler() {
            console.log('clicked CANCEL')
            m.close()
        }},
    ]
})

window.m = modal
// document.querySelector('.burger').addEventListener('click', function() {
//     m.open()
// })