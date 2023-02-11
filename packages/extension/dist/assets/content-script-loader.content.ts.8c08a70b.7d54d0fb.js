(function () {
  'use strict';

  (async () => {
    await import(
      /* @vite-ignore */
      chrome.runtime.getURL("assets/content.ts.8c08a70b.js")
    );
  })().catch(console.error);

})();
