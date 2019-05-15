const X = 1
const Y = 2

const intialTurn = X
let turn = intialTurn
console.log(turn)
const changeTurn = () => {
    turn = turn == X ? Y : X
}

const TAM = 3
class Cat {
    constructor(turn) {
        this.table = [[], [], []]
        this.user = turn
        this.computer = turn == 1 ? 2 : 1
        this.winner = -1
        this.beginPlay()
    }

    beginPlay = () => {
        for (let i = 0; i < TAM; i++) {
            for (let j = 0; j < TAM; j++) {
                this.table[i][j] = -1
            }
        }
    }

    winnerPlay = () => {
        if (this.table[0][0] !== -1 && this.table[0][0] === this.table[1][1] && this.table[0][0] === this.table[2][2]) {
            return this.table[0][0]
        }
        if (this.table[0][2] !== -1 && this.table[0][2] === this.table[1][1] && this.table[0][2] === this.table[2][0]) {
            return this.table[0][2]
        }
        for (let i = 0; i < TAM; i++) {
            if (this.table[i][0] !== -1 && this.table[i][0] === this.table[i][1]
                && this.table[i][0] === this.table[i][2]) {
                return this.table[i][0]
            }
            if (this.table[0][i] !== -1 && this.table[0][i] === this.table[1][i]
                && this.table[0][i] === this.table[2][i]) {
                return this.table[0][i]
            }
        }
        return -1
    }
    pushBottom = (i, j) => {
        if (i >= 0 && j >= 0 && i < TAM && j < TAM && this.table[i][j] == -1) {
            if (this.winner == -1) {
                this.table[i][j] = this.user
                this.winner = this.winnerPlay()
                this.computerTurn()
            }
        }
    }

    getTable = () => this.table
    //Algoritmo minimax
    isFulltable = () => {
        for (let i = 0; i < TAM; i++)
            for (let j = 0; j < TAM; j++)
                if (this.table[i][j] == -1)
                    return false;
        return true;
    }

    endPlay = () => {
        return this.isFulltable() || this.winnerPlay() !== -1
    }

    computerTurn = () => {
        if (!this.endPlay()) {
            let f = 0, c = 0;
            let v = Number.MIN_VALUE
            let aux;
            for (let i = 0; i < TAM; i++) {
                for (let j = 0; j < TAM; j++) {
                    if (this.table[i][j] == -1) {
                        this.table[i][j] = 1;
                        aux = this.min()
                        if (aux > v) {
                            v = aux;
                            f = i;
                            c = j;
                        }
                        this.table[i][j] = -1;
                    }
                }
            }
            this.table[f][c] = this.computer;
        }
        this.winner = this.winnerPlay()
        printTable(this.table)
    }
    max = () => {
        if (this.endPlay()) {
            if (this.winnerPlay() != -1) return -1;
            else return 0;
        }
        let v = Number.MIN_VALUE;
        let aux;
        for (let i = 0; i < TAM; i++) {
            for (let j = 0; j < TAM; j++) {
                if (this.table[i][j] == -1) {
                    this.table[i][j] = 1;
                    aux = this.min()
                    if (aux > v) v = aux;
                    this.table[i][j] = -1;

                }
            }
        }
        return v;
    }

    min = () => {
        if (this.endPlay()) {
            if (this.winnerPlay() != -1) return 1;
            else return 0;
        }
        let v = Number.MAX_VALUE;
        let aux;
        for (let i = 0; i < TAM; i++) {
            for (let j = 0; j < TAM; j++) {
                if (this.table[i][j] == -1) {
                    this.table[i][j] = 0;
                    aux = this.max()
                    if (aux < v) v = aux;
                    this.table[i][j] = -1;
                }
            }
        }
        return v;
    }
}

const cat = new Cat(turn);
cat.beginPlay()
const push = (i, j) => {
    cat.pushBottom(i, j, {printTable})
    if(cat.winnerPlay() !== -1 && cat.endPlay()){
        alert(cat.winnerPlay())
    }
}

const printTable = (table) => {
    const container = document.getElementById("container-cat")
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
     }
    for (let i = 0; i < TAM; i++) {
        for (let j = 0; j < TAM; j++) {
            const div = document.createElement("div")
            const data = table[i][j]
            div.className = `box waves-effect waves-light btn ${data !== -1 ? data == X ? 'img-x' : 'img-o' : '' }`
            div.onclick = function(){cat.pushBottom(i, j)}
            container.appendChild(div)
        }
    }
}
printTable(cat.getTable())
