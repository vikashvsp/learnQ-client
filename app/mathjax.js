// mathjax.js
'use client'
export default function MathJax() {
     window.MathJax = {
          tex: {
               inlineMath: [['$', '$'], ['\\(', '\\)']]
          },
          svg: {
               fontCache: 'global'
          }
     };
     return (() => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
          script.async = true;
          document.head.appendChild(script);
     })();
}
