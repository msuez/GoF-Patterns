
const biMatrix: number[][] = [
    [1, 2, 3],
    [6, 5, 4],
    [7, 8, 9],
];

const mainDiagonal: number[] = [];
const secondaryDiagonal: number[] = [];

for (let i = 0; i < biMatrix.length; i++) {
    mainDiagonal.push(biMatrix[i][i]);
    secondaryDiagonal.push(biMatrix[i][biMatrix.length - i - 1]);
}

console.log("Diagonal principal:", mainDiagonal.map((md) => {
    console.log(md);
}));

console.log("Diagonal secundaria:", secondaryDiagonal.map((ms) => {
    console.log(ms);
}));
