export function dateFromNow(second: number = 0) {
	return new Date(new Date().getTime() + second * 1000);
}