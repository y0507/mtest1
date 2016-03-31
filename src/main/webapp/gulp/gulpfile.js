// 引入模块插件
var gulp        = require('gulp');
var concat      = require('gulp-concat');       //合并工具
var gutil       = require('gulp-util');
var rename      = require('gulp-rename');       //重命名
var uglify      = require('gulp-uglify');       //压缩js
var minifyCSS   = require('gulp-minify-css');   //压缩css
//var del         = require('del');             //删除
//var jshint      = require("gulp-jshint");     //检查js代码
var jade        = require('gulp-jade');         //jade
var prettify    = require('gulp-html-prettify');
var uglify      = require('gulp-uglify');        //混淆js
var less        = require('gulp-less');          //转换less用
var clean       = require('gulp-clean');         //清理文件
var livereload  = require('gulp-livereload');    //自动刷新页面




// 定义jade源文件,html目标文件路径变量
var jadeFiles =[
    {src:'../views/jade/index.jade',dest:'../app'},
    {src:'../views/jade/**/*.jade',dest:'../app/views/html'}
];

// 定义CSS路径
var cssFiles ={css:'../views/css/*.css',dest:'../app/css',watch:'../views/css/**/*.css'};

// 定义JS第三方库类路径
var jsLibFiles={
    jsLib:['../views/jslib/jquery2.2/jquery.min.js',//要合并的js文件
           '../views/jslib/angular1.5/angular.min.js'
          ],
    name:'base.js',                                // 合并的js重命名为 "base.js"
    js:'../app/js',                                // 合并后输出路径
    min:'../app/js/min',                           // 压缩后输出路径
    watch:'../views/jslib/**/*.js'                 // 监听jslib文件夹下的 任何文件夹 的 任何文件变动
}

// 定义JS路径
var jsFiles={
    ngjs:['../views/ngjs/**/*.js'],// 要合并的js文件
    name:'app.js',                 // 合并的js重命名为 "app.js"
    js:'../app/js',                // 合并后输出路径
    min:'../app/js/min',           // 压缩后输出路径
    watch:'../views/ngjs/**/*.js'  // 监听ngjs文件夹下的 任何文件夹 的 任何文件变动
}


// 启动默认任务
gulp.task('default',['copy-css','concat-js-lib','concat-js-my','jade','watch']);

/*gulp.task('default',['clean'],function(){
    gulp.start('concat-js','mini-js','mini-css');
});*/




//-------JS 操作--------------------------------------

//合并第三方js库类任务
gulp.task('concat-js-lib',function(){
    return gulp.src(jsLibFiles.jsLib)     // 要合并的js文件
        .pipe(concat(jsLibFiles.name))    // 合并后重命名为 "app.js"
        .pipe(gulp.dest(jsLibFiles.js));  // 合并后输出
});

//合并自写js任务
gulp.task('concat-js-my',function(){
    return gulp.src(jsFiles.ngjs)         // 要合并的js文件
        .pipe(concat(jsFiles.name))       // 合并后重命名为 "app.js"
        .pipe(gulp.dest(jsFiles.js));     // 合并后输出
});


//合并并压缩自写js任务
gulp.task('concat-min-js',function(){
    return gulp.src(jsFiles.ngjs)            // 要合并的js文件
        .pipe(concat(jsFiles.name))          // 合并后重命名为 "app.js"
        .pipe(gulp.dest(jsFiles.js))         // 合并后输出
        .pipe(uglify())                      // 使用uglify进行压缩
        .pipe(rename({suffix: '.min'}))      // 重命名app.min.js
        .pipe(gulp.dest(jsFiles.min));       // 压缩后输出路径
});






//压缩js任务
//gulp.task('mini-js',function(){
//    return gulp.src('app/js/all.js')         // 要压缩的js文件
//        .pipe(uglify())                      // 使用uglify进行压缩
//        .pipe(rename({suffix: '.min'}))      // 重命名all.min.js
//        .pipe(gulp.dest('app/js/min'));      // 输出路径
//});

//合并并压缩js任务
//gulp.task('concat-min-jsLib',function(){
//    return gulp.src(jsLibFiles.jsLib)        // 要合并的js文件
//        .pipe(concat(jsLibFiles.name))       // 合并后重命名为 "app.js"
//        .pipe(gulp.dest(jsLibFiles.js))      // 合并后输出
//        .pipe(uglify())                      // 使用uglify进行压缩
//        .pipe(rename({suffix: '.min'}))      // 重命名app.min.js
//        .pipe(gulp.dest(jsLibFiles.min));    // 压缩后输出路径
//});

//js检查
//gulp.task('jsLint',function(){
//    return gulp.src('master/js/**/*.js')
//        .pipe(jshint())
//        .pipe(jshint.reporter());              // 输出检查结果
//});



//------------CSS 操作---------------------------------

//拷贝CSS
gulp.task('copy-css',function(){
    return gulp.src(cssFiles.css)         // 要压缩的css文件
        .pipe(rename({dirname:''}))
        .pipe(gulp.dest(cssFiles.dest));  // 输出路径
});

// 压缩 CSS
//gulp.task('mini-css',function(){
//    return gulp.src('app/css/test.css')         // 要压缩的css文件
//        .pipe(minifyCSS())                      // 进行压缩
//        .pipe(rename({suffix: '.min'}))         // 重命名test.min.js
//        .pipe(gulp.dest('app/css/min'));        // 输出路径
//});

// 执行压缩前，先删除文件夹里的内容
//gulp.task('clean', function() {
//    return del(['app/js/min', 'app/css/min']);
//});


//------------jade 转 html 操作---------------------------------------

gulp.task('jade', function(){
    jadeFiles.forEach(function(jf){
        if(!jf.src || !jf.dest) return;
        gulp.src(jf.src)
            .pipe(jade({petty: true}))
            .on("error", handleError)
            .pipe(prettify({            // 格式化
                indent_char: ' ',
                indent_size: 3,
                unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u']
            }))
            .pipe(gulp.dest(jf.dest));
    });
});



function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}



//--------------监听文件变动-----------------------------------------------

gulp.task('watch',function(){

    //监听文件变动，执行任务
    gulp.watch('../views/jade/**/*.jade',['jade']);
    gulp.watch(cssFiles.watch,['copy-css']);
    gulp.watch(jsFiles.watch,['concat-js-my']);
    gulp.watch(jsLibFiles.watch,['concat-js-lib']);

    livereload.listen();
    //app文件夹下的 任何文件夹 的 任何文件 有变动就刷新
    gulp.watch(['../app/**/*.*']).on('change',function(file){
        livereload.changed(file.path);
        //console.log(file.type);
        //console.log(file.path);
    })
});


