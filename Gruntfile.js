module.exports = function(grunt){
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		sass:{
			compile:{
				files:{
					'app/styles/main.css' : 'app/styles/main.scss'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.registerTask('default',['sass']);
}
