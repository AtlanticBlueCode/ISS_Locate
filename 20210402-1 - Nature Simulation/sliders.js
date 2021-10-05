class Slider{

  constructor(targetObj, targetProp, posY){
    this.targetObj = targetObj
    this.targetProp = targetProp
    this.target = this.targetObj[this.targetProp]
    this.posY = posY
    this.posX = width-90
    this.slider = createSlider(0, 2 * this.target, this.target) .position(this.posX, this.posY)  .style('width', '80px')
  }

/*
  setup(x){
    this.captureRadius = createSlider(0, 60, x.captureRadius) .position(width-100, 20)  .style('width', '80px');
    this.scanRadius    = createSlider(0, 500, x.scanRadius)   .position(width-100, 50)  .style('width', '80px');
    this.scanAperture  = createSlider(0, 90, x.scanAperture)  .position(width-100, 80)  .style('width', '80px');
  }
*/

  drawName(){
    textFont("courier");
    textStyle(BOLD)
    fill(0)
    strokeWeight(0.5)
    stroke(50)
    text(this.targetProp, this.posX -120, this.posY+5)
  }
  
  update(x){
    x[this.targetProp] = this.slider.value() 
  }

}