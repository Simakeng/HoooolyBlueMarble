/**
 * @file loader.js
 * @author Simakeng (simakeng@outlook.com)
 * @brief the loader for everything
 * @version 0.1
 * @date 2023-03-24
 *
 */

/**
 * @brief convert the url according to the environment
 * @param url the url to convert
 */
function convert_url_according_to_env(url) {
  if (url.startsWith("http")) {
    return url;
  }
  if (url.startsWith("/")) {
    return url;
  }
  return `/${url}`;
}

// script list
const HOOOLY_BLUE_MARBLE_SCRIPTS = [
  "scripts/utils/gl-matrix-min.js",
  "scripts/core/render-shader.js",
  "scripts/core/render-skybox.js",
  "scripts/core/render-target.js",
  "scripts/core/render.js",
  "scripts/utils/utils.js",
  "scripts/core/init.js",
];

const HOOOLY_BLUE_MARBLE_INIT = "hbm_init";

// load the scripts
this.document.addEventListener("DOMContentLoaded", function () {
  let target_scripts = HOOOLY_BLUE_MARBLE_SCRIPTS;
  let init_fn = new Function("return " + HOOOLY_BLUE_MARBLE_INIT + "();");
  parallelLoadScripts(target_scripts, init_fn);
});

function parallelLoadScripts(scripts, callback) {
  if (typeof scripts !== "object") {
    var scripts = [scripts];
  }
  var s = [];
  var loaded = 0;
  for (var i = 0; i < scripts.length; i++) {
    s[i] = document.createElement("script");
    s[i].setAttribute("type", "text/javascript");

    s[i].onload = s[i].onreadystatechange = function (e) {

      if (!0 || this.readyState === "loaded" || this.readyState === "complete") {
        loaded++;
        this.onload = this.onreadystatechange = null;
        // remove the script tag after successful loading
        document.head.removeChild(this);
        // if all scripts are loaded, call the callback function
        if (loaded === scripts.length && typeof callback === "function")
          callback();
      }
    };

    s[i].setAttribute("src", scripts[i]);
    document.head.appendChild(s[i]);
  }
}
