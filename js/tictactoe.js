"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _TicTacToe_gameEnded, _TicTacToe_gameBoard, _TicTacToe_turn;
class TicTacToe {
    constructor() {
        _TicTacToe_gameEnded.set(this, false);
        _TicTacToe_gameBoard.set(this, ["", "", "", "", "", "", "", "", ""]);
        _TicTacToe_turn.set(this, "X");
        this.changeToken = this.changeToken.bind(this);
        this.processTurn = this.processTurn.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }
    changeToken() {
        if (!__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f").includes("X") && !__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f").includes("O")) {
            this.updateTurn();
        }
    }
    updateTurn() {
        __classPrivateFieldSet(this, _TicTacToe_turn, (__classPrivateFieldGet(this, _TicTacToe_turn, "f") === "X") ? "O" : "X", "f");
        document.getElementById("token").innerHTML = __classPrivateFieldGet(this, _TicTacToe_turn, "f");
    }
    declareTiedGame() {
        document.getElementById("status-text").innerHTML = "Tie";
        document.getElementById("token").innerHTML = "";
        __classPrivateFieldSet(this, _TicTacToe_gameEnded, true, "f");
    }
    isGameTied() {
        if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f").includes("")) {
            return false;
        }
        return true;
    }
    declareWinner() {
        document.getElementById("status-text").innerHTML = "Won: ";
        document.getElementById("token").innerHTML = __classPrivateFieldGet(this, _TicTacToe_turn, "f");
        __classPrivateFieldSet(this, _TicTacToe_gameEnded, true, "f");
    }
    highlightCells(cells) {
        for (let cell of cells) {
            document.querySelectorAll(".cell").forEach((element) => {
                if (Number(element.getAttribute("index")) === cell) {
                    const htmlElement = element;
                    htmlElement.style.backgroundColor = "lightgrey";
                }
            });
        }
    }
    hasWinner(index) {
        switch (index) {
            case 0:
                if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[0] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[1] && __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[1] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[2]) {
                    this.highlightCells([0, 1, 2]);
                    return true;
                }
                else if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[0] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[3] && __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[3] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[6]) {
                    this.highlightCells([0, 3, 6]);
                    return true;
                }
                else if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[0] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[4] && __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[4] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[8]) {
                    this.highlightCells([0, 4, 8]);
                    return true;
                }
                break;
            case 1:
                if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[0] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[1] && __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[1] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[2]) {
                    this.highlightCells([0, 1, 2]);
                    return true;
                }
                else if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[1] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[4] && __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[4] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[7]) {
                    this.highlightCells([1, 4, 7]);
                    return true;
                }
                break;
            case 2:
                if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[0] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[1] && __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[1] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[2]) {
                    this.highlightCells([0, 1, 2]);
                    return true;
                }
                else if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[2] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[5] && __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[5] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[8]) {
                    this.highlightCells([2, 5, 8]);
                    return true;
                }
                else if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[2] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[4] && __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[4] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[6]) {
                    this.highlightCells([2, 4, 6]);
                    return true;
                }
                break;
            case 3:
                if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[0] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[3] && __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[3] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[6]) {
                    this.highlightCells([0, 3, 6]);
                    return true;
                }
                else if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[3] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[4] && __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[4] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[5]) {
                    this.highlightCells([3, 4, 5]);
                    return true;
                }
                break;
            case 4:
                if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[3] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[4] && __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[4] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[5]) {
                    this.highlightCells([3, 4, 5]);
                    return true;
                }
                else if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[1] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[4] && __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[4] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[7]) {
                    this.highlightCells([1, 4, 7]);
                    return true;
                }
                else if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[0] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[4] && __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[4] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[8]) {
                    this.highlightCells([0, 4, 8]);
                    return true;
                }
                else if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[2] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[4] && __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[4] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[6]) {
                    this.highlightCells([2, 4, 6]);
                    return true;
                }
                break;
            case 5:
                if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[2] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[5] && __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[5] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[8]) {
                    this.highlightCells([2, 5, 8]);
                    return true;
                }
                else if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[3] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[4] && __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[4] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[5]) {
                    this.highlightCells([3, 4, 5]);
                    return true;
                }
                break;
            case 6:
                if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[0] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[3] && __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[3] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[6]) {
                    this.highlightCells([0, 3, 6]);
                    return true;
                }
                else if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[6] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[7] && __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[7] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[8]) {
                    this.highlightCells([6, 7, 8]);
                    return true;
                }
                else if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[2] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[4] && __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[4] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[6]) {
                    this.highlightCells([2, 4, 6]);
                    return true;
                }
                break;
            case 7:
                if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[6] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[7] && __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[7] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[8]) {
                    this.highlightCells([6, 7, 8]);
                    return true;
                }
                else if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[1] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[4] && __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[4] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[7]) {
                    this.highlightCells([1, 4, 7]);
                    return true;
                }
                break;
            case 8:
                if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[6] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[7] && __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[7] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[8]) {
                    this.highlightCells([6, 7, 8]);
                    return true;
                }
                else if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[2] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[5] && __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[5] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[8]) {
                    this.highlightCells([2, 5, 8]);
                    return true;
                }
                else if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[0] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[4] && __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[4] === __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[8]) {
                    this.highlightCells([0, 4, 8]);
                    return true;
                }
                break;
            default:
                break;
        }
        return false;
    }
    updateCellContent(id, index) {
        if (__classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[index] === "") {
            __classPrivateFieldGet(this, _TicTacToe_gameBoard, "f")[index] = __classPrivateFieldGet(this, _TicTacToe_turn, "f");
            const htmlElement = document.getElementById(id + "-content");
            if (htmlElement) {
                htmlElement.innerHTML = __classPrivateFieldGet(this, _TicTacToe_turn, "f");
            }
            if (this.hasWinner(index)) {
                this.declareWinner();
            }
            else if (this.isGameTied()) {
                this.declareTiedGame();
            }
            else {
                this.updateTurn();
            }
        }
    }
    processTurn(event) {
        if (!__classPrivateFieldGet(this, _TicTacToe_gameEnded, "f")) {
            const target = event.target;
            const id = target.id;
            const htmlElement = document.getElementById(id);
            if (htmlElement) {
                const indexString = htmlElement.getAttribute("index");
                const index = Number(indexString);
                this.updateCellContent(id, index);
            }
        }
    }
    resetGame() {
        __classPrivateFieldSet(this, _TicTacToe_gameEnded, false, "f");
        __classPrivateFieldSet(this, _TicTacToe_gameBoard, ["", "", "", "", "", "", "", "", ""], "f");
        __classPrivateFieldSet(this, _TicTacToe_turn, "X", "f");
        document.getElementById("status-text").innerHTML = "Turn: ";
        document.getElementById("token").innerHTML = "X";
        document.querySelectorAll(".cell").forEach((element) => {
            const htmlElement = element;
            htmlElement.style.backgroundColor = "white";
        });
        document.querySelectorAll(".cell-content").forEach((element) => {
            element.innerHTML = "";
        });
    }
    run() {
        document.getElementById("token").addEventListener("click", this.changeToken);
        document.querySelectorAll(".cell").forEach((element) => {
            element.addEventListener("click", this.processTurn);
        });
        document.getElementById("reset-button").addEventListener("click", this.resetGame);
    }
}
_TicTacToe_gameEnded = new WeakMap(), _TicTacToe_gameBoard = new WeakMap(), _TicTacToe_turn = new WeakMap();
const tictactoe = new TicTacToe();
tictactoe.run();
