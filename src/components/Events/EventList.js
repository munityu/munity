import { useState } from "react"
import AsyncSelect from "react-select/async"
import makeAnimated from "react-select/animated"

import style from "../../styles/app.module.scss"
import EventListObject from "./EventListObject"

const EventList = () => {
	const animated = makeAnimated()
	const [categories, setCategories] = useState([])
	return (
		<div className={style.listBlock}>
			<div className={style.filtersBlock}>
				<AsyncSelect
					id={"categories"}
					components={animated}
					value={categories}
					onChange={(categories) =>
						handleCategoriesChange(categories)
					}
					placeholder='Type something..'
					loadOptions={(data, callback) =>
						loadOptions(data, callback)
					}
					theme={(theme) => ({
						...theme,
						colors: {
							primary25: "#988af2",
							primary: "#7c6aef",
							neutral0: "#f2f0fe",
							neutral90: "white",
							neutral80: "rgba(24, 24, 26, 0.8)",
							neutral60: "#7c6aef",
							neutral50: "rgba(24, 24, 26, 0.5)",
							neutral40: "#7c6aef",
							neutral30: "rgba(24, 24, 26, 0.6)",
							neutral20: "rgba(24, 24, 26, 0.3)",
							danger: "#ea3c53",
							dangerLight: "rgba(234, 60, 83, 0.2)",
							neutral10: "rgba(24, 24, 26, 0.1)",
						},
					})}
				/>
			</div>
			<div className={style.eventList}>
				<h2 className={style.eventListHeading}>Availaible events</h2>
				<EventListObject />
				<EventListObject />
				<EventListObject />
			</div>
		</div>
	)
}

export default EventList
