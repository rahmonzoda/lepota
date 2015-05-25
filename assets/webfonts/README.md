# webfonts

A sass partial to quickly include webfonts.

## Installation

Use [Bower](http://bower.io/): 
`bower install webfonts`

## Usage

Import the partial in your Sass file:
`@import 'path_to_bower_components/webfonts/webfonts';`

Then include your font using the following scheme:
`@include web-fonts('Family Name', 'path/to/fontfile', 'font-weight', 'font-style');`

The `font-weight` and `font-style`parameters are optional.
