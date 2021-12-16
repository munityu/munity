import { useState } from "react"
import style from "../../styles/app.module.scss"

const CreateComment = ({ user, event_id }) => {
	const [content, setContent] = useState("")

	const handleSubmit = () => {
		console.log(content)
	}

	return (
		<form
			className={style.createCommentBlock}
			onSubmit={(e) => handleSubmit(e.preventDefault())}
		>
			<textarea
				className={style.eventCreateTextarea}
				value={content}
				onChange={(e) => setContent(e.target.value)}
				required
				placeholder="What a nice event, I'm also coming! Is there any drinks?"
			></textarea>
			<input
				className={style.eventCreateSubmit}
				type='submit'
				value='Comment'
			/>
		</form>
	)
}

export default CreateComment
