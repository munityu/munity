import Link from "next/link"
import nookies, { setCookie } from "nookies"
import { useState } from "react"
import { useRouter } from "next/router"
import toast from "react-hot-toast"

import Application from "../components"
import { Booking } from "../lib/icons/Undraw"
import style from "../styles/app.module.scss"

const Signin = () => {
	const router = useRouter()
	const [name, setName] = useState("")
	const [password, setPassword] = useState("")

	const handleChange = (e) => {
		switch (e.target.name) {
			case "name":
				setName(e.target.value)
				break
			case "password":
				setPassword(e.target.value)
				break
		}
	}

	const handleSubmit = () => {
		const user = {
			name: "PAXANDDOS",
			email: "pashalitovka@gmail.com",
			image: "https://cdn.discordapp.com/attachments/701503404513427466/918933315115950180/unknown.png",
			role: "user",
		}
		setCookie(null, "user", JSON.stringify(user), {
			maxAge: 16000,
			path: "/",
		})
		router.replace("/")
		// const api = {
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		Accept: "application/json",
		// 	},
		// 	data: {
		// 		name: name,
		// 		password: password,
		// 	},
		// 	url: `${process.env.API_URL}/auth/signin`,
		// }
		// const promise = axios.post(api.url, api.data, {
		// 	headers: api.headers,
		// 	withCredentials: true,
		// })
		// toast.promise(promise, {
		// 	loading: "Logging in...",
		// 	success: (response) => {
		// 		setCookie(null, "user", response.data.cookie, {
		// 			maxAge: JSON.parse(response.data.cookie).ttl,
		// 			path: "/",
		// 		})
		// 		router.replace("/calendars")
		// 		return response.data.message
		// 	},
		// 	error: (error) => {
		// 		if (error.response.data.errors) {
		// 			if (error.response.data.errors.name)
		// 				for (
		// 					let i = 0;
		// 					i < error.response.data.errors.name.length;
		// 					i++
		// 				)
		// 					toast.error(error.response.data.errors.name[i])
		// 			if (error.response.data.errors.password)
		// 				for (
		// 					let i = 0;
		// 					i < error.response.data.errors.password.length;
		// 					i++
		// 				)
		// 					toast.error(error.response.data.errors.password[i])
		// 		}
		// 		return error.response.data.message
		// 	},
		// })
	}
	return (
		<Application title='Sign In'>
			<div className={style.authBlock}>
				<div className={style.fields}>
					<h1>Welcome to Munity!</h1>
					<span>
						Sign in to gain access to all features of the
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
							Your password
							<input
								type='password'
								id='password'
								name='password'
								value={password}
								onChange={handleChange}
								required
							/>
						</label>
						<button type='submit'>Sign in</button>
					</form>
					<span>
						Forgot your password?{" "}
						<Link href='/reset-password'>
							<a>Let&apos;s get it back!</a>
						</Link>
					</span>
					<span>
						Not a member yet?{" "}
						<Link href='/signup'>
							<a>Sign up!</a>
						</Link>
					</span>
				</div>
				<div className={style.info}>
					<Booking />
					<h4>We&apos;ve missed you!</h4>
					<span>
						Join any event of any kind around the world or create
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
				destination: "/",
			},
		}

	return { props: {} }
}

export default Signin
