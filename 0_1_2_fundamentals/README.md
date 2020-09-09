# 0.1.2 [Fundamentals - fundamentals](https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html)  

Example code which draws 50 random sized and randomly colored rectangles.  

## My variations from example code:
* Added webgl-utils.js file to directory, rather than as a url in `index.html`  
* Added lines in `index.js` to set canvas to largest square possible.  
* Changed lines in `index.js` from:  
```
setRectangle(
        gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300));
```
to:
```
setRectangle(
        gl, randomInt(canvas.width), randomInt(canvas.width), randomInt(canvas.width), randomInt(canvas.width));
```
to give larger rectangles that fill more of canvas.  
* Set the canvas to a grey background  
* Centre the canvas horizontally or vertically  
* Resize the canvas when page is resized, using `<body onresize="main()" ...` in `index.html`  

