export function copy<T, K>(obj: T, kwargs?: K): T & K {
	if (kwargs) {
		return {
			...JSON.parse(JSON.stringify(obj)),
			...kwargs
		};
	}
	return JSON.parse(JSON.stringify(obj));
}
