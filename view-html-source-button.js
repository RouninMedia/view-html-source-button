const viewHTMLSourceButton = document.getElementsByClassName('viewHTMLSource')[0];

const openHTMLSource = () => {

  const HTMLSourceTab = window.open(window.location.href, '_blank');

  let documentDOM = document.documentElement.cloneNode(true);
  let documentDOMBody = documentDOM.getElementsByTagName('body')[0];
  documentDOMBody.removeAttribute('style');
  let viewHTMLSourceButtonHelpers = [...documentDOM.getElementsByClassName('viewHTMLSourceButtonHelper')];
  for (helper of viewHTMLSourceButtonHelpers) {helper.remove();}
  
  let documentMarkup = documentDOM.outerHTML;
  documentMarkup = documentMarkup.replace(/><head>/g, '>\n<head>');
  documentMarkup = documentMarkup.replace(/<\/body><\/html>/g, '</body>\n</html>');
  documentMarkup = documentMarkup.replace(/><script/g, '>\n<script');
  documentMarkup = documentMarkup.replace(/<([^>]+?)\n([^>]+?)>/g, '<$1 $2>');
  documentMarkup = documentMarkup.replace(/<!--\s*\n/g, '<!--\n\n');
  documentMarkup = documentMarkup.split('\n');


  for (let i = 0; i < documentMarkup.length; i++) {

    if (i < (documentMarkup.length - 1)) {

      if ((comment === false) && (documentMarkup[i].substr(0, 4) === '<!--')) {

        comment = true;
      }

      else if ((comment === true) && (documentMarkup[i].indexOf('-->') > -1)) {

        comment = 'last';
      }
    }    
    
    documentMarkup[i] = documentMarkup[i].replace(/\</g, '&lt;');
    documentMarkup[i] = documentMarkup[i].replace(/\"/g, '&quot;');
    documentMarkup[i] = documentMarkup[i].replace(/\>/g, '&gt;');

    documentMarkup[i] = documentMarkup[i].replace(/(&lt;\/?)([\w-]+?)(\s|&gt;)/g, '$1<span class="HTMLSourceElementName">$2</span>$3');
    documentMarkup[i] = documentMarkup[i].replace(/\=&quot;(.+?)&quot;/g, '=&quot;<span class="HTMLSourceAttributeValue">$1</span><b>&quot;</b>');
    documentMarkup[i] = documentMarkup[i].replace(/([\w-]+)\=&quot;/g, '<span class="HTMLSourceAttributeName">$1</span><b>=&quot;</b>');
    documentMarkup[i] = documentMarkup[i].replace(/&lt;!--(.*?)--&gt;/, '<span class="HTMLSourceComment">&lt;!--$1--&gt;</span>');

    if (comment === true) {

      documentMarkup[i] = '<span class="HTMLSourceComment">' + documentMarkup[i] + '</span>';
    }

    else if (comment === 'last') {

      documentMarkup[i] = '<span class="HTMLSourceComment">' + documentMarkup[i] + '</span>';
      comment = false;
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
  HTMLSourceStylesContent += '.HTMLSource {position: absolute; top: 0; left: 0; z-index: 96; width: 100vw; height: 100vh; padding-bottom: 12px; font-family:monospace; color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); box-sizing: border-box; overflow: auto;}';
  HTMLSourceStylesContent += '.HTMLSourceList {list-style-type: none; margin: 8px 0 0; padding-left: 0; counter-reset: line;}';
  HTMLSourceStylesContent += '.HTMLSourceList li {position: relative; display: block; clear: both; width: 100%; font-size: 13px; line-height: 16px; white-space: pre-wrap;}';
  HTMLSourceStylesContent += '.HTMLSourceList li::before {content: counter(line); display: inline-block; float: left; width: ' + lineCounterWidth + 'px; margin-right: 6px; color: rgb(204, 204, 204); text-align: right; font-style: normal; counter-increment: line;}';
  HTMLSourceStylesContent += '.HTMLSourceList li .line {display: inline-block; float: right; width: calc(100%  - ' + lineCounterWidth + 'px - 6px);}';
  HTMLSourceStylesContent += '.HTMLSourceDoctype {color: rgb(70, 130, 180); font-style: italic;}';
  HTMLSourceStylesContent += '.HTMLSourceElementName {color: rgb(128, 0, 128); font-weight: bold;}';
  HTMLSourceStylesContent += '.HTMLSourceAttributeName {font-weight: bold;}';
  HTMLSourceStylesContent += '.HTMLSourceAttributeValue {color: rgb(0, 0, 255);}';
  
  let HTMLSourceScriptContent = '';
  HTMLSourceScriptContent += 'document.body.style.position = "fixed";';

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
  
  HTMLSourceScript.textContent = HTMLSourceScriptContent;
  HTMLSourceScript.classList.add('viewHTMLSourceButtonHelper');
  HTMLSourceTab.addEventListener('DOMContentLoaded', () => HTMLSourceTab.document.body.appendChild(HTMLSourceScript));
  HTMLSourceTab.focus();
};

viewHTMLSourceButton.addEventListener('click', openHTMLSource, false);
