let type = 1;
let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let count = -1;

let boxes = document.getElementsByClassName('box');

let neww = () => {
    for (let i = 0; i < 9; i++) {
        arr[i] = 0;
        document.getElementById(`a${i + 1}`).innerHTML = ``;
    }
    count = -1;
}
document.getElementById('new').addEventListener("click", neww);

document.getElementById('type').addEventListener("click", () => {
    count = -1;
    neww();
    if (type == 2) {
        document.getElementById('type').innerText = 'Advanced';
        type = 1;
        for (let i = 0; i < 9; i++) {
            boxes[i].addEventListener("click", boxevent)
        }
        document.getElementById('plybtn1').removeEventListener("click", advply);
        document.getElementById('plybtn2').removeEventListener("click", advply);
        document.getElementById('player1').innerHTML = `<h2>Player 1</h2>`;
        document.getElementById('player2').innerHTML = `<h2>Player 2</h2>`;
    }
    else {
        document.getElementById('type').innerText = 'Normal';
        type = 2;
        for (let i = 0; i < 9; i++) {
            boxes[i].removeEventListener("click", boxevent)
        }
        document.getElementById('player1').innerHTML += `<button id="plybtn1" style="color:red;text-align:center;background-color:lightgreen;border-radius:8px;margin-bottom:5px;">Playmove</button>`;
        document.getElementById('player2').innerHTML += `<button id="plybtn2" style="color:red;text-align:center;background-color:lightgreen;border-radius:8px;margin-bottom:5px;">Playmove</button>`;
        document.getElementById('plybtn1').addEventListener("click", advply);
        document.getElementById('plybtn2').addEventListener("click", advply);
    }
})

for (let i = 0; i < 9; i++) {
    boxes[i].addEventListener("click", boxevent)
}

function boxevent(event) {
    let bx = event.target;
    swth(bx);
}

function swth(bx) {
    switch (bx.id) {
        case 'a1':
            fillup(0);
            break;
        case 'a2':
            fillup(1);
            break;
        case 'a3':
            fillup(2);
            break;
        case 'a4':
            fillup(3);
            break;
        case 'a5':
            fillup(4);
            break;
        case 'a6':
            fillup(5);
            break;
        case 'a7':
            fillup(6);
            break;
        case 'a8':
            fillup(7);
            break;
        case 'a9':
            fillup(8);
            break;
    }
}

function winn(n) {
    let flag = 0;
    if ((arr[0] == arr[1] && arr[1] == arr[2] && arr[1] != 0) || (arr[3] == arr[4] && arr[4] == arr[5] && arr[4] != 0) || (arr[6] == arr[7] && arr[7] == arr[8] && arr[7] != 0) || (arr[0] == arr[4] && arr[4] == arr[8] && arr[4] != 0) || (arr[0] == arr[3] && arr[3] == arr[6] && arr[3] != 0) || (arr[1] == arr[4] && arr[4] == arr[7] && arr[4] != 0) || (arr[8] == arr[5] && arr[5] == arr[2] && arr[5] != 0) || (arr[2] == arr[4] && arr[4] == arr[6] && arr[4] != 0)) {
        if (n != 1) {
            document.getElementById('win').innerHTML = `<h1>Player 1 WON</h1>`;
        }
        else {
            document.getElementById('win').innerHTML = `<h1>Player 2 WON</h1>`;
        }
        setTimeout(() => { document.getElementById('win').innerHTML = ``; neww(); count = -1; }, 5000);
    }
}

function fillup(n) {
    if (arr[n] == 0) {
        count++;
        if (count % 2 == 0) {
            arr[n] = 1;
            document.getElementById(`a${n + 1}`).innerHTML = `<h1 class="boxee">X</h1>`;
        }
        else {
            arr[n] = 2;
            document.getElementById(`a${n + 1}`).innerHTML = `<h1 class="boxee">O</h1>`;
        }
    }
    else if (arr[n] == 1 && type == 2) {
        count++;
        if (count % 2 == 0) { count--; Rnd() }
        else {
            arr[n] = 0;
            document.getElementById(`a${n + 1}`).innerHTML = ``;
        }
    }
    else {
        if (type == 2) {
            count++;
            if (count % 2 == 0) {
                arr[n] = 0;
                document.getElementById(`a${n + 1}`).innerHTML = ``;
            }
            else { count--; Rnd() }
        }
    }
    if (type == 1) {
        draw();
    }
    winn(count % 2);
}

function advply(event) {
    if (event.target.id == 'plybtn1' && (count - 1) % 2 == 0) {
        Rnd();
    }
    else if (event.target.id == 'plybtn2' && (count - 1) % 2 != 0) {
        Rnd();
    }
}

function Rnd() {
    let x = parseInt(Math.random() * 10);
    console.log(x);
    if (x == 9) {
        x = parseInt(((Math.random() * 10)/9)*10);
    }
    fillup(x);
}

document.getElementById('changeplayer').addEventListener("click", () => { alert("This option will be available soon.") })

function draw() {
    let element = 0;
    for (let index = 0; index < 9; index++) {
        if(arr[index]!=0){
        console.log(element);
        element++;
        }
    }
    if(element==9){
        document.getElementById('win').innerHTML = `<h1>Match Draw</h1>`;
        setTimeout(() => { document.getElementById('win').innerHTML = ``; neww(); count = -1; }, 5000);
    }
}