# Blog

## TODOs
* [x] Grid structure
* [ ] Index content 
* [ ] Notes sidemenu should have sections. 
  - Programming, notes, blog
* [x] Server side serving of notes. <strong>Not final</strong> .
* [ ] POST page
* [ ] Surface OneNote drawing to blog. POST?
* [ ] Hide/Show gist

### Grid 
<iframe width="540" height="320" src="https://www.youtube.com/embed/txZq7Laz7_4?ecver=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Saw this talk on my phone in bend and he seemed to be talking about a nice thing. A really
good source to learn about grid is [GridByExample](https://gridbyexample.com/) by [Rachel Andrew](https://rachelandrew.co.uk/). Thank you Rachel!

The blog now has a layout defined by three grids the header, content and footer. Inside of
the content container the layout is page specific. In notes it is a simple two-column
structure with a sidenav and a main/article column. The major advantage of using grid is
in the [index content container](/). Which I have not started working on.

-----------------------
### Index container 
1. Get summary of all notes.
2. Create card
  * CSS
  * Read-more button w/ link
3. video-menu should do the same but only make video summary cards.

-----------------------
### Googe draw.io diagrams  
1. See if the html is useful


-----------------------
### Small header in note articles
1. It is nice to see clearly the header for the "blogpost"
2. Barely visible cklickable links to git and hamburger menu? Opacity? Animation?

-----------------------
### Tensorflow.js [TSNE](https://github.com/tensorflow/tfjs-tsne)

-----------------------
### Notes in html
* Common snippets

### Hide/Show Gists 
Have a clickable "link" that shows embedded gist.
Now: Embedded gifs without css tweak.

# Code

<strong>Find all folders in path</strong> 
```js
const dirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory())
```

<strong>Handlebar</strong>

Iterate through object "Dir":
```html
{{#each Dir}}
<li><a class="frontpage-item" href={{this}} >{{@key}}</a> </li>
{{/each}}
```
