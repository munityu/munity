import Link from "next/link"

import { Logo } from "../../lib/icons/Brand"
import style from "../../styles/app.module.scss"

const Header = ({ user }) => {
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
			<div className={style.sidelink} name='signin'>
				<Link href='/signin'>
					<a className={style.barlink}>Sign in</a>
				</Link>
			</div>
		</div>
	)
}

export default Header
