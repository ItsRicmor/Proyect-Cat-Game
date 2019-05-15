const TAM = 3
export default class Cat{
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
                this.winner = winnerPlay()
                computerTurn()
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
        return this.isFulltable() || this.winnerPlay !== -1
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
                    aux = min()
                    if (aux > v) v = aux;
                    this.table[i][j] = -1;

                }
            }
        }
        return v;
    }

    min = () => {
        if (this.endPlay()) {
            if (this.winner() != -1) return 1;
            else return 0;
        }
        let v = Number.MAX_VALUE;
        let aux;
        for (let i = 0; i < TAM; i++) {
            for (let j = 0; j < TAM; j++) {
                if (this.table[i][j] == -1) {
                    this.table[i][j] = 0;
                    aux = max();
                    if (aux < v) v = aux;
                    this.table[i][j] = -1;
                }
            }
        }
        return v;
    }
}