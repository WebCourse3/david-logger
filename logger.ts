import WriteStream = NodeJS.WriteStream;

var fs = require('fs');

interface logInterface{
	info(primaryMsg: string, moreDetails: any[]) :void
	debug(primaryMsg: string, moreDetails: any[]) :void
	warn(primaryMsg: string, moreDetails: any[]) :void
	error(primaryMsg: string, moreDetails: any[]) :void
}

enum logLevels {
	debug = "debug",
	info = "info",
	warn = "warn",
	error = "error"
}

enum logColors{
	"info" = '\x1b[32m%s\x1b[0m',
	"warn" = '\x1b[31m%s\x1b[0m',
	"error" = '\x1b[33m%s\x1b[0m',
	"debug" = '\x1b[30m%s\x1b[0m',
	"default" = '\x1b[30m%s\x1b[0m'
}

interface configInterface {
	console: Boolean,
	file: Boolean,
	colors: Boolean,
	logLevel: Boolean
}

class logger implements logInterface{
	name:string;
	writeStream:WriteStream;
	configuration:configInterface;
	constructor(name:string, configuration:configInterface){
		this.name = name;
		this.configuration = configuration
		if (configuration.file)
		{
			this.writeStream = fs.createWriteStream("c:/Users/Jbt/Desktop/david-logger/test.txt");
		}
	}

	public info(msg:string, moreDetails?: any[]) :void {
		this.logMessage(logLevels.info, msg, moreDetails);
	}

	public debug(msg:string, moreDetails?: any[]) :void {
		this.logMessage(logLevels.debug, msg, moreDetails);
	}

	public warn(msg:string, moreDetails?: any[]) :void {
		this.logMessage(logLevels.warn, msg, moreDetails);
	}

	public error(msg:string, moreDetails?: any[]) :void {
		this.logMessage(logLevels.error, msg, moreDetails);
	}

	private logMessage(msgLevel:logLevels, msg:string, moreDetails?: any[]):void {
		if (this.configuration.console) {
			if (this.configuration.logLevel) {
				if (moreDetails) {
					console.log(logColors[msgLevel] ,msg, moreDetails);
				}
				else {
					console.log(logColors[msgLevel] ,msg);
				}
			} else {
				if (moreDetails) {
					console.log(msg, moreDetails);
				}
				else {
					console.log(msg);
				}
			}
		}

		if (this.configuration.file) {
			if (moreDetails)
			{
				fs.appendFile("c:/Users/Jbt/Desktop/david-logger/test.txt", msg + moreDetails + '\r\n', (err) => {
					if (err) throw err;
				});
			} else {
				fs.appendFile("c:/Users/Jbt/Desktop/david-logger/test.txt", msg + '\r\n', (err) => {
					if (err) throw err;
				});
			}
		}
	}
}

let myLogger:logger = new logger("david", {console:true, file:true, colors:true , logLevel:true});
myLogger.info("INFO:");
myLogger.debug("DEBUG:", ["cool", "ddd"]);
myLogger.warn("WARN:", ["cool", "ddd"]);
myLogger.error("ERROR:", ["cool", "ddd"]);