#Reel
[DEMO PAGE](https://bks777.github.io/reel/)
* [npm](www.npmjs.com) as a package runner
* [PIXI](www.pixijs.com) as a renderer
* [ES6](www.ecma-international.org/ecma-262/6.0/) as a language
* [WebPack](www.webpack.github.io) as ES6 builder and compiler
* [TimeLineLite](http://greensock.com/timelinelite) as animations tween.

To compile the project you need:
* run npm install from the project directory;
* run webpack by typing './node_modules/.bin/webpack' from terminal
Compiled code is in build/ directory.

To run the project, you need to add project to your local server.

The entry point is in [main.js](https://github.com/bks777/reel/blob/master/src/js/main.js). 
Component was apportioned for:
* **[config](https://github.com/bks777/reel/blob/master/src/js/reel/config.js)** - configuration for application;
* **[SlotMachine](https://github.com/bks777/reel/blob/master/src/js/reel/SlotMachine.js)** - main init;
* **[Reel](https://github.com/bks777/reel/blob/master/src/js/reel/Reel.js)** - single reel class;
* **[Element](https://github.com/bks777/reel/blob/master/src/js/reel/Element.js)** - single symbol class;
* **[Animations](https://github.com/bks777/reel/blob/master/src/js/reel/Animations.js)** - collection of animations, now it's single;
* **[Controls](https://github.com/bks777/reel/blob/master/src/js/reel/Controls.js)** - all buttons.

I would like to add such features in future:
* More animations, with different ease effects;
* Live editing of config with [dat.gui](https://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage)
* blurred and disable symbols types
* [particle](http://a-jie.github.io/Proton/) system implementation