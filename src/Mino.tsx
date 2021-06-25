export type MinoType = "I" | "T" | "O" | "L" | "J" | "Z" | "S";
export type MinoShape = [[number, number], [number, number], [number, number], [number, number]];
export type RotType = 0 | 1 | 2 | 3;

export type Mino = {
    type: MinoType
    color: string
    shape: (_: RotType) => MinoShape
};

const IMino: Mino = {
    type: "I",
    color: "#00ffff",
    shape: (rot) => {
        const pattern: MinoShape[] = [
            [[0, -1], [0, 0], [0, 1], [0, 2]],
            [[-1, 0], [0, 0], [1, 0], [2, 0]],
            [[0, -2], [0, -1], [0, 0], [0, 1]],
            [[-2, 0], [-1, 0], [0, 0], [1, 0]],
        ];
        return pattern[rot];
    }
}

const TMino: Mino = {
    type: "T",
    color: "#ff00ff",
    shape: (rot) => {
        const pattern: MinoShape[] = [
            [[0, 0], [-1, 0], [1, 0], [0, -1]],
            [[0, 0], [1, 0], [0, 1], [0, -1]],
            [[0, 0], [-1, 0], [1, 0], [0, 1]],
            [[0, 0], [-1, 0], [0, 1], [0, -1]]
        ];
        return pattern[rot];
    }
}

const OMino: Mino = {
    type: "O",
    color: "#ffff00",
    shape: (_) => {
        return [[0, -1], [1, -1], [0, 0], [1, 0]];
    }
}

const LMino: Mino = {
    type: "L",
    color: "#ff8800",
    shape: (rot) => {
        const pattern: MinoShape[] = [
            [[0, 0], [1, 0], [-1, 0], [1, -1]],
            [[0, 0], [0, 1], [0, -1], [1, 1]],
            [[0, 0], [1, 0], [-1, 0], [-1, 1]],
            [[0, 0], [0, 1], [0, -1], [-1, -1]]
        ];
        return pattern[rot];
    }
}

const JMino: Mino = {
    type: "J",
    color: "#0000ff",
    shape: (rot) => {
        const pattern: MinoShape[] = [
            [[0, 0], [-1, 0], [1, 0], [-1, -1]],
            [[0, 0], [0, 1], [0, -1], [1, -1]],
            [[0, 0], [1, 0], [-1, 0], [1, 1]],
            [[0, 0], [0, 1], [0, -1], [-1, 1]]
        ];
        return pattern[rot];
    }
}

const ZMino: Mino = {
    type: "Z",
    color: "#ff0000",
    shape: (rot) => {
        const pattern: MinoShape[] = [
            [[0, 0], [1, 0], [0, -1], [-1, -1]],
            [[0, 0], [1, 0], [0, 1], [1, -1]],
        ];
        return pattern[rot % 2];
    }
}

const SMino: Mino = {
    type: "S",
    color: "#00ff00",
    shape: (rot) => {
        const pattern: MinoShape[] = [
            [[0, 0], [-1, 0], [0, -1], [1, -1]],
            [[0, 0], [0, -1], [1, 0], [1, 1]],
        ];
        return pattern[rot % 2];
    }
}

export function typeToMino(type: MinoType): Mino {
    switch (type) {
        case "I":
            return IMino;
        case "T":
            return TMino;
        case "O":
            return OMino;
        case "L":
            return LMino;
        case "J":
            return JMino;
        case "Z":
            return ZMino;
        case "S":
            return SMino;
    }
}

export function getRandomMinoType(): MinoType {
    const num = Math.floor(Math.random() * (6 + 1)); // [0, 7]
    switch (num) {
        case 0:
            return "I";
        case 1:
            return "T";
        case 2:
            return "O";
        case 3:
            return "L";
        case 4:
            return "J";
        case 5:
            return "Z";
        case 6:
            return "S";
        default:
            // unreached
            return "I";
    }
}

export function rotClockWise(rot : RotType): RotType{
    return (rot + 1) % 4 as RotType;
}
export function rotCounterClockWise(rot : RotType): RotType{
    return (rot - 1) % 4 as RotType;
}
