# NGKit Styleguide

We used [UIKit](http://getuikit.com/) as the basis for our framework.

* Declarative style
* The use of data-* attributes for JavaScript integration
* The organization and structure of the JavaScript framework

## Installing for Development

1. Make sure that you have node.js installed. If you are on a Mac and have [Homebrew](http://brew.sh/) installed: `brew install node`
2. Switch to the same directory as the `package.json` file.
3. Type `npm install`

## Installing in your Project

1. Install using bower: `bower install git@github.com:natgeo/ngkit.git`


## Project Structure

<table class="ui table">
  <thead>
    <tr>
      <th>Folder</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>/dist</td>
      <td>Final compiled CSS, JS and fonts</td>
    </tr>
    <tr>
      <td>/docs</td>
      <td>Documentation</td>
    </tr>
    <tr>
      <td>/src</td>
      <td>Source files</td>
    </tr>
    <tr>
      <td>/vendor</td>
      <td>Additional files required for generating the styleguide</td>
    </tr>
  </tbody>
</table>


## HTML Page Markup

You need to add the compiled and preferably minified NGkit CSS and JavaScript to the header of your HTML5 document. jQuery is required as well. And that's it!

<div class="example">

  <div class="html ui top attached segment">
    <div class="ui top attached label">
      Example <img data-content="Copy code" class="copy-icon" src="public/copy.svg" height="12" width="12" alt="copy">
    </div>
  <pre class="attached"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;&lt;/title&gt;
        &lt;link rel="stylesheet" href="ngkit.min.css" /&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;script src="jquery.js"&gt;&lt;/script&gt;
        &lt;script src="ngkit.min.js"&gt;&lt;/script&gt;
    &lt;/body&gt;
&lt;/html&gt;</code></pre>
  </div>
</div>

Once you have finished implementing UIkit into your webpage, take a look at the UIkit components and get an overview of what UIkit is offering.

