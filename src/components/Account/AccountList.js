import style from "../../styles/app.module.scss"
import AccountListObject from "./AccountListObject"

const AccountList = ({ type }) => {
	let title
	switch (type) {
		case "events":
			title = "Your events"
			break
		case "tickets":
			title = "Your tickets"
			break
		case "notifications":
			title = "Your notifications"
			break
	}
	return (
		<div className={style.accountList}>
			<div className={style.accountListHead}>
				<h2>{title}</h2>
			</div>
			<div className={style.accountListBody}>
				<AccountListObject />
				<AccountListObject />
			</div>
		</div>
	)
}

export default AccountList
