import Head from "next/head"
import Header from "../components/Base"
import style from "../styles/app.module.scss"

const Application = ({ children, user, title }) => {
	return (
		<>
			<Head>
				<title>{title} &#8739; Munity</title>
				<meta
					name='viewport'
					content='initial-scale=1.0, width=device-width'
				/>
			</Head>
			<div className={style.app}>
				<Header user={user} />
				<main>{children}</main>
			</div>
		</>
	)
}

export default Application
