/**
 * Tiny little tool that will slap a ".dev" flag/marker on the page
 * so you can keep track of whether you are running on a localhost/dev server
 * without always having to check the address bar.
 */
var devcheck = (function() {
    "use strict";

    // internal module object reference
    var my = {};

    /**
     * Main execution method. performs test for domain matches and then display a little 'icon'
     * on the page if appropriate.
     * 
     * @param options    object literal consisting of:
     *        placement  tl (topleft), tr (topright) [default], bl(bottomleft), br(bottomright)
     *        offset     [default: 20px]
     *        styles     object literal of style info to apply to marker div. 
     *                   Note: must use JS style names for CSS attributes, not CSS ones
     *        domains    an array of domains (or regex patterns) to test against
     */
    my.test = function(options) {
        options = options || {};
        var placement = options.placement || "tr";
        var offset = options.offset || "20px";
        var domains = options.domains || ["localhost", "\.dev", "\.xip\.io"];
        var hostmatch = false;

        // load the user defined styles, ensuring system defaults at a minimum
        var styles = options.styles || {};
        styles.backgroundColor = styles.backgroundColor || "rgba(255,0,0,0.75)";
        styles.border = styles.border || "3px solid yellow";
        styles.color = styles.color || "white";
        styles.padding = styles.padding || "5px";
        styles.borderRadius = styles.borderRadius || "50px";

        for (var i=0; i<domains.length; i++) {
            var re = new RegExp(domains[i]);
            if (re.test(document.location.hostname)) {
                hostmatch = true;
                break;
            }
        }

        if (hostmatch) {

            var devdiv = document.createElement("div");
            devdiv.id="devcheck";
            devdiv.appendChild(document.createTextNode(".dev"));

            // apply user supplied styles first so as not to affect 'mandatory' styling
            for (var stylename in styles) {
                if (styles.hasOwnProperty(stylename)) {
                    devdiv.style[stylename] = styles[stylename];
                }
            }

            // position the dev
            devdiv.style.position = "fixed";
            if (placement.charAt(0) === "t") {
                devdiv.style.top = offset;
            }
            if (placement.charAt(0) === "b") {
                devdiv.style.bottom = offset;
            }
            if (placement.charAt(1) === "r") {
                devdiv.style.right = offset;
            }
            if (placement.charAt(1) ==="l") {
                devdiv.style.left = offset;
            }

            // add onclick to hide the element if we want
            devdiv.style.cursor = "pointer";
            devdiv.onclick = function() { devdiv.style.display = "none"; };

            // make it appear
            document.body.appendChild(devdiv);
        }
    };

    // return module reference
    return my;
})();