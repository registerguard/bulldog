# Changelog

## v1.0.0

#### February 26, 2013

* Been a few changes; lots of CSS tweaks.
* Removed `1.0.0` folder from root and into `dist` folder.

#### February 22, 2013

* Changed name of `build/dev/` to `build/files/`.
* Added icons to `build/files/icon/`.
* Moved respond.js files into `build/files/util/respond/`.

#### February 21, 2013

* Ditched `dev` folder.
* Changed `src` to `dev`.
* Converted CSS to LESS.
* Added `watch` task.
* Added `LESS` task.
* Updated HTML to reflect above changes.

#### February 20, 2013

* `Gruntfile.js`:
	1. Updated "uglify" scripts.
	1. Added [respond.js](https://github.com/scottjehl/Respond) scripts to the mix.
	1. Added `util` folder to the `copy` task.
	1. Passing just the path via the context option of preprocess.
	1. Added `matchMedia.js` to JS.
	1. Changed `html5shiv.js` to `html5shiv-printshiv.js` (the latter aids IE printing and includes everything in the former).
* Added respond.js files (cross domain setup included).
	* Updated template to account for these new files.
	* Markup for this only shows on production template/view.
* Ad code now shows on dev template/view.
* Re-named `headutils.js` to `preflight.js`.
* Re-arranged markup a bit.
* Added `matchMedia.js` to the JS.
* Replaced preprocess multiple vars for one `path` var.

#### February 19, 2013

* Updated this file.
* Tweaked `.gitignore`:
	* Added `dev` to ignore list, and then removed it as `dev` will just contain an `index.html` file that might be useful to preview on the live server.
* Finalized `Gruntfile.js` workflow.
* Added grunt-prepprocess and grunt-env.
* Removed links to `.git` files in `package.json` and moved tasks from `devDependencies` to `dependencies`.
* Removed `src.html` and moved `index.html` into `tmpl` folder.
	* `index.html` is now a template used to generate a `dev` and `prod` version of `index.html`.
* A bunch of other minor changes.

#### February 18, 2013

* Removed test build.
* Added `README.md` to build folder.
* Updated `index.html` and `src.html` to include `ad_manager` bits.

#### January 4, 2013

* Repository created on GitHub.

---

## vX.X.X

#### Mmmmm [D]D, YYYY

* ...

---