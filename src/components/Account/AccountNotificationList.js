import style from "../../styles/app.module.scss"
import AccountNotificationObject from "./AccountNotificationObject"

const AccountList = ({ notifications }) => {
	return (
		<div className={style.accountList}>
			<div className={style.accountListHead}>
				<h2>Your notifications</h2>
			</div>
			<div className={style.accountListBody}>
				{notifications.map((n) => {
					return (
						<AccountNotificationObject
							key={n.id}
							notification={n}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default AccountList
