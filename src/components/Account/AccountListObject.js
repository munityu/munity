import style from "../../styles/app.module.scss"
import { Format, Theme, People, Comment } from "../../lib/icons/Misc"

const AccountListObject = () => {
	return (
		<div className={style.accountListObject}>
			<h2 className={style.accountListDate}>
				17 Jun
				<br />
				13:00
			</h2>
			<div className={style.accountListInfo}>
				<h2 className={style.accountListTitle}>Best party ever</h2>
				<div className={style.accountListSub}>
					<span
						className={style.accountListSubObject}
						title='Event theme'
					>
						<Theme />
						Music
					</span>
					<span
						className={style.accountListSubObject}
						title='Event format'
					>
						<Format />
						Concert
					</span>
					<span
						className={style.accountListSubObject}
						title='Also coming'
					>
						<People />
						69
					</span>
					<span
						className={style.accountListSubObject}
						title='Comments'
					>
						<Comment />
						420
					</span>
				</div>
			</div>
		</div>
	)
}

export default AccountListObject
