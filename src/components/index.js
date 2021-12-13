import Head from "next/head"
import { Toaster } from "react-hot-toast"
import { Header, Footer } from "../components/Base"
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
				<Footer />
			</div>
			<Toaster
				position='bottom-center'
				reverseOrder={false}
				toastOptions={{
					style: {
						borderRadius: "8px",
						backgroundColor: "white",
						padding: "10px",
					},
					duration: 2000,
					success: {
						iconTheme: {
							primary: "#7c6aef",
							secondary: "#FFF",
						},
					},
					error: { duration: 4000 },
				}}
			/>
		</>
	)
}

export default Application
