//A list of book can be represented by a 5-uplet.
//buying the books 0, 0, 2, 3 can be represented as
// [2, 0, 1, 1, 0] i.e the number of books that are bought
// for each volume.
// To solve the problem, we will try to take each discount
// and see which leads to the smaller price.
// [4, 2, 1, 0, 0] can be grouped in 3 ways:
// - [1, 0, 0, 0, 0] + [3, 2, 1, 0, 0]
// - [1, 1, 0, 0, 0] + [3, 1, 1, 0, 0]
// - [1, 1, 1, 0, 0] + [3, 1 ,0 ,0 ,0]
// we will concider the three options and take the cheaper
// one
// Note that sorting the 5-uplet will reduce the number of
// equivalent cases.
var masks = 
    [
        [0,0,0,0,1],
        [0,0,0,1,1],
        [0,0,1,1,1],
        [0,1,1,1,1],
        [1,1,1,1,1]
    ];

var prices = 
    {
        "0,0,0,0,0":0,
        "0,0,0,0,1":8,
        "0,0,0,1,1":15.2,
        "0,0,1,1,1":21.6,
        "0,1,1,1,1":25.6,
        "1,1,1,1,1":30
    };

var convertInto5Uplet = function(books){
    var returned = [0,0,0,0,0];
    for (var i = books.length - 1; i >= 0; i--) {
        returned[books[i]] += 1;
    };
    return returned;
}

var containsNegativeBook = function(books5uplet) {
    for (var i = books5uplet.length - 1; i >= 0; i--) {
        if(books5uplet[i] < 0){
            return true;
        }
    };
    return false;
}

//We know both arguments have a size of 5.
var difference = function(a, b){
    var result = [];
    for (var i = a.length - 1; i >= 0; i--) {
        result[i] = a[i] - b[i];
    };
    return result;
}

var price5uplet = function(books5uplet) {
    //By sorting the array, it will avoid calculating similar values twice
    books5uplet.sort();

    //That will remove any solution where we sold a book
    //that wasn't possible to sell
    if(containsNegativeBook(books5uplet)) {
        return Number.MAX_SAFE_INTEGER;
    };

    var price = prices[books5uplet.toString()];
    
    if (price === undefined) {
        var values = [];

        for (var i = masks.length - 1; i >= 0; i--) {
            values[i] = price5uplet(masks[i]) + price5uplet(difference(books5uplet, masks[i]));
        };

        price = Math.min.apply(null, values);

        //If you don't save your result,
        //you're doing brute force instead of 
        //dynamic programing.
        //It has a drastic effect on computation time
        prices[books5uplet.toString()] = price;
        
    }
    return price;
}

var price = function(books) {
    var uplet = convertInto5Uplet(books);
    return price5uplet(uplet);
};
exports.price = price
exports.convertInto5Uplet = convertInto5Uplet
