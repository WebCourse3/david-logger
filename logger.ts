interface logInterface{
	info(primaryMsg: string, moreDetails: any[]) :void
	debug(primaryMsg: string, moreDetails: any[]) :void
	warn(primaryMsg: string, moreDetails: any[]) :void
	error(primaryMsg: string, moreDetails: any[]) :void
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
	configuration:configInterface;
	constructor(name:string, configuration:configInterface){
		this.name = name;
		this.configuration = configuration
	}

	public info(msg:string, moreDetails?: any[]) :void {
		this.logMessage("info", msg, moreDetails);
	}

	public debug(msg:string, moreDetails?: any[]) :void {
		this.logMessage("debug", msg, moreDetails);
	}

	public warn(msg:string, moreDetails?: any[]) :void {
		this.logMessage("warn", msg, moreDetails);
	}

	public error(msg:string, moreDetails?: any[]) :void {
		this.logMessage("error", msg, moreDetails);
	}

	private logMessage(msgLevel:"debug" | "info" | "warn" | "error", msg:string, moreDetails?: any[]):void {
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
		} else if (this.configuration.file){

		}
	}
}

let myLogger:logger = new logger("davids", {console:true, file:false, colors:true , logLevel:true});
myLogger.info("INFO:");
myLogger.debug("DEBUG:", ["cool", "ddd"]);
myLogger.warn("WARN:", ["cool", "ddd"]);
myLogger.error("ERROR:", ["cool", "ddd"]);