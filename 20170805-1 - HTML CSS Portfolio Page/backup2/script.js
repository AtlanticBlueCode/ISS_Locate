function ElementIdCoordY (element) {
    return document.getElementById(element).getBoundingClientRect().top;
    //this.x = document.getElementById(element).getBoundingClientRect().left;
    //this.y = document.getElementById(element).getBoundingClientRect().top;
    //console.log(this.x + " " + this.y);
    //return  {x: this.x, y: this.y}
}

/*
var a = new ElementCoord("portfolio");

console.log(a);

*/
//ElementIdCoord("portfolio");
var a=ElementIdCoordY("portfolio");
