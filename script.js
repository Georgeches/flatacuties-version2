$(document).ready(function(){
//hide leaderboard section
$(".leaderboard").hide()
$(".vote-button").hide()
//hide the vote-section before voting starts
$('.vote-body').hide()
$('.vote-skip').hide()

//Hide new candidate form
$(".new-candidate-form").hide()

$(".back").hide()

$(".new-candidate").click(function(){
    $(".new-candidate-form").toggle()
    $(".leaderboard").hide()
    $(".vote-section").hide()
    $(".new-candidate").hide()
    $(".back").toggle()
})

$(".back").click(function(){
    $(".new-candidate-form").hide()
    $(".leaderboard").hide()
    $(".vote-section").toggle()
    $(".new-candidate").toggle()
    $(".back").toggle()
})

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault()
    let newCandidate = {
        name: document.getElementById("name").value,
        image: document.getElementById("image").value,
        votes: 0
    }
    all_characters.unshift(newCandidate)
    alert("You have successfully added " + newCandidate.name)
})

let all_characters = [
    {
      "id": 1,
      "name": "Mr. Cute",
      "image": "https://thumbs.gfycat.com/EquatorialIckyCat-max-1mb.gif",
      "votes": 0
    },
    {
      "id": 2,
      "name": "Mx. Monkey",
      "image": "https://thumbs.gfycat.com/FatalInnocentAmericanshorthair-max-1mb.gif",
      "votes": 0
    }
  ]

  

//Get the html elements
let candidate1 = document.querySelector('.candidate1')
let candidate2 = document.querySelector('.candidate2')
let image1 = document.querySelector('.image1')
let image2 = document.querySelector('.image2')
let votes1 = document.querySelector('.votes1')
let votes2 = document.querySelector('.votes2')
let name1 = document.querySelector('.name1')
let name2 = document.querySelector('.name2')
let myLeaderBoard = document.querySelector('.leaderboard-body')

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
    //shuffle the characters
    shuffleArray(all_characters)

    //display the first pair of candidates
    image1.src = all_characters[0].image
    image2.src = all_characters[1].image
    name1.textContent = all_characters[0].name
    name2.textContent = all_characters[1].name
    votes1.textContent = all_characters[0].votes
    votes2.textContent = all_characters[1].votes

    //replace candidate one
    function replaceOne(){
        for(let i of all_characters){
            image1.src = i.image
            name1.textContent = i.name
            votes1.textContent = i.votes
        }
        if(image1.src == image2.src){
            shuffleArray(all_characters)
            replaceOne()
        }
    }

    //replace candidate two
    function replaceTwo(){
        for(let i of all_characters){
            image2.src = i.image
            name2.textContent = i.name
            votes2.textContent = i.votes
        }
        if(image1.src == image2.src){
            shuffleArray(all_characters)
            replaceTwo()
        }
    }

    /* increase number of votes for candidate one if clicked
    and replace candidates */
    let chances = 0
    function clickedOne(){
        for(character of all_characters){
            if(character.image === image1.src){
                character.votes += 1
            }
        }
        chances+=1
        if(chances == '10'){
            alert("your chances for votting is over")
            $('.start-game').toggle()
            $('.vote-body').hide()
            $('.vote-skip').hide()
            
        }
        replaceOne()
        replaceTwo()
    }

    /* increase number of votes for candidate two if clicked
    and replace candidates */
    function clickedTwo(){
        for(character of all_characters){
            if(character.image === image2.src){
                character.votes += 1
            }
        }
        chances+=1
        if(chances == '10'){
            alert("your chances for votting is over")
            $('.start-game').toggle()
            $('.vote-body').hide()
            $('.vote-skip').hide()
            
        }
        replaceTwo()
        replaceOne()
    }

    candidate1.addEventListener('click', clickedOne)
    candidate2.addEventListener('click', clickedTwo)

    //show the leaderboard in order for the one with most votes to least
    function createLeaderBoard(){
        let x = 1
        function compareNumbers(a, b) {
            return a.votes - b.votes;
        }      
        all_characters.sort(compareNumbers)
        all_characters.reverse()
        for(let character of all_characters){
            let characterDiv = document.createElement("div")
            let characterName = document.createElement("p")
            let characterVotes = document.createElement("p")
            characterDiv.classList.add("character-div")
            document.querySelector('.leaderboard-body').appendChild(characterDiv)
            characterName.textContent = x + ".  " + character.name
            characterVotes.textContent = character.votes
            characterDiv.appendChild(characterName)
            characterDiv.appendChild(characterVotes)
            x++
        }
    }

    /* remove the leaderboard to avoid creating another leaderboard when
    leaderboard is clicked again */
    function deleteLeaderBoard(){
        while (myLeaderBoard.firstChild) {
            myLeaderBoard.removeChild(myLeaderBoard.firstChild);
        }
    }

    //show leaderboard and hide voting section
    $(".leaderboard-button").click(function (){
        $(".vote-section").hide();
        $(".leaderboard-button").hide();
        $(".leaderboard").toggle();
        $(".vote-button").toggle();
        $(".new-candidate-form").hide()
        $(".new-candidate").hide()
        createLeaderBoard()
    });

    //show voting section and hide leaderboard
    $(".vote-button").click(function (){
        $(".vote-section").toggle();
        $(".leaderboard-button").toggle();
        $(".leaderboard").hide();
        $(".vote-button").hide();
        $(".new-candidate-form").hide()
        $(".new-candidate").toggle()
        deleteLeaderBoard()
    });

    //skip repeated candidates
    $('.skip').click(function(){
        replaceOne()
        replaceTwo()
    });

    //start the . Display the voting section and resets chances back to 0
    $('.start').click(function(){
        $('.start-game').hide()
        $('.vote-body').toggle()
        $('.vote-skip').toggle()
        if(chances == '10'){
            chances-=10
        }
        
    })

    })