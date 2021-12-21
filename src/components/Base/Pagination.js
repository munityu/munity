import { useRouter } from "next/router"
import { Arrow } from "../../lib/icons/Misc"
import style from "../../styles/app.module.scss"

const Pagination = ({ wrapper }) => {
	const router = useRouter()

	const handlePagination = (name) => {
		router.query.page ? null : (router.query.page = 1)
		name === "next" ? router.query.page++ : router.query.page--

		let queryString = "?"
		for (const param in router.query)
			queryString += `&${param}=${router.query[param]}`

		router.push(router.basePath + queryString)
	}

	const lowest =
		wrapper.current_page > 1
			? (wrapper.current_page - 1) * wrapper.per_page
			: 1
	const highest = wrapper.current_page * wrapper.per_page

	return (
		<div className={style.pagination}>
			<span className={style.onPage}>
				Showing {lowest} &ndash; {highest}
			</span>
			<div className={style.navigationBox}>
				<button
					name='prev'
					disabled={wrapper.current_page === 1}
					onClick={(e) => handlePagination(e.currentTarget.name)}
					className={style.navigationBtn}
				>
					<Arrow />
				</button>
				<span>{wrapper.current_page}</span>
				<button
					name='next'
					disabled={wrapper.current_page === wrapper.last_page}
					onClick={(e) => handlePagination(e.currentTarget.name)}
					className={style.navigationBtn}
				>
					<Arrow />
				</button>
			</div>
		</div>
	)
}

export default Pagination
