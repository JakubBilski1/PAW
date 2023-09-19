const f1 = (num1, num2) =>{
    const text = document.createElement("p")
    text.innerText = `Ulubioną liczbą osoby urodzonej w roku ${num1} jest ${num2}`
    document.body.appendChild(text)
}

const f2 = () =>{
    let a, b;
    do{
        a = +prompt('Podaj date urodzenia')
        if(!isNaN(a)){
            if(a>1920 && a<2023){
                break;
            }
            alert("data musi się zawierać między 1920, a 2023")
        }else{
            alert("musisz wprowadzic liczbę")
        }
    }while(true)
    do{
        b = +prompt('Podaj ulubioną liczbę')
        if(!isNaN(b)){
            if(![69, 420, 2137].includes(b)){
                break;
            }
            alert("zabroniona liczba")
        }else{
            alert("musisz wprowadzic liczbę")
        }
    }while(true)
    f1(a, b)
}
setInterval(f2, 60000)