const gulp = require("gulp");
const rimraf = require("gulp-rimraf");
const runSequence = require("run-sequence");
const spriter = require("gulp-css-spriter");

const SRC_PATH = "./src";
const DEST_PATH = "./assets";

gulp.task("default", [ "build" ]);

gulp.task("clean", () => {
	return gulp.src(DEST_PATH)
		.pipe(rimraf());
});

gulp.task("build", [ "clean" ], (cb) => {
	runSequence(
		"build-html",
		"build-css-sprite",
		cb
	);
});

gulp.task("build-html", () => {
	return gulp.src(`${SRC_PATH}/index.html`)
        .pipe(gulp.dest("./assets/"));
});

gulp.task("build-css-sprite", () => {
    return gulp.src(`${SRC_PATH}/res/css/*.css`)
        .pipe(spriter({
            "spriteSheet": "./assets/res/images/spritesheet.png",
            "pathToSpriteSheetFromCSS": "../images/spritesheet.png"
        }))
        .pipe(gulp.dest("./assets/res/css"));
});