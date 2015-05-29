//  Part I

// ----------------------------
// write your own forEach() function that takes an array and a function
// ----------------------------

function forEach(array, callback) {
        for (var i = 0; i < array.length; i++) {
            callback.call(i, array[i]);
        }
    }
    // tests
    // ---
var total = 1
forEach([1, 2, 3, 4], function(a) {
    total *= a;
})
console.assert(total === 24)

// ----------------------------
// using forEach() from above, write your own reduce()
// that takes an array and a function
// ----------------------------
function reduce(array, callback, defaultValue) {
    var a = defaultValue ? defaultValue : array.shift()
    forEach(array, function(v, i, array) {
        a = callback(a, v, i, array)
    })
    return a
}

console.assert(
    reduce([1, 2, 3, 4], function(a, v) {
        return a * v
    }) === 24
)

// ----------------------------
// using forEach() from above, write your own map()
// that takes an array and a function
// ----------------------------

function map(array, callback) {
    var newArray = []
    forEach(array, function(v, i, array) {
        newArray.push(callback(v, i, array))
    })
    return newArray;
}

var squares = map([1, 2, 3, 4], function(v) {
    return v * v
})
console.assert(squares[0] === 1)
console.assert(squares[1] === 4)
console.assert(squares[2] === 9)
console.assert(squares[3] === 16)

// ----------------------------
// using reduce() from above, write your own filter()
// that takes an array and a function
// ----------------------------

function filter(array, cb) {
    var result = []
    reduce(array, function(result, v, i, array) {
        if (cb(v, i, array)) {
            result.push(v)
        }
        return result;
    }, result)
    return result;
}

var evens = filter([1, 2, 3, 4], function(v) {
    return v % 2 === 0
})
console.assert(evens[0] === 2)
console.assert(evens[1] === 4)



// using our own forEach(), map(), reduce(), and filter()
// functions written in js-functions-functional-practice-1


// -----------
// Write a function pluck() that extracts a list of
// values associated with property names.
// -----------

function pluck(array, property, list) {
        var list = [];
        for (i = 0; i < array.length; ++i) {
            list[i] = array[i][property];
        }

        return list;
    }
    // tests
    // ---
var stooges = [{
    name: 'moe',
    age: 40
}, {
    name: 'larry',
    age: 50
}, {
    name: 'curly',
    age: 60
}]
console.assert(pluck(stooges, 'name')[0] === 'moe')
console.assert(pluck(stooges, 'age')[2] === 60)


// -----------
// Write a function reject() that does the opposite of filter,
// if the callback function returns a "truthy" value then that
// item is **not** inserted into the new collection,
// otherwise it is.
// -----------


function reject(list, predicate) {
    var result = []
    return reduce(list, function(list, v) {
        if (!predicate(v)) {
            result.push(v)
        }
        return result;
    }, result)
    return result;
}


// // tests
// // ---
var lt10 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
var odds = reject(lt10, function(n) {
    return n % 2 === 0
})
console.assert(odds[0] === 1)
console.assert(odds[1] === 3)
console.assert(odds[4] === 9)

// -----------
// Write a function find() that returns the very first item
// in a collection when the callback function returns true;
// otherwise returns undefined.
// -----------

function find(array, list, predicate) {
    var result = [];
    array.forEach(function(element, i) {
        return list.call(predicate, element, i, array) ? ((result = element), true) : false;
    });
    return result;
}

// tests
// ---
var people = [{
    name: "Matt",
    teaches: "JS"
}, {
    name: "Jwo",
    teaches: "Ruby"
}, {
    name: "Dorton",
    teaches: "life"
}]
var JS = find(people, function(n) {
    return n.teaches === "JS"
})
console.assert(JS.name === "Matt")


// -----------
// Write a function where() that filters for all the values
// in the properties object.
// -----------


function where(list, properties, k) {
    var names = []
    return reduce(list, function(list, v, k) {
        var names = true
        for (var k in properties) {
            if (properties[k] !== v[k]) {
                names = false
            }
        }
        if (names == true) {
            list.push(v)
        }
        return list
    }, names)
}


var plays = [{
    title: "Cymbeline",
    author: "Shakespeare",
    year: 1623
}, {
    title: "The Tempest",
    author: "Shakespeare",
    year: 1623
}, {
    title: "Hamlet",
    author: "Shakespeare",
    year: 1603
}, {
    title: "A Midsummer Night's Dream",
    author: "Shakespeare",
    year: 1600
}, {
    title: "Macbeth",
    author: "Shakespeare",
    year: 1620
}, {
    title: "Death of a Salesman",
    author: "Arthur Miller",
    year: 1949
}, {
    title: "Two Blind Mice",
    author: "Samuel and Bella Spewack",
    year: 1949
}]

var sh8spr = where(plays, {
    author: "Shakespeare"
})
console.assert(sh8spr instanceof Array)
console.assert(sh8spr.length === 5)
console.assert(sh8spr[0].title === "Cymbeline")

sh8spr = where(plays, {
    author: "Shakespeare",
    year: 1611
})
console.assert(sh8spr.length === 0)

sh8spr = where(plays, {
    author: "Shakespeare",
    year: 1623
})
console.assert(sh8spr.length === 2)

var midcentury = where(plays, {
    year: 1949
})
console.assert(midcentury.length === 2)
