'use strict';

const poll = {
    question: 'What is your favourite programming language?',
    options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
    answers: new Array(4).fill(0),      // make new 4 element array and fill all elements = 0

    registerNewAnswer() {
        const answer = Number(prompt(`${this.question}\n${this.options.join('\n')}\n(Write option number)`));
        console.log(answer);
        
        typeof answer === 'number' && answer < this.answers.length && answer >= 0 && this.answers[answer]++;

        this.displayResults();
        this.displayResults('string');
    },

    displayResults(type = 'array'){
        if(type === 'array'){
            console.log(this.answers);
        }else if(type === 'string'){
            console.log(`Poll results are ${this.answers.join(', ')}`);
        }
    }
}

document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));       // if you not use bind, you will get error of undefined

poll.displayResults.call({answers: [5, 2, 3]});
poll.displayResults.call({answers: [5, 2, 3]}, 'string');
poll.displayResults.call({answers: [1, 5, 3, 9, 6, 1]});
poll.displayResults.call({answers: [1, 5, 3, 9, 6, 1]}, 'string');