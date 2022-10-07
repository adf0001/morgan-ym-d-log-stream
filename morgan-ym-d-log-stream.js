
// morgan-ym-d-log-stream @ npm
// A stream tool, mainly a plugin for morgan, to save log to file dir/YYYY/M/YYYY-MM-DD.log.

var fs = require('fs');
var path = require('path');

/*
create a log stream
createLogStream( logDir )
*/
module.exports = function (logDir) {
	var logDate = -1;
	var logStream = null;
	var logFilePath = null;

	return {
		/*
		write a string
			.write(str)
		*/
		write: (str) => {
			process.stdout.write(str);

			var dtNow = new Date();
			if (dtNow.getDate() !== logDate) {
				if (logStream) {
					logStream.close();
					logStream = null;
				}

				var y = "" + dtNow.getFullYear();
				var m = ("0" + (dtNow.getMonth() + 1)).slice(-2);
				var d = ("0" + dtNow.getDate()).slice(-2);

				var dir = path.join(logDir, y, m);
				if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

				logFilePath = path.join(dir, y + "-" + m + "-" + d + ".log");

				logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

				logDate = dtNow.getDate();
			}
			logStream.write(str);
		},

		/*
		get current log file path
			.currentFilePath()
		*/
		currentFilePath: () => logFilePath,
	}
}
