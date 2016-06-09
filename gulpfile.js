var gulp = require('gulp'),
    childProcess = require('child_process'),
    electron = require('electron-prebuilt'),
    packager = require('electron-packager');

var build_options = {
    "arch" : "ia32",
    "dir" : "./app",
    "platform" : "win32",
    "asar" : true,
    "out" : "./build"
};

// Run the application
gulp.task('run', function () {
    childProcess.spawn(electron, ['./app']);
});

// Build the application
gulp.task('build', function(){
    packager(build_options,function done_callback(err, appPaths){
        if(err){
            console.log(err);
        } else {
            console.log('Path to your build application : '+appPaths);
        }
    });
});