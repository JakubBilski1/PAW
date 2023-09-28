const prompt = require('prompt-sync')({sigint: true});

console.log('Wybierz opcje:\n1-Sprawdź czy trójkąt jest pitagorejski\n2-Oblicz pole i obwód koła\n3-Policz równanie kwadratowe\nWybór: ')
const pick = prompt('');

switch(pick){
    case "1":
        const a1 = prompt('Podaj przyprostokatna: ')
        const b1 = prompt('Podaj 2 przyprostokatna: ')
        const c1 = prompt('Podaj przeciwprostokatna: ')
        const result = Math.pow(parseFloat(a1), 2)+Math.pow(parseFloat(b1), 2) === Math.pow(parseFloat(c1), 2) ? "Jest pitagorejski" : "Nie jest pitagorejski";
        console.log(result)
        break;
    case "2":
        const r = prompt('Podaj promien kola: ')
        const area = Math.PI * Math.pow(r, 2)
        const circuit = 2 * r * Math.PI
        console.log(`Pole: ${area.toFixed(2)}cm, Obwód: ${circuit.toFixed(2)}`)
        break;
    case "3":
        const a = prompt('Podaj a: ')
        const b = prompt('Podaj b: ')
        const c = prompt('Podaj c: ')
        const delta = Math.pow(parseFloat(b), 2)-4*parseFloat(a)*parseFloat(c)
        if(delta>0)
            console.log(`x1 = ${(-parseFloat(b) + Math.sqrt(delta))/2*parseFloat(a)}, x2 = ${(-parseFloat(b) - Math.sqrt(delta))/2*parseFloat(a)}`)
        else if(delta == 0)
            console.log(`x1 = ${(-parseFloat(b))/2*parseFloat(a)}`)
        else
            console.log("nie ma rozwiazan")
        break;
    default:
        console.log('Nie ma takiej opcji')
    }