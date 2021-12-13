import { useState } from "react"
import toast from "react-hot-toast"
import nookies from "nookies"
import Link from "next/link"

import Application from "../../components"
import style from "../../styles/app.module.scss"

const ResetPasswordToken = ({ token }) => {
	const [password, setPassword] = useState("")
	const [passwordConfirm, setPasswordConfirm] = useState("")

	const handleSubmit = () => {
		const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			data: {
				password: password,
				password_confirmation: passwordConfirm,
			},
			url: `${process.env.API_URL}/auth/reset-password/${token}`,
		}
		const promise = axios.post(api.url, api.data, {
			headers: api.headers,
		})
		toast.promise(promise, {
			loading: "Updating ...",
			success: (response) => {
				location.replace("/signin")
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
							Enter new password
							<input
								type='password'
								value={password}
								minLength={8}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</label>
						<label>
							Repeat new password
							<input
								type='password'
								value={passwordConfirm}
								minLength={8}
								onChange={(e) =>
									setPasswordConfirm(e.target.value)
								}
								required
							/>
						</label>
						<button type='submit'>Change password</button>
					</form>
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

	return { props: { token: ctx.params.token } }
}

export default ResetPasswordToken
