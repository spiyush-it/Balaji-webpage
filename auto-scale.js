/* ================================================================
   auto-scale.js — Balaji Hitech Website
   
   KAAM KYA KARTA HAI:
   Visitor 125% zoom use kare ya 150%, website HAMESHA
   125% jaisi dikhegi. Visitor ko kuch karne ki zaroorat nahi.

   LAGAO KAISE:
   Har HTML page ki <head> mein, styles.css ke baad:
   <script src="auto-scale.js"></script>

   SUBFOLDER MEIN HAI PAGE?  →  ../auto-scale.js
   ================================================================ */

(function () {
  'use strict';

  /*
    DESIGN_WIDTH = Jis effective viewport width par aapne page design kiya.
    
    Aapka setup: 1920px screen + 125% Windows scale = 1536px effective
    Toh DESIGN_WIDTH = 1536
    
    150% zoom par: 1920 / 1.2 = ~1280px effective viewport
    Script tab  1280/1536 = 0.833  zoom apply karegi → page wapas 1536px jaisa dikhega
  */
  var DESIGN_WIDTH = 1536;

  /*
    MOBILE_BREAKPOINT = Isse chhoti screens par script kuch nahi karegi.
    Wahan responsive CSS khud sambhal lega (mobile layout).
  */
  var MOBILE_BREAKPOINT = 820;

  /* MIN_SCALE = Kabhi bhi isse chhota zoom mat karo */
  var MIN_SCALE = 0.6;

  /* ── Firefox detect ── */
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  /* ── Main function ── */
  function applyScale() {
    var vw = window.innerWidth;

    /* Mobile/tablet: kuch nahi karo */
    if (vw <= MOBILE_BREAKPOINT) {
      reset();
      return;
    }

    /* Viewport design width se chhoti hai? Scale karo */
    if (vw < DESIGN_WIDTH) {
      var scale = Math.max(MIN_SCALE, vw / DESIGN_WIDTH);

      if (!isFirefox) {
        /* Chrome, Edge, Safari, Opera — CSS zoom best hai:
           position:sticky aur position:fixed dono theek kaam karte hain */
        document.documentElement.style.zoom = scale;
        document.documentElement.style.transform = '';
        document.documentElement.style.width = '';
      } else {
        /* Firefox: CSS zoom support nahi — transform use karo */
        document.documentElement.style.zoom = '';
        document.documentElement.style.transformOrigin = 'top left';
        document.documentElement.style.transform = 'scale(' + scale + ')';
        document.documentElement.style.width = Math.ceil(100 / scale) + 'vw';
      }
    } else {
      /* Viewport kaafi bada — koi scaling nahi */
      reset();
    }
  }

  function reset() {
    var h = document.documentElement;
    h.style.zoom = '';
    h.style.transform = '';
    h.style.transformOrigin = '';
    h.style.width = '';
  }

  /* Pehli baar turant chalao (page load hone se pehle, FOUC nahi aayega) */
  applyScale();

  /* Window resize par dobara calculate karo */
  var t;
  window.addEventListener('resize', function () {
    clearTimeout(t);
    t = setTimeout(applyScale, 40);
  });

})();
