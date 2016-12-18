// Coding Math Lesson 7 (Vectors Part 2)
// Make sure vector.js is included in the HTML file

// Preferred Way to make reusable Objects in Javascript

// Create an Object as an Object Literal that will be a template
var vector = {

    // Give it properties and functions
    // Start by defining the Unit Vector with x = 1 (length) and y = 0 (angle/direction)     
    _x: 1,
    _y: 0,

    // Create the Set and Get X and Y functions which will Set and Get the values of _x and _y directly
    setX: function (value) {
        this._x = value;
    },

    getX: function () {
        return this._x;
    },

    setY: function (value) {
        this._y = value;
    },

    getY: function () {
        return this._y;
    },

    // Create the Get Length function to get the Length of the vector using Pythagorian Theorem  
    getLength: function () {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    },

    // Create the Get Angle function to get the Angle of the vector using Math Arctangent 2 (see Video 5)
    getAngle: function () {
        return Math.atan2(this._y, this._x);
    },

    // Create the Set Length function using Trigonometry, the current Angle and an input Length
    setLength: function (length) {
        var angle = this.getAngle();
        this._x = Math.cos(angle) * length;
        this._y = Math.sin(angle) * length;
    },

    // Create the Set Angle function using Trigonometry, the current Length and an input Angle
    setAngle: function (angle) {
        var length = this.getLength();
        this._x = Math.cos(angle) * length;
        this._y = Math.sin(angle) * length;
    },

    // We can create instances of this template through Object.create in the main Javascript file
    // Each Object will inherit the Properties and Methods of the "vector" Object via prototypical inheritance
    // Better way is to include a Create method within "vector"
    // The Create function will act as a "Constructor"
    // It will use the "Object.create" function but will take in "this" which the same as saying "Object.create (vector)"
    // It will also take in x and y and finally Return the new Object

    create: function (x, y) {
        var obj = Object.create(this);
        obj.setX(x);
        obj.setY(y);
        return obj;
    },

    // Create the Add and Subtract functions which adds/subtract "this" vector with vector "v2" to create a new vector using the "create" function
    add: function (v2) {
        return vector.create(this._x + v2.getX(), this._y + v2.getY());
    },

    subtract: function (v2) {
        return vector.create(this._x - v2.getX(), this._y - v2.getY());
    },
    
    // Create the Multiply and Divida functions which multiply/divide "this" vector with a scalar "val" to create a new vector using the "create" function
    multiply: function (val) {
        return vector.create(this._x * val, this._y * val);
    },

    divide: function (val) {
        return vector.create(this._x / val, this._y / val);
    },   

    // Create the AddTo and SubtractFrom functions which adds/subtract vector "v2" to "this" vector altering "this" vector
    addTo: function (v2) {
        this._x = this._x + v2.getX();
        this._y = this._y + v2.getY();
    },

    subtractFrom: function (v2) {
        this._x -= v2.getX();
        this._y -= v2.getY();
    },

    // Create the MultiplyBy and DivideBy functions which multiply/divide "this" vector by scalar "val" altering "this" vector
    multiplyBy: function (val) {
        this._x = this._x * val;
        this._y = this._y * val;
    },

    divideBy: function (val) {
        this._x /= val;
        this._y /= val;
    },
    
};