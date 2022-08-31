window.addEventListener('DOMContentLoaded', () => {
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

    window.addEventListener('keydown', event => {
        switch (event.key) {
            case 'Escape': messageBox.classList.add('hide')
                break;
            default:
                console.log(event.key)
        }
    })
})
