export function getClasses(classes: any[]) {
	return classes
		.filter((element: any) => {
			return element !== null;
		})
		.join(' ');
}
