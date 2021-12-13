import Link from "next/link"

import { Logo } from "../../lib/icons/Brand"
import { GitHub, Telegram } from "../../lib/icons/Social"
import style from "../../styles/app.module.scss"
import AccountDropdown from "../Dropdowns/AccountDropdown"

export const Header = ({ user }) => {
	return (
		<div className={style.header}>
			<div className={style.sidelink}>
				<Link href='/'>
					<a className={style.barlink} name='logo'>
						<Logo />
						<label>Munity</label>
					</a>
				</Link>
			</div>
			{user ? (
				<AccountDropdown user={user} />
			) : (
				<div className={style.sidelink} name='signin'>
					<Link href='/signin'>
						<a className={style.barlink}>Sign in</a>
					</Link>
				</div>
			)}
		</div>
	)
}

export const Footer = () => {
	return (
		<div className={style.footer}>
			<div className={style.sideFooter}>
				<Logo />
				<label>Munity</label>
				<a
					href='https://github.com/PAXANDDOS/munity-next'
					target='_blank'
					rel='noreferrer'
					className={style.linkItem}
				>
					<GitHub />
				</a>
				<a
					href='https://t.me/PAXANDDOS'
					target='_blank'
					rel='noreferrer'
					className={style.linkItem}
				>
					<Telegram />
				</a>
				<a
					href='https://t.me/NrTrN'
					target='_blank'
					rel='noreferrer'
					className={style.linkItem}
				>
					<Telegram />
				</a>
			</div>
			<div className={style.sideFooter}>
				Copyright © 2021&nbsp;
				<a
					href='https://paxanddos.github.io/'
					target='_blank'
					rel='noreferrer'
				>
					Paul Litovka
				</a>
				&nbsp;and&nbsp;
				<a
					href='https://github.com/naztar0'
					target='_blank'
					rel='noreferrer'
				>
					Nazar Taran
				</a>
				. All rights reserved.
			</div>
		</div>
	)
}
