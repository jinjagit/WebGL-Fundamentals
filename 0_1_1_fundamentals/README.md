# 0.1 [Fundamentals - fundamentals](https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html)  

A very basic template that draws a single pink triangle on a full-page canvas.

## My variations from example code:
* I have moved the shaders code to the `index.js` file, as multi-line strings.  
* Canvas is resized to be the largest square that can fit on the page. This is not necessarily ideal and will change perspective of image(s) relative to examples. Adjust to taste.  
* Canvas has grey background, body has black background. 
* Scroll-bars are disabled.
* Console logs error message if no webgl context can be set.  

## Significant quotes:

Nearly all of the entire WebGL API is about setting up state for these pairs of functions to run. For each thing you want to draw you setup a bunch of state then execute a pair of functions by calling gl.drawArrays or gl.drawElements which executes your shaders on the GPU.

Any data you want those functions to have access to must be provided to the GPU. There are 4 ways a shader can receive data.

    Attributes and Buffers

    Buffers are arrays of binary data you upload to the GPU. Usually buffers contain things like positions, normals, texture coordinates, vertex colors, etc although you're free to put anything you want in them.

    Attributes are used to specify how to pull data out of your buffers and provide them to your vertex shader. For example you might put positions in a buffer as three 32bit floats per position. You would tell a particular attribute which buffer to pull the positions out of, what type of data it should pull out (3 component 32 bit floating point numbers), what offset in the buffer the positions start, and how many bytes to get from one position to the next.

    Buffers are not random access. Instead a vertex shader is executed a specified number of times. Each time it's executed the next value from each specified buffer is pulled out and assigned to an attribute.

    Uniforms

    Uniforms are effectively global variables you set before you execute your shader program.

    Textures

    Textures are arrays of data you can randomly access in your shader program. The most common thing to put in a texture is image data but textures are just data and can just as easily contain something other than colors.

    Varyings

    Varyings are a way for a vertex shader to pass data to a fragment shader. Depending on what is being rendered, points, lines, or triangles, the values set on a varying by a vertex shader will be interpolated while executing the fragment shader.
