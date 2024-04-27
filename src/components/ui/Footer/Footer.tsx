// src/components/Footer.tsx
interface IFooter {
	title: string
}

export function Footer({ title }: IFooter) {
	return (
    <footer>
      <h4>{title}</h4>
      <p>© {new Date().getFullYear()} Footer Date now</p>
    </footer>
	)
}
