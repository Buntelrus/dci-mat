window.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.recipe')) {
        const shuffleButton: HTMLButtonElement = document.querySelector('.fun-zone button')!
        shuffleButton.addEventListener('click', shuffleList)
    } else if (document.querySelector('.forms')) {
        const form = document.getElementById('myform')!
        // show form results
        form.addEventListener('submit', event => {
            event.preventDefault()
            const formData = new FormData(event.target! as HTMLFormElement)
            const resultsList = document.getElementById('results')!
            resultsList.innerHTML = '' //clear old results
            formData.forEach((value, key) => {
                const li = document.createElement('li')
                li.innerText = `${key} => ${value}`
                resultsList.append(li)
            })
        })
    } else if (document.querySelector('.styles')) {
        const h1 = document.querySelector('h1')!
        const colors = ['#F5CCE8', '#EC9DED', '#C880B7', '#9F6BA0', '#4A2040']
        let i = 0
        setInterval(() => {
            h1.style.backgroundColor = colors[i]
            if (i + 1 < colors.length) {
                i++
            } else {
                i = 0
            }
        }, 2000)
    }
})

function shuffleList(event: MouseEvent): void {
    const list = document.querySelector('section ul')
    if (!list) throw 'List not found'
    const children = Array.from(list.children)
    shuffle(children)
    children.forEach(child => list.append(child))
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 * @see: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 */
function shuffle(a: any[]) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // swap values with index i & j in array
        [a[i], a[j]] = [a[j], a[i]]
    }
    return a
}
