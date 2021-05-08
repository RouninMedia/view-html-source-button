const viewHTMLSourceButton = document.getElementsByClassName('viewHTMLSource')[0];

const openHTMLSource = () => {

  const HTMLSourceTab = window.open(window.location.href, '_blank');

  let documentDOM = document.documentElement.cloneNode(true);
  let documentDOMBody = documentDOM.getElementsByTagName('body')[0];
  documentDOMBody.removeAttribute('style');
  let viewHTMLSourceButtonHelpers = [...documentDOM.getElementsByClassName('viewHTMLSourceButtonHelper')];
  for (helper of viewHTMLSourceButtonHelpers) {helper.remove();}

  let da3shModuleSections = [...documentDOM.querySelectorAll('da3sh-module')];
  let da3shModuleElement;
  for (let da3shModuleSection of da3shModuleSections) {

    da3shModuleElement = document.createElement('da3shModule');
    da3shModuleSection.parentNode.insertBefore(da3shModuleElement, da3shModuleSection);
    da3shModuleElement.appendChild(da3shModuleSection);
  }

  let documentMarkup = documentDOM.outerHTML;
  documentMarkup = documentMarkup.replace(/><head>/g, '>\n<head>');
  documentMarkup = documentMarkup.replace(/<da3sh-module>/g, '\n<da3sh-module>');
  documentMarkup = documentMarkup.replace(/<\/da3sh-module>/g, '</da3sh-module>\n');
  documentMarkup = documentMarkup.replace(/<\/body><\/html>/g, '</body>\n</html>');
  documentMarkup = documentMarkup.replace(/><script/g, '>\n<script');
  documentMarkup = documentMarkup.replace(/<([^>]+?)\n([^>]+?)>/g, '<$1 $2>');
  documentMarkup = documentMarkup.replace(/<!--\s*\n/g, '<!--\n\n');
  documentMarkup = documentMarkup.split('\n');

  let comment = false;
  let da3shModule = false;

  for (let i = 0; i < documentMarkup.length; i++) {

    if (i < (documentMarkup.length - 1)) {

      if ((comment === false) && (documentMarkup[i].substr(0, 4) === '<!--')) {

        comment = true;
      }

      else if ((comment === true) && (documentMarkup[i].indexOf('-->') > -1)) {

        comment = 'last';
      }

      if (documentMarkup[i].indexOf('</da3sh-module>') > -1) {

        da3shModule = 'last';
      }

      else if ((da3shModule === false) && (documentMarkup[i].indexOf('<da3sh-module>') > -1)) {

        da3shModule = true;
      }
    }

    documentMarkup[i] = documentMarkup[i].replace(/</g, '&lt;');
    documentMarkup[i] = documentMarkup[i].replace(/\"/g, '&quot;');
    documentMarkup[i] = documentMarkup[i].replace(/>/g, '&gt;');

    documentMarkup[i] = documentMarkup[i].replace(/(&lt;\/?)([\w-]+?)(\s|&gt;)/g, '$1<span class="HTMLSourceElementName">$2</span>$3');
    documentMarkup[i] = documentMarkup[i].replace(/\=&quot;(.+?)&quot;/g, '=&quot;<span class="HTMLSourceAttributeValue">$1</span><b>&quot;</b>');
    documentMarkup[i] = documentMarkup[i].replace(/([\w-]+)\=&quot;/g, '<span class="HTMLSourceAttributeName">$1</span><b>=&quot;</b>');
    documentMarkup[i] = documentMarkup[i].replace(/&lt;!--(.*?)--&gt;/, '<span class="HTMLSourceComment">&lt;!--$1--&gt;</span>');

    documentMarkup[i] = documentMarkup[i].replace(/⚠️\s(.+)/, '⚠️ <span class="HTMLSourceDa3shConsole">$1</span>');
    documentMarkup[i] = documentMarkup[i].replace(/&lt;<span class="HTMLSourceElementName">da3sh-module<\/span>&gt;/, '');
    documentMarkup[i] = documentMarkup[i].replace(/&lt;\/<span class="HTMLSourceElementName">da3sh-module<\/span>&gt;/, '');

    if (comment === true) {

      documentMarkup[i] = '<span class="HTMLSourceComment">' + documentMarkup[i] + '</span>';
    }

    else if (comment === 'last') {

      documentMarkup[i] = '<span class="HTMLSourceComment">' + documentMarkup[i] + '</span>';
      comment = false;
    }

    if (da3shModule === true) {

      documentMarkup[i] = '<div class="HTMLSourceDa3shModule">' + documentMarkup[i] + '</div>';
    }

    else if (da3shModule === 'last') {

      documentMarkup[i] = '<div class="HTMLSourceDa3shModule">' + documentMarkup[i] + '</div>';
      da3shModule = false;
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
  HTMLSourceStylesContent += '.HTMLSourceDa3shModule {color: rgb(255, 125, 0); background-color: rgb(255, 239, 198);}';
  HTMLSourceStylesContent += '.HTMLSourceDa3shModule::after {content: \'\';}';
  HTMLSourceStylesContent += '.HTMLSourceDa3shModule .HTMLSourceElementName {color: rgb(187, 18, 0);}';
  HTMLSourceStylesContent += '.HTMLSourceDa3shModule .HTMLSourceAttributeValue {color: rgb(212, 57, 0);}';
  HTMLSourceStylesContent += '.HTMLSourceDa3shModule .HTMLSourceComment, .HTMLSourceDa3shModule .HTMLSourceComment [class] {color: rgb(208, 149, 127);}';
  HTMLSourceStylesContent += '.HTMLSourceComment .HTMLSourceDa3shConsole, .HTMLSourceDa3shModule .HTMLSourceComment .HTMLSourceDa3shConsole {color: rgb(255, 0, 0);}';
  
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
