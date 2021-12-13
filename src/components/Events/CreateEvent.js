import Link from "next/link"
import { Plus } from "../../lib/icons/Misc"

import style from "../../styles/app.module.scss"

const CreateEvent = ({ user }) => {
	return (
		<Link href={user ? `/user/${user.name}/events/create` : "/signin"}>
			<a className={style.create} title='Create'>
				<Plus />
				<span>
					Create your <br />
					own event
				</span>
			</a>
		</Link>
	)
}

export default CreateEvent
