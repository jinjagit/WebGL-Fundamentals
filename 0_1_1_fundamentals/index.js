// WebGL - Fundamentals
// slightly adapted from https://webglfundamentals.org/webgl/webgl-fundamentals.html

// Draws a single pink triangle.

/* eslint no-console:0 consistent-return:0 */
"use strict";

// a function that creates a shader, uploads the GLSL source, and compiles
// the shader.
function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function main() {
  // Initialization code:

  // Get A WebGL context
  var canvas = document.getElementById("canvas");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    console.log("No webgl context for you!");
  }

  // My code: sets canvas to largest square that will fit on page
  if (window.innerHeight > window.innerWidth) {
    canvas.height = window.innerWidth;
    canvas.width = window.innerWidth;
    canvas.style.height = window.innerWidth;
    canvas.style.width = window.innerWidth;
  } else {
    canvas.height = window.innerHeight;
    canvas.width = window.innerHeight;
    canvas.style.height = window.innerHeight;
    canvas.style.width = window.innerHeight; 
  }

  // Set the strings for our GLSL shaders
  var vertexShaderSource = `
  // an attribute will receive data from a buffer
  attribute vec4 a_position;

  // all shaders have a main function
  void main() {

    // gl_Position is a special variable a vertex shader
    // is responsible for setting
    gl_Position = a_position;
  }`;
  
  var fragmentShaderSource = `
  // fragment shaders don't have a default precision so we need
  // to pick one. mediump is a good default
  precision mediump float;

  void main() {
    // gl_FragColor is a special variable a fragment shader
    // is responsible for setting
    gl_FragColor = vec4(1, 0, 0.5, 1); // return redish-purple
  }`;

  // create GLSL shaders, upload the GLSL source, compile the shaders
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  // Link the two shaders into a program
  var program = createProgram(gl, vertexShader, fragmentShader);

  // Now that we've created a GLSL program on the GPU we need to supply data to
  // it. The majority of the WebGL API is about setting up state to supply data
  // to our GLSL programs. In this case our only input to our GLSL program is
  // a_position which is an attribute. The first thing we should do is look up
  // the location of the attribute for the program we just created.

  // look up where the vertex data needs to go.
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  // Create a buffer and put three 2d clip space points in it
  var positionBuffer = gl.createBuffer();

  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  var positions = [
    0.0, 0.5,
    1.0, 0.0,
    0.0, 0.0,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // There's a lot going on here. The first thing is we have positions which is
  // a JavaScript array. WebGL on the other hand needs strongly typed data so
  // the part new Float32Array(positions) creates a new array of 32bit floating
  // point numbers and copies the values from positions. gl.bufferData then
  // copies that data to the positionBuffer on the GPU. It's using the position
  // buffer because we bound it to the ARRAY_BUFFER bind point above.

  // The last argument, gl.STATIC_DRAW is a hint to WebGL about how we'll use
  // the data. WebGL can try to use that hint to optimize certain things.
  // gl.STATIC_DRAW tells WebGL we are not likely to change this data much.

  // code above this line is initialization code.
  // code below this line is rendering code.

  // Tell WebGL how to convert from clip space to pixels
  // This tells WebGL the -1 +1 clip space maps to 0 <-> gl.canvas.width for x
  // and 0 <-> gl.canvas.height for y.
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Clear the canvas, with grey background, fully opaque.
  gl.clearColor(0.5, 0.5, 0.5, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);

  // Turn on the attribute
  gl.enableVertexAttribArray(positionAttributeLocation);

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  var size = 2;          // 2 components per iteration
  var type = gl.FLOAT;   // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0;        // start at the beginning of the buffer
  gl.vertexAttribPointer(
      positionAttributeLocation, size, type, normalize, stride, offset);

  // A hidden part of gl.vertexAttribPointer is that it binds the current
  // ARRAY_BUFFER to the attribute. In other words now this attribute is bound
  // to positionBuffer. That means we're free to bind something else to the
  // ARRAY_BUFFER bind point. The attribute will continue to use positionBuffer.

  // draw
  // For each thing you want to draw you setup a bunch of state then execute a
  // pair of functions by calling gl.drawArrays or gl.drawElements
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 3;
  gl.drawArrays(primitiveType, offset, count);
}

main();