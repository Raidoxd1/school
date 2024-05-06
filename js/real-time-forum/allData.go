package main

func allData() []Post {
	AllPost = nil

	// checks URL for error

	rows, _ := database.Query("SELECT postID, title, body, user, categories FROM post ORDER BY postID desc")
	var postID int
	var user string
	var title string
	var body string
	var categories string
	var like int
	var dislike int
	var commentlike int
	var commentdislike int

	for rows.Next() {
		rows.Scan(&postID, &title, &body, &user, &categories)
		var post Post
		var comment Comment
		post.Categories = categories
		post.User = user
		post.Body = body
		post.Title = title
		post.PostID = postID
		likes, _ := database.Query("SELECT COUNT (*) FROM likes WHERE postID = ?", (postID))
		for likes.Next() {
			likes.Scan(&like)
			post.Likes = like
		}
		likes.Close()
		dislikes, _ := database.Query("SELECT COUNT (*) FROM dislikes WHERE postID = ?", (postID))
		for dislikes.Next() {
			dislikes.Scan(&dislike)
			post.Dislikes = dislike
		}
		dislikes.Close()
		comments, _ := database.Query("SELECT commentID, postID, comment FROM comments WHERE postID = ?", (postID))
		var commented int
		var opinion string
		var postComment int
		for comments.Next() {
			comments.Scan(&commented, &postComment, &opinion)
			comment.CommentID = commented
			comment.PostID = postComment
			comment.Opinion = opinion
			commentlikes, _ := database.Query("SELECT COUNT (*) FROM commentlikes WHERE postID = ?", (commented))
			for commentlikes.Next() {
				commentlikes.Scan(&commentlike)
				comment.Likes = commentlike
			}
			commentlikes.Close()
			commentdislikes, _ := database.Query("SELECT COUNT (*) FROM commentdislikes WHERE postID = ?", (commented))
			for commentdislikes.Next() {
				commentdislikes.Scan(&commentdislike)
				comment.Dislikes = commentdislike
			}
			commentdislikes.Close()
			post.Comments = append(post.Comments, comment)
		}
		comments.Close()
		AllPost = append(AllPost, post)

	}
	rows.Close()

	return AllPost

}
