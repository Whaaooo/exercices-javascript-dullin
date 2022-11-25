// difference between for ... in & for ... of
// https://stackoverflow.com/questions/29285897/what-is-the-difference-between-for-in-and-for-of-statements

// on JSON.stringyfy, and its limitations in terms of contents
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

// isObject function similar to isArray ???
// https://stackoverflow.com/questions/13045419/javascript-is-there-an-isobject-function-like-isarray

/*
if( (typeof A === "object" || typeof A === 'function') && (A !== null) )
{
    alert("A is object");
}
*/

// get name of a variable (kinda meta, doncha think?) interestingly, uses Object.keys
// https://stackoverflow.com/questions/4602141/variable-name-as-a-string-in-javascript

// map function for objects, just like for arrays ?
// https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays

/*
myObject = { 'a': 1, 'b': 2, 'c': 3 }
Object.keys(myObject).forEach(function(key, index) {
    console.log(key, index, myObject[key]);
    myObject[key] *= 2;
});
console.log(myObject);
*/

// Array.reduce & Array.reduceRight (like Mathematica's Fold)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

// function composition
// https://www.freecodecamp.org/news/function-composition-in-javascript/

/*
const composeLtoR = (...fns) => (initialVal) => fns.reduce((val, fn) => fn(val), initialVal);
const composeRtoL = (...fns) => (initialVal) => fns.reduceRight((val, fn) => fn(val), initialVal);
const [ add1ThenTimes2, times2ThenAdd1 ] = [ composeLtoR, composeRtoL ].map(composeFN => composeFN(a => a + 1, a => 2 * a));
console.log(add1ThenTimes2(3), times2ThenAdd1(3));
*/

// making an infix composition operator
// https://stackoverflow.com/questions/12350790/is-it-possible-to-define-an-infix-function

/*
Function.prototype['∘'] = function(f){
  return x => this(f(x))
}

const multiply = a => b => (a * b)
const double = multiply (2)
const doublethreetimes = (double) ['∘'] (double) ['∘'] (double)

console.log(doublethreetimes(3));
*/

// let's learn about functors ... and apllicatives and monads while we're at it! Go Haskell Go!!!
// https://en.wikipedia.org/wiki/Functor_(functional_programming)
// https://medium.com/@dtinth/what-is-a-functor-dcf510b098b6  <--------------------------- BEST!!
// above links to : https://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html
// above links to : http://learnyouahaskell.com/a-fistful-of-monads
// https://stackoverflow.com/questions/2030863/in-functional-programming-what-is-a-functor



// I want to really really deeply clone any type of object/array mix with any type stuff in it
const cloneJSON = thing => JSON.parse(JSON.stringify(thing));
const cloneARRAY = thing => Array.isArray(thing) ? thing.map(insideThing => cloneARRAY(insideThing)) : thing;
const cloneFactory = thing => [ cloneJSON, cloneARRAY ].map(cloneFN => cloneFN(thing));



let myObjectMix = {
    'int' : 1,
    'string' : "Hello",
    'function' : x => console.log(`original function : ${x}☠️`),
    'object' : { 'otherInt' : 2, 'otherString' : "World", 'otherObject' : { 'keyA' : 'A', 'keyB' : 'B' }, 'otherArray' : [ 'C', 'D', 'E' ] },
    'array' : [ 3, "!!", { 'keyF' : 'F', 'keyG' : 'G', 'keyH' : 'H' }, [ 'I', 'J' ] ]
};
myObjectMix['property'] = 42;

let [ newObjectJSON, newObjectARRAY ] = cloneFactory(myObjectMix);
let newObjectSPREAD = { ...myObjectMix };
let newObjectSC = structuredClone(myObjectMix);

myObjectMix.int = 11;
myObjectMix.string = "Bonjour";
myObjectMix['function'] = x => console.log(`modified function : ${x}💀`);

myObjectMix.object.otherInt = 22;
myObjectMix.object.otherString = "Monde";
myObjectMix.object.otherObject.keyA = 'AA';
myObjectMix.object.otherArray[0] = 'CC';

myObjectMix.array[0] = 33;
myObjectMix.array[1] = "??";
myObjectMix.array[2].keyF = 'FF';
myObjectMix.array[3][0] = 'II';

myObjectMix['property'] = 4242;

console.log(myObjectMix, newObjectJSON, newObjectARRAY, newObjectSPREAD, newObjectSC);
[ myObjectMix, newObjectARRAY, newObjectSPREAD, newObjectSC ].map(object => object['function']('👻'));



console.log("\n\n\n");



let myArrayMix = [
    1,
    "Hello",
    x => console.log(`original function : ${x}☠️`),
    { 'otherInt' : 2, 'otherString' : "World", 'otherObject' : { 'keyA' : 'A', 'keyB' : 'B' }, 'otherArray' : [ 'C', 'D', 'E' ] },
    [ 3, "!!", { 'keyF' : 'F', 'keyG' : 'G', 'keyH' : 'H' }, [ 'I', 'J' ] ]
];
myArrayMix["property"] = 42;

let [ newArrayJSON, newArrayARRAY ] = cloneFactory(myArrayMix);
let newArraySPREAD = [ ...myArrayMix ];

myArrayMix[0] = 11;
myArrayMix[1] = "Bonjour";
myArrayMix[2] = x => console.log(`modified function : ${x}💀`);

myArrayMix[3].otherInt = 22;
myArrayMix[3].otherString = "Monde";
myArrayMix[3].otherObject.keyA = 'AA';
myArrayMix[3].otherArray[0] = 'CC';

myArrayMix[4][0] = 33;
myArrayMix[4][1] = "??";
myArrayMix[4][2].keyF = 'FF';
myArrayMix[4][3][0] = 'II';

myArrayMix["property"] = 4242;

console.log(myArrayMix, newArrayJSON, newArrayARRAY, newArraySPREAD);
[ myArrayMix, newArrayARRAY, newArraySPREAD ].map(object => object[2]('👽'));



console.log("\n\n\n");



if( (typeof myObjectMix === "object" || typeof myObjectMix === 'function') && (myObjectMix !== null) )
{
    console.log("myObjectMix is object");
}
if( (typeof myArrayMix === "object" || typeof myArrayMix === 'function') && (myArrayMix !== null) )
{
    console.log("myArrayMix is object");
}
console.log();



console.log(Object.keys(myObjectMix).length, myObjectMix.length, Object.keys(myArrayMix).length, myArrayMix.length);
console.log();

Object.keys(myObjectMix).forEach(function(key, index) {
    console.log(key, index, myObjectMix[key]);
});
console.log();

Object.keys(myArrayMix).forEach(function(key, index) {
    console.log(key, index, myArrayMix[key]);
});
console.log();