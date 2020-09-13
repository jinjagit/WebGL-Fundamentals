# 1.1.2 [Image Processing Continued](https://webglfundamentals.org/webgl/lessons/webgl-image-processing-continued.html)  

Example code which applies multiple selectable processing kernels.  

## My variations from example code:
* Multiply canvas size by 3 (from* 2, to * 6) in vertext shader:  
```
// convert from 0->1 to 0->2
   vec2 zeroToTwo = zeroToOne * 6.0;
``` 
