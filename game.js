let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-button");
let newgamebtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true //playerO, playerX
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7 ,8]
];

const resetgame = () => {
    turnO = true;
    count = 0;
    enableboxes();
    msgcontainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O"; // player-O
            turnO = false;
        } else {
            box.innerText = "X"; // player-X
            turnO = true;
        }
        box.disabled = true;
        count++;

        let iswinner = checkwinner();

        if (count === 9 && !iswinner) {
            drawMatch();
        }
    });  
});

const drawMatch = () => {
    msg.innerText = `Match is Draw!`;
    msgcontainer.classList.remove("hide");
    disableboxes();

};

const disableboxes = () =>{
    for (let box of boxes){
        box.disabled = true;
    }
};

const enableboxes = () =>{
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();
};

const checkwinner = () => {
    for (let pattern of winPatterns) {
       let val1 = boxes[pattern[0]].innerText;
       let val2 = boxes[pattern[1]].innerText;
       let val3 = boxes[pattern[2]].innerText;

       if (val1 != '' && val2 != '' && val3 != '') {
            if (val1 === val2 && val2 === val3) {
                showWinner(val1);
                return true;
            }
        }
    }
};


newgamebtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);