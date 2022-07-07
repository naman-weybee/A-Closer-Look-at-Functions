'use strict';

//  Default parameters 

const bookings = [];

const createbooking = function (flight, numPassenger = 1, price = 199 * numPassenger) {

    // flight ??= 'xyz10';     // set default value ---> Actually, we can set default values in parameters --> Default parameters 
    // numPassenger ??= 1;
    // price ??= 199; 
    const booking = {
        flight,
        numPassenger,
        price,
    }
    console.log(booking);
    bookings.push(booking);
}
createbooking('A320');
createbooking('A320', 2, 398);
createbooking('A320', undefined, 1000);

//  How Passing Arguments Works: Value vs. Reference

const flight = 'A360';
const jonas = {
    name1: 'jonas',
    passport: 234356798646,
};

const checkIn = function (flighName, passenger) {
    flighName = 'LH50';
    passenger.name1 = 'Mr.' + passenger.name1;

    if (passenger.passport === 234356798646) {
        console.log('Checked In');
    }
    else {
        console.log('Invalid...!');
    }
}
checkIn(flight, jonas);
console.log(flight);        // Primitive Type --> value not change
console.log(jonas);         // Reference Type ---> object propertie's value change, just like we did it priveously
// what we did above is...
const flighName = flight;
const passenger = jonas;    // we copied object refrence on memory heap, so it will affect if the value has been change


//  Functions Accepting Callback Functions

const oneword = function (str) {
    return str.replaceAll(' ', '').toLowerCase();
}

const UpperSTR = function (str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
}

// Higher Order Function
const tramsformer = function (str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);      // here fn is the UpperSTR --> fn(str) = UpperSTR(str)
    console.log(`Transformed by: ${fn.name}`);      // gives function name
}
tramsformer('JavaScript is the best!', UpperSTR);
tramsformer('JavaScript is the best!', oneword);

// JS callbackes all the time
// const high5 = function () {
//     console.log('🖐');
// }
// document.body.addEventListener('click', high5);

// Functions Returning Functions

const greet = function (greeting) {
    return function (name1) {
        console.log(`${greeting} ${name1}`);
    }
}
const greeter = greet('hey');
greeter('jonas')
greet('hey')('jonas');      // can be written like this also

// using arrow function - just for practice
// const greet = (greeting) => {
//     return (name1) => {
//         console.log(`${greeting} ${name1}`);
//     }
// }

// // can be written like this also
// const greet1 = greeting => name1 => console.log(`${greeting} ${name1}`);

// greet('hey')('jonas');
// greet1('hey')('jonas');

//  The call and apply Methods

const lufthansa = {
    airline: 'Lufthansa',
    code: 'LH',
    booking: [],

    book(flightNum, name) {      // it just like book: function(flightNum, name)
        console.log(`${name} booked a seat on ${this.airline} flight ${this.code}${flightNum}`);
        this.booking.push({ flight: `${this.code}${flightNum}`, name });
    },
}
lufthansa.book(234, 'naman');
lufthansa.book(34, 'ayush');
console.log(lufthansa);

// Call Method
const book1 = lufthansa.book;        // copy the method
book1.call(lufthansa, 23, 'naman');      // call() method used, if we write like --> book(23, 'naman') --> it will not work, bcz it is a regular function call and in regular function call, this keyword is undefined.
console.log(lufthansa);

const euroWings = {
    airline: 'EuroWings',
    code: 'ES',
    booking: [],
}
book1.call(euroWings, 23, 'naman');
console.log(euroWings);

const swiss = {
    airline: 'Swiss',
    code: 'LF',
    booking: [],
}
book1.call(swiss, 4, 'ayush');
console.log(swiss);

// Apply Method     it takes first argument as object and second argument as in the form of array, just like flighData array
const flightData = [34, 'jay'];
book1.apply(swiss, flightData);
console.log(swiss);

// we can also use it for call method using spread operator
book1.call(euroWings, ...flightData);
console.log(euroWings);

// Bind Method

const bookLT = book1.bind(lufthansa);
const bookEW = book1.bind(euroWings);
const bookSS = book1.bind(swiss);

bookLT(53, 'john devid');
bookEW(23, 'chrish evans');
bookSS(28, 'chrish hemsworth');

const bookLT23 = book1.bind(lufthansa, 23);     // here seat number value is already given
bookLT23('martha cooper');  // so just give name
bookLT23('jonas cooper');

// With event Listeners
lufthansa.planes = 300;
lufthansa.buyplane = function () {
    console.log(this);

    this.planes++;
    console.log(this.planes);
}

document.querySelector('.buy').addEventListener('click', lufthansa.buyplane.bind(lufthansa))

// Partial Application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23)  // first argument is this keyword --> in this case we dont have this keyword, so we put null and its good
console.log(addVAT(100));
console.log(addVAT(300));

// Practice Example of Partial Application using function returning function
const addVAT1 = function(rate){
    return function(value){
        console.log(value + value * rate);
    }
}
addVAT1(.23)(100);

//  Immediately Invoked Function Expressions (IIFE)

const runOnce = function(){
    console.log('this will never run again...!');
}
runOnce();

(function(){            // Immediately Invoked Function Expressions
    console.log('this will never run again...!');
})();

(() => console.log('this will ALSO never run again...!'))();


//  Closures

const secureBooking = function(){
    let passenger = 0;

    return function(){
        passenger++;
        console.log(`${passenger} passenger`);
    }
}

const booker = secureBooking();
booker();
booker();
booker();

console.dir(booker);        // Watch the closures inside the scopes

function x(){
    var a = 7;
    function y(){
        console.log(a);
    }
    a = 10
    return y;       // it simply return y function
}
let z = x();
console.log(z);
z();

// Example
let f;
const g = function(){
    const a = 23;
    f = function(){
        console.log(a * 2);
    }
}

// Re-Assigning f function
const h = function(){
    const a = 200;
    f = function(){
        console.log(a * 2);
    }
}

g();
f();
console.dir(f);
h();
f();
console.dir(f);


// Example
const boardPassanger = function(n, wait){
    const perGroup = n / 3;
    setTimeout(function(){
        console.log(`we are boarding all ${n} passengers`);
        console.log(`there are three roups, each of ${perGroup}`);
    }, wait * 1000);     // Timer which gives code value written inside of {} in 1000 miliseconds
    console.log(`Will start boarding in ${wait} seconds`);
}
boardPassanger(180, 3);