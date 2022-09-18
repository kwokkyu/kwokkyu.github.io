class TicTacToe {
    #gameEnded: boolean = false;
    #gameBoard: string[] = ["", "", "", "", "", "", "", "", ""];
    #turn: string = "X";
    constructor() {
        this.changeToken = this.changeToken.bind(this);
        this.processTurn = this.processTurn.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    changeToken(): void {
        if (!this.#gameBoard.includes("X") && !this.#gameBoard.includes("O")) {
            this.updateTurn();
        }
    }

    updateTurn(): void {
        this.#turn = (this.#turn === "X") ? "O" : "X";
        document.getElementById("token")!.innerHTML = this.#turn;
    }

    declareTiedGame(): void {
        document.getElementById("status-text")!.innerHTML = "Tie";
        document.getElementById("token")!.innerHTML = "";
        this.#gameEnded = true;
    }

    isGameTied(): boolean {
        if (this.#gameBoard.includes("")) {
            return false;
        }
        return true;
    }

    declareWinner(): void {
        document.getElementById("status-text")!.innerHTML = "Won: ";
        document.getElementById("token")!.innerHTML = this.#turn;
        this.#gameEnded = true;
    }

    highlightCells(cells: number[]): void {
        for (let cell of cells) {
            document.querySelectorAll(".cell").forEach((element: Element): void => {
                if (Number(element.getAttribute("index")) === cell) {
                    const htmlElement: HTMLElement = element as HTMLElement;
                    htmlElement.style.backgroundColor = "lightgrey";
                }
            });
        }
    }

    hasWinner(index: number): boolean {
        switch (index) {
            case 0:
                if (this.#gameBoard[0] === this.#gameBoard[1] && this.#gameBoard[1] === this.#gameBoard[2]) {
                    this.highlightCells([0, 1, 2]);
                    return true;
                } else if (this.#gameBoard[0] === this.#gameBoard[3] && this.#gameBoard[3] === this.#gameBoard[6]) {
                    this.highlightCells([0, 3, 6]);
                    return true;
                } else if (this.#gameBoard[0] === this.#gameBoard[4] && this.#gameBoard[4] === this.#gameBoard[8]) {
                    this.highlightCells([0, 4, 8]);
                    return true;
                }
                break;
            case 1:
                if (this.#gameBoard[0] === this.#gameBoard[1] && this.#gameBoard[1] === this.#gameBoard[2]) {
                    this.highlightCells([0, 1, 2]);
                    return true;
                } else if (this.#gameBoard[1] === this.#gameBoard[4] && this.#gameBoard[4] === this.#gameBoard[7]) {
                    this.highlightCells([1, 4, 7]);
                    return true;
                }
                break;
            case 2:
                if (this.#gameBoard[0] === this.#gameBoard[1] && this.#gameBoard[1] === this.#gameBoard[2]) {
                    this.highlightCells([0, 1, 2]);
                    return true;
                } else if (this.#gameBoard[2] === this.#gameBoard[5] && this.#gameBoard[5] === this.#gameBoard[8]) {
                    this.highlightCells([2, 5, 8]);
                    return true;
                } else if (this.#gameBoard[2] === this.#gameBoard[4] && this.#gameBoard[4] === this.#gameBoard[6]) {
                    this.highlightCells([2, 4, 6]);
                    return true;
                }
                break;
            case 3:
                if (this.#gameBoard[0] === this.#gameBoard[3] && this.#gameBoard[3] === this.#gameBoard[6]) {
                    this.highlightCells([0, 3, 6]);
                    return true;
                } else if (this.#gameBoard[3] === this.#gameBoard[4] && this.#gameBoard[4] === this.#gameBoard[5]) {
                    this.highlightCells([3, 4, 5]);
                    return true;
                }
                break;
            case 4:
                if (this.#gameBoard[3] === this.#gameBoard[4] && this.#gameBoard[4] === this.#gameBoard[5]) {
                    this.highlightCells([3, 4, 5]);
                    return true;
                } else if (this.#gameBoard[1] === this.#gameBoard[4] && this.#gameBoard[4] === this.#gameBoard[7]) {
                    this.highlightCells([1, 4, 7]);
                    return true;
                } else if (this.#gameBoard[0] === this.#gameBoard[4] && this.#gameBoard[4] === this.#gameBoard[8]) {
                    this.highlightCells([0, 4, 8]);
                    return true;
                } else if (this.#gameBoard[2] === this.#gameBoard[4] && this.#gameBoard[4] === this.#gameBoard[6]) {
                    this.highlightCells([2, 4, 6]);
                    return true;
                }
                break;
            case 5:
                if (this.#gameBoard[2] === this.#gameBoard[5] && this.#gameBoard[5] === this.#gameBoard[8]) {
                    this.highlightCells([2, 5, 8]);
                    return true;
                } else if (this.#gameBoard[3] === this.#gameBoard[4] && this.#gameBoard[4] === this.#gameBoard[5]) {
                    this.highlightCells([3, 4, 5]);
                    return true;
                }
                break;
            case 6:
                if (this.#gameBoard[0] === this.#gameBoard[3] && this.#gameBoard[3] === this.#gameBoard[6]) {
                    this.highlightCells([0, 3, 6]);
                    return true;
                } else if (this.#gameBoard[6] === this.#gameBoard[7] && this.#gameBoard[7] === this.#gameBoard[8]) {
                    this.highlightCells([6, 7, 8]);
                    return true;
                } else if (this.#gameBoard[2] === this.#gameBoard[4] && this.#gameBoard[4] === this.#gameBoard[6]) {
                    this.highlightCells([2, 4, 6]);
                    return true;
                }
                break;
            case 7:
                if (this.#gameBoard[6] === this.#gameBoard[7] && this.#gameBoard[7] === this.#gameBoard[8]) {
                    this.highlightCells([6, 7, 8]);
                    return true;
                } else if (this.#gameBoard[1] === this.#gameBoard[4] && this.#gameBoard[4] === this.#gameBoard[7]) {
                    this.highlightCells([1, 4, 7]);
                    return true;
                }
                break;
            case 8:
                if (this.#gameBoard[6] === this.#gameBoard[7] && this.#gameBoard[7] === this.#gameBoard[8]) {
                    this.highlightCells([6, 7, 8]);
                    return true;
                } else if (this.#gameBoard[2] === this.#gameBoard[5] && this.#gameBoard[5] === this.#gameBoard[8]) {
                    this.highlightCells([2, 5, 8]);
                    return true;
                } else if (this.#gameBoard[0] === this.#gameBoard[4] && this.#gameBoard[4] === this.#gameBoard[8]) {
                    this.highlightCells([0, 4, 8]);
                    return true;
                }
                break;
            default:
                break;
        }
        return false;
    }

    updateCellContent(id: string, index: number): void {
        if (this.#gameBoard[index] === "") {
            this.#gameBoard[index] = this.#turn;
            const htmlElement: HTMLElement | null = document.getElementById(id + "-content");
            if (htmlElement) {
                htmlElement.innerHTML = this.#turn;
            }
            if (this.hasWinner(index)) {
                this.declareWinner();
            } else if (this.isGameTied()) {
                this.declareTiedGame();
            } else {
                this.updateTurn();
            }
        } 
    }

    processTurn(event: Event): void {
        if (!this.#gameEnded) {
            const target: HTMLElement = event.target as HTMLElement;
            const id: string = target.id;
            const htmlElement: HTMLElement | null = document.getElementById(id);
            if (htmlElement) {
                const indexString: string | null = htmlElement.getAttribute("index");
                const index: number = Number(indexString);
                this.updateCellContent(id, index);
            }
        } 
    }

    resetGame(): void {
        this.#gameEnded = false;
        this.#gameBoard = ["", "", "", "", "", "", "", "", ""];
        this.#turn = "X";
        document.getElementById("status-text")!.innerHTML = "Turn: ";
        document.getElementById("token")!.innerHTML = "X";
        document.querySelectorAll(".cell").forEach((element: Element): void => {
            const htmlElement: HTMLElement = element as HTMLElement;
            htmlElement.style.backgroundColor = "white";
        });
        document.querySelectorAll(".cell-content").forEach((element: Element): void => {
            element.innerHTML = "";
        });
    }

    run(): void {
        document.getElementById("token")!.addEventListener("click", this.changeToken);
        document.querySelectorAll(".cell").forEach((element: Element): void => {
            element.addEventListener("click", this.processTurn);
        });
        document.getElementById("reset-button")!.addEventListener("click", this.resetGame);
    }
}

const tictactoe: TicTacToe = new TicTacToe();
tictactoe.run();