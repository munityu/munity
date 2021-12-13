import { useState } from "react"
import toast from "react-hot-toast"
import nookies from "nookies"
import Link from "next/link"

import Application from "../../components"
import style from "../../styles/app.module.scss"

const ResetPassword = () => {
	const [email, setEmail] = useState("")

	const handleSubmit = () => {
		const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			data: {
				email: email,
			},
			url: `${process.env.API_URL}/auth/reset-password`,
		}
		const promise = axios.post(api.url, api.data, {
			headers: api.headers,
		})
		toast.promise(promise, {
			loading: "Sending reset link...",
			success: (response) => {
				return response.data.message
			},
			error: (error) => {
				if (error.response.data.errors) {
					if (error.response.data.errors.email)
						for (
							let i = 0;
							i < error.response.data.errors.email.length;
							i++
						)
							toast.error(error.response.data.errors.email[i])
				}
				return error.response.data.message
			},
		})
	}

	return (
		<Application title='Sign Up'>
			<div className={style.authBlock}>
				<div className={style.fields}>
					<h1>We&apos;ll get your password back!</h1>
					<span></span>
					<form onSubmit={(e) => handleSubmit(e.preventDefault())}>
						<label>
							Your email
							<input
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</label>
						<button type='submit'>Send email</button>
					</form>
					<span>
						Everything&apos;s fine?{" "}
						<Link href='/signin'>
							<a>Go back.</a>
						</Link>
					</span>
				</div>
			</div>
		</Application>
	)
}

export async function getServerSideProps(ctx) {
	if (!!nookies.get(ctx).user)
		return {
			redirect: {
				permanent: false,
				destination: "/signin",
			},
		}

	return { props: {} }
}

export default ResetPassword
