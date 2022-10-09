/*
    on adding multiple values in an array :
    https://bobbyhadz.com/blog/javascript-push-multiple-values-to-array
    https://stackoverflow.com/questions/14723848/push-multiple-elements-to-array
*/

let anArray = [1, 2, 3, 4, 5, 6];
console.log(anArray);

// using .push to append multiple elements to an array; it modifies the array 
anArray.push(7, 8, 9);
console.log(anArray);

// .push returns the number of elements in the new array
console.log(anArray.push(10, 11));
console.log(anArray);

// using the spread syntax
anArray = [...anArray, 12, 13, 14];
console.log(anArray);

// using .push with the spread syntax
let anotherArray = [15, 16, 17, 18];
anArray.push(...anotherArray);
console.log(anArray);

// using .concat which returns a new array
console.log(anArray.concat(19, 20, 21)); // with a sequence of elements
console.log(anArray.concat([19, 20, 21])); // with an array of elements
console.log(anArray.concat(...[19, 20, 21])); // back to the sequence with the spread syntax
console.log(anArray); // original array unmodified

// using .apply after .push
anArray.push.apply(anArray, [19, 20, 21]);
console.log(anArray);

// better syntax since .apply needs a context variable anyways so it's like a static method
Array.prototype.push.apply(anArray, [22, 23]);
console.log(anArray);

// .apply requires an array; the following two calls fail
// Array.prototype.push.apply(anArray, 24, 25);
// Array.prototype.push.apply(anArray, ...[24, 25]);

// using .splice with actually offers more options
anArray.splice(anArray.length /* where to insert */, 0 /* how many to remove before inserting */, 24, 25);
console.log(anArray);

// using .splice to insert where we want
anArray.splice(2, 0, 2.25, 2.5, 2.75);
console.log(anArray);

// using .splice to remove elements
anArray.splice(2, 3);
console.log(anArray);

// using .splice to replace elements
anArray.splice(2, 3, "III", "IV", "V");
console.log(anArray);

// using .splice to replace a range of values by another one
anArray.splice(2, anArray.length - 5, ['👹', '👺', '👻', '👽'], '💀', '🤡');
console.log(anArray);





/*
    on replacing items in an arrays by many items
    https://stackoverflow.com/questions/46986710/return-multiple-values-from-es6-map-function
*/

let values = [1, 2, 3, 4]; 
let newValues = values.map(v => [v ** 2, v ** 3, v + 1]);

console.log(newValues); // result : [ [ 1, 1, 2 ], [ 4, 8, 3 ], [ 9, 27, 4 ], [ 16, 64, 5 ] ]
                        // wanted result : [ 1, 1, 2, 4, 8, 3, 9, 27, 4, 16, 64, 5 ]

// flattening using .concat in a clever way

newValues = [].concat(...values.map(v => [v ** 2, v ** 3, v + 1]));
console.log(newValues);

// .map is not a sensible way to go since it always returns an array of same length as the original

newValues = [];
for (let element of values)
    newValues.push(element ** 2, element ** 3, element + 1);
console.log(newValues);





// implement a flatten function; full flatten by default; flatten deepness can be specified; let's make it quick!

// first, flatten by only one level

let flatten = function (array) {
    let newArray = [];
    for (let element of array) {
        if (Array.isArray(element)) newArray.push(...element);
        else newArray.push(element);
    }
    return newArray;    
};

let someArray = [1, [2, 3], [4, [5, 6]], [7, [8, [9, 10]]],[11, [12, [13, [14, 15]]]]];
console.log(flatten(someArray)); // flatten returns a new array
console.log(someArray); // original array is intact

// next, using the previous function recursively will do a full flatten

let fullFlatten = function (array) {
    let newArray = [];
    for (let element of array) {
        if (Array.isArray(element))
            newArray.push(...fullFlatten(element)); // spread syntax necessary or newArray will be identical to array
        else
            newArray.push(element);
    }
    return newArray;    
};

console.log(fullFlatten(someArray)); // fullFlatten returns a new array
console.log(someArray); // original array is intact

// now, for the real deal where the number of levels to flatten is given, with a default value of ∞ (full flatten)

// testing arithmetic with Infinity
console.log(Infinity, Infinity - 1, 1 - Infinity, Infinity - Infinity, Infinity * 2, Infinity * -2, Infinity * 0);

let flattenToLevel = function (array, level = Infinity) {
    if (level >= 0) {
        if (level > 0) {
            let newArray = [];
            for (let element of array) {
                if (Array.isArray(element))
                    newArray.push(...flattenToLevel(element, level - 1));
                else
                    newArray.push(element);
            }
            return newArray;  
        }
        else
            return array;  
    }
    else {
        console.log("Le nombre de niveaux à aplatir doit être positif.");
        return array;
    }
};

console.log("Applatissement au niveau -1 :\n", flattenToLevel(someArray, -1), "\n");
console.log("Applatissement au niveau 0 :\n", flattenToLevel(someArray, 0), "\n");
console.log("Applatissement au niveau 1 :\n", flattenToLevel(someArray, 1), "\n");
console.log("Applatissement au niveau 2 :\n", flattenToLevel(someArray, 2), "\n");
console.log("Applatissement au niveau 3 :\n", flattenToLevel(someArray, 3), "\n");
console.log("Applatissement au niveau 4 :\n", flattenToLevel(someArray, 4), "\n");
console.log("Applatissement au niveau 5 :\n", flattenToLevel(someArray, 5), "\n");
console.log("Applatissement au niveau ∞ :\n", flattenToLevel(someArray), "\n");