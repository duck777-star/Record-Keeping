const Scores = []

const AddScoreButton = document.getElementById('score-add-button');
const NameBox = document.getElementById('name-box');
const Template = document.getElementById('box-template');
const Container = document.getElementById('scores-container');

//function addCount(Amount) {

//};

// function addScore() {
//     var NewScoreContent = Template.content.cloneNode(true);
//     var NewScore = NewScoreContent.getElementById('score');
    
//     var PlusButton = NewScore.getElementById('plus-button');
//     var MinusButton = NewScore.getElementById('minus-button');
//     var DeleteButton = NewScore.getElementById('delete-button');

//     PlusButton.addEventListener('click', () => {
//         addCount(1); 
//     });
//     MinusButton.addEventListener('click', () => {
//         addCount(-1); 
//     });
// }

class Score {
    constructor(ScoreName) {
        this.Name = ScoreName;
        
        this.Element = Template.content.cloneNode(true).querySelector('.score');

        this.PlusButton = this.Element.querySelector('.js-plus-button');
        this.MinusButton = this.Element.querySelector('.js-minus-button');
        this.DeleteButton = this.Element.querySelector('.js-delete-button');
        this.Counter = this.Element.querySelector('.score-count');
        this.Title = this.Element.querySelector('.score-title');

        this.Count = 0;
        this.DeleteTimer = null;

        this.addListeners();
        Container.appendChild(this.Element);
        this.Title.textContent = this.Name;
    }

    addListeners() {
        this.PlusButton.addEventListener('click', () => {this.addCount(1)});
        this.MinusButton.addEventListener('click', () => {this.addCount(-1)});
        
        this.DeleteButton.addEventListener('mousedown', () => {
            this.deleteCountdownStart()
        });
        
        this.DeleteButton.addEventListener('mouseup', this.deleteCountdownCancel);
        this.DeleteButton.addEventListener('mouseleave', this.deleteCountdownCancel);
    }

    deleteScore() {
        console.log("d");
        this.Element.remove();
    }

    addCount(Amount) {
        console.log("a");
        this.Count += Amount;
        this.Counter.textContent = `${this.Count}`;
    }

    deleteCountdownStart() {
        console.log("b");
        this.DeleteTimer = setTimeout(() => {
            this.deleteScore();
        }, 1000);
    }
    deleteCountdownCancel() {
        console.log("c");
        clearTimeout(this.DeleteTimer);
    }
}

function newScore() {
    new Score(NameBox.value)
}

AddScoreButton.addEventListener('click', newScore)