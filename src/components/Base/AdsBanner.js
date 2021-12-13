import { Mello } from "../../lib/icons/Undraw"
import style from "../../styles/app.module.scss"

const AdsBanner = () => {
	return (
		<div className={style.ads}>
			<Mello />
			<h1>Join any event around the world or create yours!</h1>
		</div>
	)
}

export default AdsBanner
