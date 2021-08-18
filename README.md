# View HTML Source Button

![HTML5](https://img.shields.io/badge/HTML-HTML%205-orange)
![ES2015+](https://img.shields.io/badge/JS-ES2015%2B-brightgreen)
<!-- ![CSS3](https://img.shields.io/badge/CSS-CSS%203-yellow) -->
<!-- ![SVG2](https://img.shields.io/badge/SVG-SVG%202-green) -->
<!-- ![PHP7](https://img.shields.io/badge/PHP-PHP%207-purple) -->
<!-- ![JSON](https://img.shields.io/badge/JSON-JSON-red) -->

The **View HTML Source Button** is a button which may be added to any web page.

When clicked, the button shows the `HTML Source` of that web page.

<!--

LOOK AT Table of Contents and consider integrating list below:

Motivation. A statement of what problem the component solves.
Features. A description of how the component solves that problem.
Installation. A link to where to get the component, and where to put it.
Configuration. A description of how to use each attribute exposed to the consumer.
Example. A Hello World walk-through showing how to get the component working on an HTML page.
Customization. A list of all the CSS variables that can be overridden.
Events. A list of the events emitted or consumed by the component and their place in the life-cycle.

Source: Comment by Joe Honton at https://lea.verou.me/2020/09/the-failed-promise-of-web-components/

-->

## Table of Contents
1. [Introduction](#1-introducing-view-html-source-button)
2. [Usage](#2-how-to-use-view-html-source-button)
3. [Working Example](#3-working-example-of-view-html-source-button)
4. [Frequently Asked Questions (FAQ)](#4-frequently-asked-questions-faq)
5. [Install](#5-installing-view-html-source-button)
6. [Configure](#6-configuring-view-html-source-button)
7. [Team and Contributors](#7-team-and-contributors-behind-view-html-source-button)
8. [Related Projects by Rounin Media](#8-related-projects-by-rounin-media)
9. [Unrelated but Similar Projects by Other Developers](#9-unrelated-but-similar-projects-by-other-developers)
10. [Code Appendix](#10-code-appendix)
    10.1. [Built With](#101-built-with)
    10.2. [HTML](#102-html)
    10.3. [Javascript](#103-javascript)

<!--- . <a href="#description">Description</a> -->
<!--- . <a href="#demo">Demo</a> // with an animated gif? -->
<!--- . <a href="#installation-and-usage">Installation and Usage</a> -->
<!--- . <a href="#features">Features</a> -->
<!--- . <a href="#configuration">Configuration</a> -->
<!--- . <a href="#api"/>API</a> -->
<!--- . <a href="#code-of-conduct"/>Code of Conduct</a> -->
<!--- . <a href="#filing-issues"/>Filing Issues</a> -->
<!--- . <a href="#how-to-contribute">How to Contribute</a> -->
<!--- . <a href="#team"/>Team</a> -->
<!--- . <a href="#contributors"/>Contributors</a> -->
<!--- . <a href="#sources"/>Sources</a> -->
<!--- . <a href="#releases"/>Releases</a> -->
<!--- . <a href="#security"/>Security</a> -->
<!--- . <a href="#semantic-versioning-policy"/>Semantic Versioning Policy</a> -->
<!--- . <a href="#license"/>License</a> -->
<!--- . <a href="#financial-contributors"/>Financial Contributors</a> -->
<!--- . <a href="#used-by"/>Used By</a> -->
<!--- . <a href="#guides"/>Guides</a> -->
<!--- . <a href="#resources"/>Resources</a> -->
<!--- . <a href="#guides-and-resources"/>Guides and Resources</a> -->
<!--- . <a href="#sponsors"/>Sponsors</a> -->
<!--- . <a href="#technology-sponsors"/>Technology Sponsors</a> -->
<!--- . <a href="#project-status"/>Project Status</a> -->
<!--- . <a href="#acknowledgements"/>Acknowledgements</a> -->
<!--- . <a href="#contact"/>Contact</a> -->
<!--- . <a href="#contact-info"/>Contact Info</a> -->
<!--- . <a href="#contact-information"/>Contact Information</a> -->
<!--- . <a href="#discussion"/>Discussion</a> -->
<!--- . <a href="#technologies"/>Technologies</a> -->
<!--- . <a href="#to-do-list"/>To Do List</a> -->
<!--- . <a href="#bug-feature-request"/>Bug / Feature Request</a> -->
<!--- . <a href="#development"/>Development</a> -->


## 1. Introducing View HTML Source Button

## 2. How to use View HTML Source Button

## 3. Working Example of View HTML Source Button

See an <a href="view-html-source-button.html" target="_blank">example page</a>, showcasing a **View HTML Source Button**.

## 4. Frequently Asked Questions (FAQ)

## 5. Installing View HTML Source Button

## 6. Configuring View HTML Source Button

There are no settings and nothing to configure. **View HTML Source Button** works out of the box.

## 7. Team and Contributors behind View HTML Source Button

## 8. Related Projects by Rounin Media

## 9. Unrelated but Similar Projects by Other Developers

 The projects below are unrelated to **Rounin Media's** *View HTML Source Button* but may also interest the reader:
 
 - ["View Source" Tool](https://neatnik.net/view-source/) by **neatnik.net**
 - ["Make a View Source Button"](https://css-tricks.com/make-a-view-source-button/) by **CSS Tricks**
 - [View Source Button](https://github.com/CSS-Tricks/View-Source-Button/blob/master/index.html) **(CSS Tricks on GitHub)**


## 10. Code Appendix

### 10.1 Built With

**View HTML Source Button** is built using:

 - [`HTML5`](#102-html)
 - [`Javascript ES2015+`](#103-javascript)

### 10.2 <a id="html" />HTML
``` html
<button type="button" class="viewHTMLSource">View HTML Source</button>
```

### 10.3 <a id="javascript" />Javascript
``` javascript
const viewHTMLSourceButton = document.getElementsByClassName('viewHTMLSource')[0];

const openHTMLSource = () => {

  const HTMLSourceTab = window.open(window.location.href, '_blank');
  let documentDOM = document.documentElement.cloneNode(true);
  let documentDOMBody = documentDOM.getElementsByTagName('body')[0];
  documentDOMBody.removeAttribute('class');
  let viewHTMLSourceButtonHelpers = [...documentDOM.getElementsByClassName('viewHTMLSourceButtonHelper')];
  for (helper of viewHTMLSourceButtonHelpers) {helper.remove()};
  let ashivaModuleSections = [...documentDOM.querySelectorAll('da3sh-module')];
  let ashivaModuleElement;
  for (let ashivaModuleSection of ashivaModuleSections) {ashivaModuleElement = document.createElement('ashivaModule'); ashivaModuleSection.parentNode.insertBefore(ashivaModuleElement, ashivaModuleSection); ashivaModuleElement.appendChild(ashivaModuleSection)};
  let documentMarkup = documentDOM.outerHTML;
  documentMarkup = documentMarkup.replace(/><head>/g, '>\n<head>');
  documentMarkup = documentMarkup.replace(/<ashivamodule>/g, '\n<ashivamodule>');
  documentMarkup = documentMarkup.replace(/<\/ashivamodule>/g, '</ashivamodule>\n');
  let bodyElement = documentMarkup.match(/<body[^>]*?>/).toString().replace(/\s+/g, '\n');
  documentMarkup = documentMarkup.replace(/<body[^>]+>/, bodyElement);
  documentMarkup = documentMarkup.replace(/<\/body><\/html>/g, '</body>\n</html>');
  documentMarkup = documentMarkup.replace(/><script/g, '>\n<script');
  documentMarkup = documentMarkup.replace(/<([^>]+?)\n([^>]+?)>/g, '<$1 $2>');
  documentMarkup = documentMarkup.replace(/<!--\s*\n/g, '<!--\n\n');
  documentMarkup = documentMarkup.split('\n');
  let comment = false;
  let ashivaModule = false;

  for (let i = 0; i < documentMarkup.length; i++) {

    if (i < (documentMarkup.length - 1)) {

      if ((comment === false) && (documentMarkup[i].substr(0, 4) === '<!--')) {

        comment = true;
      }

      else if ((comment === true) && (documentMarkup[i].indexOf('-->') > -1)) {

        comment = 'last';
      }

      if (documentMarkup[i].indexOf('</ashivamodule>') > -1) {

        ashivaModule = 'last';
      }

      else if ((ashivaModule === false) && (documentMarkup[i].indexOf('<ashivamodule>') > -1)) {

        ashivaModule = true;
      }
    }

    documentMarkup[i] = documentMarkup[i].replace(/</g, '&lt;');
    documentMarkup[i] = documentMarkup[i].replace(/\"/g, '&quot;');
    documentMarkup[i] = documentMarkup[i].replace(/>/g, '&gt;');
    documentMarkup[i] = documentMarkup[i].replace(/(&lt;\/?)([\w-]+?)(\s|&gt;)/g, '$1<span class="HTMLSourceElementName">$2</span>$3');
    documentMarkup[i] = documentMarkup[i].replace(/\=&quot;(.+?)&quot;/g, '=&quot;<span class="HTMLSourceAttributeValue">$1</span><b>&quot;</b>');
    documentMarkup[i] = documentMarkup[i].replace(/([\w-]+)\=&quot;/g, '<span class="HTMLSourceAttributeName">$1</span><b>=&quot;</b>');
    documentMarkup[i] = documentMarkup[i].replace(/&lt;!--(.*?)--&gt;/, '<span class="HTMLSourceComment">&lt;!--$1--&gt;</span>');
    documentMarkup[i] = documentMarkup[i].replace(/⚠️\s(.+)/, '⚠️ <span class="HTMLSourceAshivaConsole">$1</span>');
    documentMarkup[i] = documentMarkup[i].replace(/&lt;<span class="HTMLSourceElementName">ashivamodule<\/span>&gt;/, '');
    documentMarkup[i] = documentMarkup[i].replace(/&lt;\/<span class="HTMLSourceElementName">ashivamodule<\/span>&gt;/, '');

    if (comment === true) {

      documentMarkup[i] = '<span class="HTMLSourceComment">' + documentMarkup[i] + '</span>';
    }

    else if (comment === 'last') {

      documentMarkup[i] = '<span class="HTMLSourceComment">' + documentMarkup[i] + '</span>';
      comment = false;
    }

    if (ashivaModule === true) {

      documentMarkup[i] = '<div class="HTMLSourceAshivaModule">' + documentMarkup[i] + '</div>';
    }

    else if (ashivaModule === 'last') {

      documentMarkup[i] = '<div class="HTMLSourceAshivaModule">' + documentMarkup[i] + '</div>';
      ashivaModule = false;
    }
  }

  let lineCounterWidth;
  switch (true) {case (documentMarkup.length > 9999) : lineCounterWidth = '45'; break; case (documentMarkup.length > 999) : lineCounterWidth = '36'; break; case (documentMarkup.length > 99) : lineCounterWidth = '27'; break; case (documentMarkup.length > 9) : lineCounterWidth = '18'; break; default : lineCounterWidth = '9';};
  let documentDoctype = '';
  documentDoctype += '<li class="HTMLSourceDoctype"><div class="line">';
  documentDoctype += '&lt;!DOCTYPE html&gt;';
  documentDoctype += '</div></li>';
  let HTMLSource = '';
  HTMLSource += '<ol class="HTMLSourceList">\n';
  HTMLSource += documentDoctype + '\n';
  HTMLSource += '<li><div class="line">';
  HTMLSource += documentMarkup.join('</div></li>\n<li><div class="line">');
  HTMLSource += '</div></li>\n';
  HTMLSource += '</ol>';
  let HTMLSourceStylesContent = '';
  HTMLSourceStylesContent += '.HTMLSource {position: fixed; top: 0; left: 0; z-index: 96; width: 100vw; height: 100vh; padding-bottom: 12px; font-family:monospace; color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); box-sizing: border-box; overflow: auto;}';
  HTMLSourceStylesContent += '.HTMLSourceList {list-style-type: none; margin: 8px 0 0; padding-left: 0; counter-reset: line;}';
  HTMLSourceStylesContent += '.HTMLSourceList li {position: relative; display: block; clear: both; width: 100%; font-size: 13px; line-height: 16px; white-space: pre-wrap;}';
  HTMLSourceStylesContent += '.HTMLSourceList li::before {content: counter(line); display: inline-block; float: left; width: ' + lineCounterWidth + 'px; margin-right: 6px; color: rgb(204, 204, 204); text-align: right; font-style: normal; counter-increment: line;}';
  HTMLSourceStylesContent += '.HTMLSourceList li .line {display: inline-block; float: right; width: calc(100% - ' + lineCounterWidth + 'px - 6px);}';
  HTMLSourceStylesContent += '.HTMLSourceDoctype {color: rgb(70, 130, 180); font-style: italic;}';
  HTMLSourceStylesContent += '.HTMLSourceElementName {color: rgb(128, 0, 128); font-weight: bold;}';
  HTMLSourceStylesContent += '.HTMLSourceAttributeName {font-weight: bold;}';
  HTMLSourceStylesContent += '.HTMLSourceAttributeValue {color: rgb(0, 0, 255);}';
  HTMLSourceStylesContent += '.HTMLSourceComment, .HTMLSourceComment [class] {color: rgb(0, 127, 0); font-weight: normal; font-style: italic;}';
  HTMLSourceStylesContent += '.HTMLSourceAshivaModule {color: rgb(255, 125, 0); background-color: rgb(255, 239, 198);}';
  HTMLSourceStylesContent += '.HTMLSourceAshivaModule::after {content: \'\';}';
  HTMLSourceStylesContent += '.HTMLSourceAshivaModule .HTMLSourceElementName {color: rgb(187, 18, 0);}';
  HTMLSourceStylesContent += '.HTMLSourceAshivaModule .HTMLSourceAttributeValue {color: rgb(212, 57, 0);}';
  HTMLSourceStylesContent += '.HTMLSourceAshivaModule .HTMLSourceComment, .HTMLSourceAshivaModule .HTMLSourceComment [class] {color: rgb(208, 149, 127);}';
  HTMLSourceStylesContent += '.HTMLSourceComment .HTMLSourceAshivaConsole, .HTMLSourceAshivaModule .HTMLSourceComment .HTMLSourceAshivaConsole {color: rgb(255, 0, 0);}';
  let HTMLSourceScriptContent = '';
  HTMLSourceScriptContent += 'document.body.classList.add("ashiva-control-pad-activated");';
  HTMLSourceScriptContent += 'let HTMLSourceStyles = document.createElement("style");';
  HTMLSourceScriptContent += 'HTMLSourceStyles.classList.add("viewHTMLSourceButtonHelper");';
  HTMLSourceScriptContent += 'HTMLSourceStyles.textContent = `' + HTMLSourceStylesContent + '`;';
  HTMLSourceScriptContent += 'document.head.appendChild(HTMLSourceStyles);';
  HTMLSourceScriptContent += 'let HTMLSourceMarkup = document.createElement("div");';
  HTMLSourceScriptContent += 'HTMLSourceMarkup.classList.add("HTMLSource");';
  HTMLSourceScriptContent += 'HTMLSourceMarkup.classList.add("viewHTMLSourceButtonHelper");';
  HTMLSourceScriptContent += 'HTMLSourceMarkup.innerHTML = `' + HTMLSource + '`;';
  HTMLSourceScriptContent += 'document.body.appendChild(HTMLSourceMarkup);';
  let HTMLSourceScript = document.createElement('script');
  HTMLSourceScript.classList.add('viewHTMLSourceButtonHelper');
  HTMLSourceScript.textContent = HTMLSourceScriptContent;
  HTMLSourceTab.addEventListener('DOMContentLoaded', () => HTMLSourceTab.document.body.appendChild(HTMLSourceScript));
  HTMLSourceTab.focus();
};

viewHTMLSourceButton.addEventListener('click', openHTMLSource, false);
```

**Developer:** <a href="https://github.com/RouninMedia/view-html-source-button" target="_blank">Alan Lansdowne</a> at <a href="https://github.com/RouninMedia" target="_blank">Rounin Media</a>

