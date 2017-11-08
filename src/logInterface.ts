export interface logInterface{
	info(primaryMsg: string, moreDetails: any[]) :void
	debug(primaryMsg: string, moreDetails: any[]) :void
	warn(primaryMsg: string, moreDetails: any[]) :void
	error(primaryMsg: string, moreDetails: any[]) :void
}
