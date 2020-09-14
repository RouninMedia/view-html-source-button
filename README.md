# View HTML Source Button
A button which may be added to any web page and, when clicked, shows the HTML Source of that web page.

## Table of Contents
1. Installation and Usage of View HTML Source Button
2. Configuration of View HTML Source Button
3. Working Example of View HTML Source Button
4. Frequently Asked Questions (FAQ) on View HTML Source Button
5. Full Code of View HTML Source Button
5.1 HTML for View HTML Source Button
5.2 Javascript for View HTML Source Button
6. Team behind View HTML Source Button
<!--- . Code of Conduct -->
<!--- . Filing Issues -->
<!--- . Releases -->
<!--- . Semantic Versioning Policy -->
<!--- . License -->
<!--- . Sponsors -->
<!--- . Technology Sponsors -->

## 1. Installation and Usage of View HTML Source Button

## 2. Configuration of View HTML Source Button

## 3. Working Example of View HTML Source Button

<a href="view-html-source-button.html" target="_blank">View HTML Source Button</a>

## 4. Frequently Asked Questions (FAQ) on View HTML Source Button

## 5. Full Code of View HTML Source Button

### 5.1 HTML for View HTML Source Button
```
<button type="button" class="viewHTMLSource">View HTML Source</button>
```

### 5.2 Javascript for View HTML Source Button
```
const viewHTMLSourceButton = document.getElementsByClassName('viewHTMLSource')[0];

const openHTMLSource = () => {

  const HTMLSourceTab = window.open(window.location.href, '_blank');

  let documentDOM = document.documentElement.cloneNode(true);
  let documentDOMBody = documentDOM.getElementsByTagName('body')[0];
  documentDOMBody.removeAttribute('style');
  let viewHTMLSourceButtonHelpers = [...documentDOM.getElementsByClassName('viewHTMLSourceButtonHelper')];
  for (helper of viewHTMLSourceButtonHelpers) {helper.remove();}

  let ashivaModuleSections = [...documentDOM.querySelectorAll('[data-ashiva-module]')];
  let ashivaModuleElement;
  for (let ashivaModuleSection of ashivaModuleSections) {

    ashivaModuleElement = document.createElement('ashivaModule');
    ashivaModuleSection.parentNode.insertBefore(ashivaModuleElement, ashivaModuleSection);
    ashivaModuleElement.appendChild(ashivaModuleSection);
  }

  let documentMarkup = documentDOM.outerHTML;
  documentMarkup = documentMarkup.replace(/><head>/g, '>\n<head>');
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

      if ((ashivaModule === false) && (documentMarkup[i].indexOf('<ashivamodule>') > -1)) {

        ashivaModule = true;
      }

      else if ((ashivaModule === true) && (documentMarkup[i].indexOf('</ashivamodule>') > -1)) {

        ashivaModule = 'last';
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

  switch (true) {

    case (documentMarkup.length > 9999) : lineCounterWidth = '45'; break;
    case (documentMarkup.length > 999) : lineCounterWidth = '36'; break;
    case (documentMarkup.length > 99) : lineCounterWidth = '27'; break;
    case (documentMarkup.length > 9) : lineCounterWidth = '18'; break;
    default : lineCounterWidth = '9';
  }

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
  HTMLSourceStylesContent += 'body {margin: 0;}';
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

## 6. Team behind View HTML Source Button
