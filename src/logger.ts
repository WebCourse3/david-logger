import { logInterface } from './logInterface';
import { logColors } from './logColors';
import { configInterface } from './configInterface';
import { logLevels } from './logLevels';
let fs = require('fs');

class logger implements logInterface{
	name:string;
	configuration:configInterface;
	path:string;
	constructor(name:string, configuration:configInterface){
		this.name = name;
		this.configuration = configuration;
		this.path = "c:/Users/Jbt/Desktop/david-logger/test.txt";
	}

	public cofigure(configuration:configInterface) :void {
		this.configuration = configuration;
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
		if (this.configuration.logLevel){
			msg = msgLevel + ": " + msg;
		}

		if (this.configuration.console) {
			if (this.configuration.colors) {
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
				moreDetails.forEach(x=> msg += " " + x.toString())
			}

			this.logToFile(msg);
		}
	}

	private logToFile(msg:string) :void {
		fs.appendFile(this.path, msg + '\r\n', (err) => {
			if (err) throw err;
		});
	}
}

let myLogger:logger = new logger("david", {console:true, file:false, colors:true , logLevel:false});
myLogger.info("This is some info");
myLogger.debug("Im debugging here!", ["some", "params"]);
myLogger.warn("Im warning you!", [1, 2]);
myLogger.cofigure({console:true, file:true, colors:true , logLevel:true});
myLogger.error("An error has occurred at file:", [__filename]);