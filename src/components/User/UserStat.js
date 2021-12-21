import { Theme, Time } from "../../lib/icons/Misc"
import styles from "../../styles/app.module.scss"

const UserStat = ({ title, content }) => {
	return (
		<div className={styles.userBannerDataStat}>
			<h3 className={styles.userBannerDataStatTitle}>{title}</h3>
			<div>
				{title === "Member for" && <Time />}
				{title === "Total events" && <Theme />}
				<span className={styles.userBannerDataStatContent}>
					{content}
				</span>
			</div>
		</div>
	)
}

export default UserStat
