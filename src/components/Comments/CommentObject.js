import Image from "next/image"
import style from "../../styles/app.module.scss"

const CommentObject = ({ comment }) => {
	return (
		<div key={comment.id} className={style.eventComment}>
			<div className={style.eventCommentUser}>
				<Image
					src={comment.user.image}
					alt='avatarPreview'
					width={70}
					height={70}
					layout='fixed'
					quality={45}
					objectFit='cover'
					priority
				/>
				<h3>{comment.user.name}</h3>
			</div>
			<span className={style.eventCommentContent}>{comment.content}</span>
		</div>
	)
}

export default CommentObject
