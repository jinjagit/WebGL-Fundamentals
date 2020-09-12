# 1.1.1 [Image Processing - image processing](https://webglfundamentals.org/webgl/lessons/webgl-image-processing.html)  

Example code which applies one of various selectable processing kernels.  

## My variations from example code:
* Set canvas background to solid medium-grey
* Multiply canvas size by 2 (from* 2, to * 4) in vertext shader:  
```
// convert from 0->1 to 0->2
   vec2 zeroToTwo = zeroToOne * 4.0;
``` 