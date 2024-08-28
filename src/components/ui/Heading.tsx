interface IHeading {
	title: string
}

export function Heading({ title }: IHeading) {
	return (
		<h1>{title}</h1>
	)
}