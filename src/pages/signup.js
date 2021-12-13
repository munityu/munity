import Link from "next/link"
import nookies, { setCookie } from "nookies"
import { useState } from "react"
import { useRouter } from "next/router"
import toast from "react-hot-toast"

import Application from "../components"
import { Checking } from "../lib/icons/Undraw"
import style from "../styles/app.module.scss"

const Signup = () => {
	const router = useRouter()
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState("")

	const handleChange = (e) => {
		switch (e.target.name) {
			case "name":
				setName(e.target.value)
				break
			case "email":
				setEmail(e.target.value)
				break
			case "password":
				setPassword(e.target.value)
				break
			case "passwordConfirmation":
				setPasswordConfirmation(e.target.value)
				break
		}
	}

	const handleSubmit = () => {
		const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			data: {
				name: name,
				email: email,
				password: password,
				password_confirmation: passwordConfirmation,
			},
			url: `${process.env.API_URL}/auth/register`,
		}
		const promise = axios.post(api.url, api.data, {
			headers: api.headers,
			withCredentials: true,
		})
		toast.promise(promise, {
			loading: "Signing up..",
			success: (response) => {
				setCookie(null, "user", response.data.cookie, {
					maxAge: JSON.parse(response.data.cookie).ttl,
					path: "/",
				})
				router.replace("/calendars")
				return response.data.message
			},
			error: (error) => {
				if (error.response.data.errors) {
					if (error.response.data.errors.name)
						for (
							let i = 0;
							i < error.response.data.errors.name.length;
							i++
						)
							toast.error(error.response.data.errors.name[i])
					if (error.response.data.errors.email)
						for (
							let i = 0;
							i < error.response.data.errors.email.length;
							i++
						)
							toast.error(error.response.data.errors.password[i])
					if (error.response.data.errors.password)
						for (
							let i = 0;
							i < error.response.data.errors.password.length;
							i++
						)
							toast.error(error.response.data.errors.password[i])
				}
				return error.response.data.message
			},
		})
	}

	return (
		<Application title='Sign Up'>
			<div className={style.authBlock}>
				<div className={style.fields}>
					<h1>Welcome to Munity!</h1>
					<span>
						Sign up to gain access to all features of the
						application, create events and subscribe to others.
					</span>
					<form onSubmit={(e) => handleSubmit(e.preventDefault())}>
						<label>
							Your name
							<input
								type='name'
								id='name'
								name='name'
								value={name}
								onChange={handleChange}
								required
							/>
						</label>
						<label>
							Your email
							<input
								type='email'
								id='email'
								name='email'
								value={email}
								onChange={handleChange}
								required
							/>
						</label>
						<label>
							Your password
							<input
								type='password'
								id='password'
								name='password'
								minLength={8}
								value={password}
								onChange={handleChange}
								required
							/>
						</label>
						<label>
							Repeat your password
							<input
								type='password'
								id='passwordConfirmation'
								name='passwordConfirmation'
								value={passwordConfirmation}
								onChange={handleChange}
								required
							/>
						</label>
						<button type='submit'>Sign up</button>
					</form>
					<span>
						Already a member?{" "}
						<Link href='/signin'>
							<a>Sign in!</a>
						</Link>
					</span>
				</div>
				<div className={style.info}>
					<Checking />
					<h4>Why Munity?</h4>
					<span>
						Joins any event of any kind around the world or create
						your own events and invite more people!
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
				destination: "/calendars",
			},
		}

	return { props: {} }
}

export default Signup
