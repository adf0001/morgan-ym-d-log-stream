
// morgan-ym-d-log-stream @ npm
// A stream tool, mainly a plugin for morgan, to save log to file dir/YYYY/M/YYYY-MM-DD.log.

var fs = require('fs');
var path = require('path');

/*
.createLogStream( logDir, options )

create a log stream

	options
		consoleMax
			max length of console output string
*/
module.exports = function (logDir, options) {
	var logDate = -1;
	var logStream = null;
	var logFilePath = null;
	var consoleMax = options?.consoleMax;

	return {
		/*
		write a string
			.write(str)
		*/
		write: (str) => {
			if (consoleMax > 0 && str?.length > consoleMax) {
				var sEnd = str.match(/\s+$/)[0];	//may have line break
				process.stdout.write(str.slice(0, consoleMax - 3 - (sEnd?.length || 0)) + "..." + sEnd);
			}
			else process.stdout.write(str);

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
