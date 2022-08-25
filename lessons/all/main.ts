window.addEventListener('DOMContentLoaded', () => {
    const recipe = document.querySelector('.recipe')
    if (recipe) {
        const shuffleButton: HTMLButtonElement = document.querySelector('.fun-zone button')!
        shuffleButton.addEventListener('click', shuffleList)
    } else {
        console.log('not list.html')
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
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
