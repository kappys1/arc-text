# ArcText

>Is a Library to curve any text font on the web.


[![npm version](https://badge.fury.io/js/arc-text.svg)](https://badge.fury.io/js/arc-text) ![licence](https://img.shields.io/badge/licence-MIT-blue.svg?style=flat) [![Build Status](https://travis-ci.org/kappys1/arc-text.svg?branch=master)](https://travis-ci.org/kappys1/arc-text)

<!-- ## Demo -->
<!-- > demos available [here](https://kappys1.github.io/ngx-carousel) -->

## Installation

```shell
$ npm i arc-text --save
```

In a browser:
```html
<script src="arc-text.js"></script>
```

Load ES module:
```js
import ArcText from 'arc-text';
```

## API

* [ArcText](#ArcText)
    * [new ArcText(elem, [splitter])](#new_ArcText_new)
    * [.arc(value)](#ArcText+radius) ⇒ [<code>ArcText</code>](#ArcText)
    * [.arc()](#ArcText+radius) ⇒ <code>number</code>
    * [.direction(value)](#ArcText+dir) ⇒ [<code>ArcText</code>](#ArcText)
    * [.direction()](#ArcText+dir) ⇒ <code>number</code>
    * [.forceWidth(value)](#ArcText+forceWidth) ⇒ [<code>ArcText</code>](#ArcText)
    * [.forceWidth()](#ArcText+forceWidth) ⇒ <code>boolean</code>
    * [.forceHeight(value)](#ArcText+forceHeight) ⇒ [<code>ArcText</code>](#ArcText)
    * [.forceHeight()](#ArcText+forceHeight) ⇒ <code>boolean</code>
    * [.refresh()](#ArcText+refresh) ⇒ [<code>ArcText</code>](#ArcText)
    * [.destroy()](#ArcText+destroy) ⇒ [<code>ArcText</code>](#ArcText)

## Examples

**Arc-text radius**
```js
const arcText = new ArctText(document.getElementById('myElement'));

// Set the radius to 150 pixels.
arcText.arc(150);
```

**Arc-text get radius**
```js
const arcText = new ArctText(document.getElementById('myElement'));

// get the radius to 150 pixels.
arcText.arc();
```

**Arc-text direction**
```js
const arcText = new ArctText(document.getElementById('myElement'));

// Set the direction to counter-clockwise.
arcText.direction(-1);

// Set the direction to clockwise.
arcText.direction(1);

// get the direction.
arcText.direction();
```

### Inspired

this library is inspired in [CircleType](https://github.com/peterhry/CircleType) 

### Author
Alex Marcos Gutierrez

### License
MI
