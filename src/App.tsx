import './App.css';
import React from 'react';
import * as Mino from './Mino';

type BoardProps = {
    width: number,
    height: number
};

type CellType = (Mino.MinoType | null);
type CurrentMinoType = {
    mino: Readonly<Mino.Mino>,
    x: number,
    y: number,
    rot: Mino.RotType,
};

function copyCells(cells: CellType[][]): CellType[][] {
    return JSON.parse(JSON.stringify(cells)); // deep copy
}

function minoPosition(current: Readonly<CurrentMinoType>): [number, number][] {
    return current.mino.shape(current.rot).map((p) => {
        return [p[0] + current.x, p[1] + current.y];
    });
}

function checkInRange(cells: readonly CellType[][], current: Readonly<CurrentMinoType>): boolean {
    return minoPosition(current).every(([x, y]) => {
        const height = cells.length;
        const width = cells[0].length;
        if (y < 0 || height <= y)
            return false;
        if (x < 0 || width <= x)
            return false;
        return cells[y][x] === null;
    });
}

type BoardStatus = {
    current: CurrentMinoType | undefined,
    cells: CellType[/*y*/][/*x*/] // static minos
}

type MinoControlCmd = "Left" | "Right" | "Down" | "Clockwise" | "CounterClockwise";

class TetrisBoard extends React.Component<BoardProps, BoardStatus> {
    constructor(props: BoardProps) {
        super(props);
        this.state = {
            current: undefined,
            cells: Array<Array<CellType>>(props.height).fill([null])
                .map((_) => Array<CellType>(props.width).fill(null))
        };
    }

    update() {
        this.setState((state) => {
                const removed_row = TetrisBoard.removedFilledRow(state.cells);
                if (removed_row !== null)
                    return {current: state.current, cells: removed_row};

                if (state.current === undefined) {
                    const new_mino = this.createNewMino(Mino.getRandomMinoType());
                    if (checkInRange(state.cells, new_mino)) {
                        return {current: new_mino, cells: state.cells};
                    } else {
                        console.log("game over");
                    }
                }

                return this.calcNextState("Down", state);
            }
        );
    }

    controlMino(cmd: MinoControlCmd) {
        this.setState((state) => {
            return this.calcNextState(cmd, state);
        });
    }

    render() {
        let cells = copyCells(this.state.cells);
        const current = this.state.current;
        if (current) {
            minoPosition(current).forEach(([x, y]) => {
                if (0 <= x && x < this.props.width && 0 <= y && y < this.props.height) {
                    cells[y][x] = current.mino.type;
                }
            });
        }
        const body = cells.map((row) => {
            return <tr className="tetris_th">{row.map((cell) => {
                if (cell === null) {
                    return <td className="tetris_td" style={{background: "#ffffff"}}/>
                } else {
                    const mino = Mino.typeToMino(cell);
                    return <td className="tetris_td" style={{background: mino.color}}/>
                }
            })}</tr>;
        });

        return (
            <div>
                <table className="tetris_board">
                    <tbody>{body}</tbody>
                </table>
                <TetrisController board={this}/>
            </div>
        );
    }

    private createNewMino(type: Mino.MinoType): CurrentMinoType {
        return {
            mino: Mino.typeToMino(type),
            x: Math.floor((this.props.width + 1) / 2),
            y: 1,
            rot: 0
        };
    }

    private calcNextState(cmd: MinoControlCmd, state: BoardStatus): BoardStatus {
        if (state.current !== undefined) {
            const next = ((current, cmd) => {
                switch (cmd) {
                    case "Left":
                        return {...current, x: current.x - 1};
                    case "Right":
                        return {...current, x: current.x + 1};
                    case "Down":
                        return {...current, y: current.y + 1};
                    case "Clockwise":
                        return {...current, rot: Mino.rotClockWise(current.rot)};
                    case "CounterClockwise":
                        return {...current, rot: Mino.rotCounterClockWise(current.rot)};
                }
            })(state.current, cmd);

            if (checkInRange(state.cells, next))
                return {...state, current: next};

            if (cmd === "Down") {
                // current cell have been dropped
                let cells = copyCells(state.cells);
                minoPosition(state.current).forEach(([x, y]) => {
                    if (state.current !== undefined)
                        cells[y][x] = state.current.mino.type;
                });
                return {...state, current: undefined, cells: cells};
            }

            if (cmd === "Clockwise" || cmd === "CounterClockwise") {
                let alt: BoardStatus | undefined = undefined;
                // ずらして入るなら入れる
                [1, -1, 2, -2].forEach((dx) => {
                    if (alt === undefined && checkInRange(state.cells, {...next, x: next.x + dx}))
                        alt = {...state, current: {...next, x: next.x + dx}};
                });
                if (alt !== undefined)
                    return alt;
            }
        }
        return state;
    }

    private static removedFilledRow(cells: CellType[][]): CellType[][] | null {
        // If there is a filled row, remove this
        const filled_row = cells.findIndex((row) => {
            return row.every((cell) => {
                return cell != null;
            });
        });
        if (filled_row !== -1) {
            let copy = copyCells(cells);
            copy.splice(filled_row, 1);
            copy.unshift(new Array<CellType>(cells[0].length).fill(null));
            return copy;
        }
        return null;
    }
}

type TetrisControllerProps = {
    board: TetrisBoard
};

class TetrisController extends React.Component<any, TetrisControllerProps> {
    private timerID: NodeJS.Timeout | undefined | null;
    private readonly board: TetrisBoard;

    constructor(props: TetrisControllerProps) {
        super(props);
        this.board = props.board;
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    render() {
        if (this.timerID === undefined || this.timerID === null) {
            const startGame = (() => {
                document.addEventListener("keydown", this.onKeyDown);
                this.timerID = setInterval(() => {
                    this.board.update();
                }, 1000);
                this.forceUpdate();
            });

            return (
                <button className="startButton" onClick={startGame}>
                    {this.timerID === undefined ? "Game Start" : "Restart"}
                </button>
            );
        } else {
            const stopGame = (() => {
                document.removeEventListener("keydown", this.onKeyDown);
                if (this.timerID !== undefined && this.timerID !== null) {
                    clearInterval(this.timerID);
                    this.timerID = null;
                }
                this.forceUpdate();
            });
            return <button className="startButton" onClick={stopGame}>Stop Game</button>;
        }
    }

    private onKeyDown(event: KeyboardEvent): void {
        const cmd = ((key) => {
            switch (key) {
                case "ArrowDown":
                    return "Down";
                case "ArrowLeft":
                    return "Left";
                case "ArrowRight":
                    return "Right";
                case "ArrowUp":
                    return "Clockwise";
                default:
                    return null;
            }
        })(event.key);

        if (cmd !== null)
            this.board.controlMino(cmd);
    }
}

function App() {
    return (
        <div className="App">
            <TetrisBoard width={10} height={20}/>
        </div>
    );
}

export default App;
