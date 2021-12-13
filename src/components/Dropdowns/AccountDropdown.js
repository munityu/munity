import { destroyCookie } from "nookies"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import axios from "axios"

import style from "../../styles/app.module.scss"

const AccountDropdown = ({ user }) => {
	const router = useRouter()
	const [toggle, setToggle] = useState(false)

	const logout = () => {
		destroyCookie(null, "user", { path: "/" })
		router.replace("/")
		// const api = {
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		Accept: "application/json",
		// 		Authorization: user.token,
		// 	},
		// 	url: `${process.env.API_URL}/auth/signout`,
		// }
		// axios
		// 	.post(api.url, null, {
		// 		headers: api.headers,
		// 		withCredentials: true,
		// 	})
		// 	.then(() => {
		// 		destroyCookie(null, "user", { path: "/" })
		// 		router.replace("/")
		// 		return "Goodbye!"
		// 	})
	}

	return (
		<>
			<button
				onClick={() => setToggle(!toggle)}
				className={style.sidelink}
				name='signin'
			>
				<a className={style.barlink}>{user.name}</a>
			</button>
			{toggle && (
				<div className={style.dropdownBarOptions}>
					<Link href='/account' passHref>
						<a className={style.dropdownBarOption}>Account</a>
					</Link>
					<Link href={`/user/${user.name}`}>
						<a className={style.dropdownBarOption}>Public page</a>
					</Link>
					<button
						className={style.dropdownBarOption}
						name='danger'
						onClick={() => logout()}
					>
						Logout
					</button>
				</div>
			)}
		</>
	)
}

export default AccountDropdown
