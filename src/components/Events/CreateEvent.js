import Link from "next/link"
import { Lock, Event, People } from "../../lib/icons/Misc"
import style from "../../styles/app.module.scss"

const CreateEvent = ({ user }) => {
	return (
		<>
			{user ? (
				<>
					{user.role === "company" ? (
						<Link href={`/user/${user.name}/events/create`}>
							<a className={style.create} title='Create an event'>
								<Event />
								<span>
									Create your <br />
									own event
								</span>
							</a>
						</Link>
					) : (
						<Link href={`/account`}>
							<a
								className={style.create}
								title='Create a company'
							>
								<People />
								<span>
									You must be a company <br />
									to create event
								</span>
							</a>
						</Link>
					)}
				</>
			) : (
				<Link href={`/signin`}>
					<a className={style.create} title='Sign in'>
						<Lock />
						<span>
							Sign in <br />
							to create event
						</span>
					</a>
				</Link>
			)}
		</>
	)
}

export default CreateEvent
