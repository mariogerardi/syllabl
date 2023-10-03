function syllables(word) {
    fetch(`https://wordsapiv1.p.rapidapi.com/words/${word}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "",
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com"
      }
    })
    .then(response => response.json())
        .then(data => {;
        console.log(data.syllables.count);
    });
}

function submit() {
    let first = document.getElementById('slotOne').value;
    let second = document.getElementById('slotTwo').value;
    let third =document.getElementById('slotThree').value;
    fetch(`https://wordsapiv1.p.rapidapi.com/words/${first+second+third}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "",
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com"
      }
    })
    .then(response => response.json())
        .then(data => {;
        console.log(data.syllables.count);
    });
}