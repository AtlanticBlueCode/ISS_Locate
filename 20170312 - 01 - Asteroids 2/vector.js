// Coding Math Lesson 7 (Vectors Part 2)
// Make sure vector.js is included in the HTML file
// Preferred Way to make reusable Objects in Javascript
// Create an Object as an Object Literal that will be a template

var vector = function (x, y) {
    // Give it properties and functions
    // Start by defining the Unit Vector with x = 1 (length) and y = 0 (angle/direction)     
    this._x = x || 0;
    this._y = y || 1;
};

    // Create the Set and Get X and Y functions which will Set and Get the values of _x and _y directly

vector.prototype.setX = function (value) {
    this._x = value;
};

vector.prototype.getX = function () {
    return this._x;
};

vector.prototype.setY = function (value) {
    this._y = value;
};

vector.prototype.getY = function () {
    return this._y;
};

// Create the Get Length function to get the Length of the vector using Pythagorian Theorem  
vector.prototype.getLength = function () {
    return Math.sqrt(this._x * this._x + this._y * this._y);
};

// Create the Get Angle function to get the Angle of the vector using Math Arctangent 2 (see Video 5)
vector.prototype.getAngle = function () {
    return Math.atan2(this._y, this._x);
};

// Create the Set Length function using Trigonometry, the current Angle and an input Length
vector.prototype.setLength = function (length) {
    var angle = this.getAngle();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
};

// Create the Set Angle function using Trigonometry, the current Length and an input Angle
vector.prototype.setAngle = function (angle) {
    var length = this.getLength();
    this._x = Math.cos(angle) * length;
    this._y = Math.sin(angle) * length;
};

// Create the Add and Subtract functions which adds/subtract "this" vector with vector "v2" to create a new vector using the "create" function
vector.prototype.add = function (v2) {
    return new vector(this._x + v2.getX(), this._y + v2.getY());
};

vector.prototype.subtract = function (v2) {
    return new vector (this._x - v2.getX(), this._y - v2.getY());
};

// Create the Multiply and Divida functions which multiply/divide "this" vector with a scalar "val" to create a new vector using the "create" function
vector.prototype.multiply = function (val) {
    return new vector (this._x * val, this._y * val);
};

vector.prototype.divide = function (val) {
    return new vector (this._x / val, this._y / val);
};

// Create the AddTo and SubtractFrom functions which adds/subtract vector "v2" to "this" vector altering "this" vector
vector.prototype.addTo = function (v2) {
    this._x = this._x + v2.getX();
    this._y = this._y + v2.getY();
};

vector.prototype.subtractFrom = function (v2) {
    this._x -= v2.getX();
    this._y -= v2.getY();
};

// Create the MultiplyBy and DivideBy functions which multiply/divide "this" vector by scalar "val" altering "this" vector
vector.prototype.multiplyBy = function (val) {
    this._x = this._x * val;
    this._y = this._y * val;
};

vector.prototype.divideBy = function (val) {
    this._x /= val;
    this._y /= val;
};
