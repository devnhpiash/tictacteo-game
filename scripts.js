let boxes=document.querySelectorAll('.cell');
let resetBtn=document.querySelector('#resetBtn');
let newGame=document.querySelector('#newGame');
let winercont=document.querySelector('.winnercontainer');
let resetGame=document.querySelector('#resetBtn');
let msg=document.querySelector('#msg');

let trunO=true;//player o other wise player x
let count=0;
const winPattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach(box=>{ // using the forEach method we get the querySelector allList and get the value
    box.addEventListener("click",()=>{ // using this callback functions & eventListner we doing some work
        if(trunO){
            box.innerText="O";
            trunO=false;
        }else{
            box.innerText="X";
            trunO=true;
        }
        box.disabled=true;
        count++;
        let isWinner =  checkWinner();
        if(count==9 && !isWinner){
            gamedraw();
        }
       
    });
});

const gamedraw=()=>{
    msg.innerText=`Game was a Draw.`;
    msg.classList.add("draw");
    winercont.classList.remove('hide');
    disabledBoxes();
}


const Btnreset=()=>{
    trunO=true;
    enableBoxes();
    winercont.classList.add('hide');
}
const enableBoxes=()=>{
    for (const box of boxes) {
        box.disabled=false;
        box.innerText="";
    }
}

const disabledBoxes=()=>{
    for (const box of boxes) {
        box.disabled=true;
    }
}

const checkWinner=()=>{
    for (const pattern of winPattern) {
           let pos1Val=boxes[pattern[0]].innerText;
           let pos2Val=boxes[pattern[1]].innerText;
           let pos3Val=boxes[pattern[2]].innerText;

           if(pos1Val !="" && pos2Val !="" && pos3Val != ""){
                if (pos1Val===pos2Val && pos2Val===pos3Val) {
                    Winner(pos1Val);
                    return true;
                }
           }
            
    }
}

const Winner=(pos1Val)=>{
    msg.innerText=`Congratulations Winner Player is: ${pos1Val}`;
    msg.classList.add("winer");
    winercont.classList.remove('hide');
    disabledBoxes();
}

newGame.addEventListener('click',Btnreset);
resetGame.addEventListener('click',Btnreset);




