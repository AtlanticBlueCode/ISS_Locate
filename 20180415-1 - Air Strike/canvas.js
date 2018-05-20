
let width = window.innerWidth;
let height = window.innerHeight;

let canvases  = [];

class Canvas {
  constructor(HTMLCanvas){
    this.HTMLCanvas = document.getElementById(HTMLCanvas);
    this.context = this.HTMLCanvas.getContext('2d');

    this.HTMLCanvas.width = width;
    this.HTMLCanvas.height = height;
    this.HTMLCanvas.style.left = '0px';
    this.HTMLCanvas.style.top = '0px';
    this.HTMLCanvas.style.position = 'absolute';

    this.width = this.HTMLCanvas.width;
    this.height = this.HTMLCanvas.height;
  };

  clear (){
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.strokeStyle = "black";
  }
};

/*
document.body.addEventListener('touchmove', function(event) {
  console.log(event.source);
  //if (event.source == document.body)
    event.preventDefault();
}, false);

window.onresize = function() {
  $(document.body).width(window.innerWidth).height(window.innerHeight);
}

$(function() {
  window.onresize();
});
*/