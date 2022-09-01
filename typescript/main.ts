window.addEventListener('DOMContentLoaded', () => {
    //insert message box

    const basketList = document.querySelector('.basket-list')
    if (!basketList) throw 'baskeList not found'

    const messageBox: HTMLDivElement = basketList.children[0] as HTMLDivElement

    const baskets: HTMLDivElement[] = Array.from(basketList.children).slice(1) as HTMLDivElement[]

    baskets.forEach(basket => basket.addEventListener('click', () => {
        messageBox.classList.remove('hide')
        const basketI = baskets.indexOf(basket)

        let i = 1
        baskets.forEach(basket => {
            if (basketI + 1 === i) {
                // place message box after clicked basket
                basket.style.setProperty('order', i.toString())
                i++
                messageBox.style.setProperty('order', i.toString())
            } else {
                basket.style.setProperty('order', i.toString())
            }
            i++
        })
    }))

    // toggle themes
    const themeButton: HTMLButtonElement = document.querySelector('footer > button') as HTMLButtonElement
    if (!themeButton) throw 'Theme button not found'
    themeButton.addEventListener('click', () => {
        const icon = themeButton.children[0]
        applyTheme(icon.classList.contains('fa-moon')? 'dark': 'light')
        icon.classList.toggle('fa-moon')
        icon.classList.toggle('fa-sun')
    })

    // register shortcuts
    window.addEventListener('keydown', event => {
        switch (event.key) {
            case 'Escape': messageBox.classList.add('hide')
                break;
            default:
                console.log(event.key)
        }
    })
})

function applyTheme(themeName: 'dark' | 'light'): void {
    const themes = {
        dark: {
            background1: '#181F25',
            background2: '#202931',
            color1: '#DAE6FC',
            color2: '#7BA5F4',
            accent1: '#418E3E',
            accent2: '#83C77F',
            shadow1: 'rgba(218,230,252,0.3)',
            shadow2: 'rgba(65,142,62, 1)',
        },
        light: {
            background1: '#F3F5F7',
            background2: '#E7EBEF',
            color1: '#061A40',
            color2: '#114DBB',
            accent1: '#ACDAAA',
            accent2: '#58B455',
            shadow1: 'rgba(6, 26, 64, 0.3)',
            shadow2: 'rgba(172, 218, 170, 1)',
        }
    }

    const html = document.querySelector('html')!
    for (const tkey in themes[themeName]) {
        // @ts-ignore
        html.style.setProperty(`--${tkey}`, themes[themeName][tkey])
    }
}
