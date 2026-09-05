let cash = 1000;
const symbols = [
    "😡", 
    "😈" ,
    "👹",
    "🤡",
    "🤖"];
const max = document.getElementById('betMax')
const min = document.getElementById('betMin')

function spin(bet){
    let reels = document.querySelectorAll('.reel')
    let msg = document.getElementById('message')
    console.log('im working')

    if(cash < bet) {
        msg.innerText='YOU BROKE'
    }else{
        cash -= bet;
        let first = symbols[Math.floor(Math.random() * symbols.length)]
        let second = symbols[Math.floor(Math.random() * symbols.length)]
        let third =  symbols[Math.floor(Math.random() * symbols.length)]
        

        reels[0].innerText = first
        reels[1].innerText = second
        reels[2].innerText = third

        if(first === second && second === third){
            msg.innerText = '🎉🎉🎉🎉🎉YOU WON🎉🎉🎉🎉🎉'
            let theBag = bet * 1000
            cash += theBag ;
        }else{
            msg.innerText= '🌩YOU LOST BUDDY🌩'
        }

        document.querySelector('#money-display').innerText = cash;
    }
}

max.addEventListener('click', function (){spin(50)});
min.addEventListener('click', function (){spin(5)});