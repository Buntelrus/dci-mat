window.addEventListener('DOMContentLoaded', () => {
    console.log('hello world!')

    /**
     * Was sind die verschiedenen Datentypen in JavaScript?
     */
    // number(bigint, NaN), string, Symbol, Object(Array), NULL, Boolean, undefined

    /**
     * Was ist der Unterschied zwischen " == " und " === "?
     */
    // equal vs strict equal -> bei == werden typen konvertiert bei === nicht. Also 0 == false, aber 0 !== false (beides ergibt true)

    /**
     * Deklariere eine Variable namens userName und weise ihr einen Namen als Wert zu.
     */
    const userName = new class  {
        firstname = 'julian'
        surename = 'bantel'

        toString() {
            return `${this.firstname[0].toUpperCase() + this.firstname.slice(1)} ${this.surename[0].toUpperCase() + this.surename.slice(1)}`
        }
    }
    console.log(`${userName}`)

    /**
     * Weise das aktuelle Jahr einer Variablen namens currentYear zu.
     */
    const currentYear: number = new Date().getFullYear()
    console.log(currentYear)

    /**
     * Weise dein Geburtsjahr einer Variablen namens birthYear zu.
     */
    const birthYear: number = 1996
    console.log(birthYear)

    /**
     * Deklariere eine Variable namens age und berechne dein Alter mit Hilfe der Variablen currentYear und birthYear.
     */
    const age: number = currentYear - birthYear
    console.log(age)

    /**
     * Logge in die Konsole: "userName ist age Jahre alt"
     */
    console.log(`${userName} ist ${age} Jahre alt!`)
})
