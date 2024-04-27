// src/components/Footer.tsx
interface IHeader {
	title: string
}

export function Header({ title }: IHeader) {
	return (
    <header>
      <h2>{title}</h2>
    </header>
	)
}
