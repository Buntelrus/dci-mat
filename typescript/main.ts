const map = loadMap()

window.addEventListener('DOMContentLoaded', async () => {
    await map.then(html => {
        const contentWrapper = document.createElement('div')
        contentWrapper.classList.add('content')
        contentWrapper.innerHTML = html

        const navigateBackButton = contentWrapper.querySelector<HTMLButtonElement>('main > button')
        if (!navigateBackButton) throw 'navigate back button not found'
        navigateBackButton.addEventListener('click', () => {
            navigate()
        })

        //insert before last child (footer)
        document.body.insertBefore(contentWrapper, document.body.children[document.body.children.length - 1])
        navigate()
    })

    const openMapView = document.getElementById('open-map-view')
    if (!openMapView) throw 'open map view button not found'
    openMapView.addEventListener('click', () => {
        navigate()
    })

    //insert message box

    const basketLists: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>('.basket-list')
    if (!basketLists[0]) throw 'baskeList not found'
    if (!basketLists[1]) throw 'baskeList.small not found'

    const messageBox: HTMLDivElement = basketLists[0].children[0] as HTMLDivElement
    const messageBoxSmall: HTMLDivElement = basketLists[1].children[0] as HTMLDivElement

    const baskets: HTMLDivElement[] = Array.from(basketLists[0].children).slice(1) as HTMLDivElement[]
    const basketsSmall: HTMLDivElement[] = Array.from(basketLists[1].children).slice(1) as HTMLDivElement[]


    function appendBasketWithMsgBox(basket: HTMLDivElement) {
        messageBoxSmall.classList.remove('hide')
        messageBoxSmall.classList.add('expand')
        const basketI = basketsSmall.indexOf(basket)
        let i = 1
        basketsSmall.forEach(basket => {
            if (basketI + 1 === i) {
                // place message box after clicked basket
                basket.style.setProperty('order', i.toString())
                i++
                messageBoxSmall.style.setProperty('order', i.toString())
            } else {
                basket.style.setProperty('order', i.toString())
            }
            i++
        })
    }

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

    basketsSmall.forEach(basket => {
        const messageButton = basket.querySelector<HTMLButtonElement>('button.msg')
        if (!messageButton) throw 'msg button not found'
        messageButton.addEventListener('click', event => {
            event.stopPropagation()
            appendBasketWithMsgBox(basket)
        })
        basket.addEventListener('click', () => {
            const expanded = document.querySelector('article.expand')
            // 1. expand && self    -> collapse             box->collapse()
            // 2. expand && !self   -> expand->collapse()   box->collapse() due to transition
            //                      -> self->expand()       if (shown) box->expand(), boxAppend()
            // 3. !expand           -> self->expand()       if (shown) box->expand(), boxAppend()
            if (expanded && expanded === basket) {
                basket.classList.remove('expand')
                messageBoxSmall.classList.remove('expand')
            } else if (expanded && expanded !== basket) {
                expanded.classList.remove('expand')
                messageBoxSmall.classList.remove('expand') //remove always due to transition
                //make this asynchronous to give the browser time that it can render class purging
                setTimeout(() => {
                    basket.classList.add('expand')
                    if (!messageBoxSmall.classList.contains('hide')) appendBasketWithMsgBox(basket)
                }, 0)
            } else {
                basket.classList.add('expand')
                if (!messageBoxSmall.classList.contains('hide')) appendBasketWithMsgBox(basket)
            }
        })
    })

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
            case 'Escape':
                messageBox.classList.add('hide')
                messageBoxSmall.classList.add('hide')
                break;
            default:
                // console.log(event.key)
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

async function loadMap() {
    return fetch('map.html').then(response => response.text())
}

function navigate() {
    document.body.classList.toggle('focus-second-content')
}
