import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import style from "../../styles/app.module.scss"

const CreateComment = ({ user, event_id, setComments }) => {
	const [content, setContent] = useState("")

	const handleSubmit = () => {
		const api = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: user.token,
			},
			url: `${process.env.API_URL}/events/${event_id}/comments`,
		}
		toast.promise(
			axios.post(
				api.url,
				{ content },
				{
					headers: api.headers,
				}
			),
			{
				loading: "Commenting ...",
				success: (response) => {
					setComments((prevState) => [
						...prevState,
						Object.assign(response.data, {
							user: {
								name: user.name,
								image: user.image,
							},
						}),
					])
					return "Comment created!"
				},
				error: (error) => {
					if (error.response.data.errors) {
						if (error.response.data.errors.content)
							for (
								let i = 0;
								i < error.response.data.errors.content.length;
								i++
							)
								toast.error(
									error.response.data.errors.content[i]
								)
					}
					return error.response.data.message
				},
			}
		)
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
