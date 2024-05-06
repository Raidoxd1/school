package main

import "strconv"

func createLoggedInPage() string {
	var alldata []Post
	alldata = allData()

	resp := ""
	resp += "<div class='login'><h2><button onclick='logout()' class='blog-post_cta'>Logout</button><br>"
	resp += "</h2></div>"
	for i := 0; i < len(alldata); i++ {
		resp += "<div class='blog-post'><div class='boxes'><div class='blog-post_creator'><span>Created by: "
		resp += alldata[i].User
		resp += "</span><span>"
		resp += alldata[i].Categories
		resp += "</span><span>"
		resp += strconv.Itoa(alldata[i].Likes)
		resp += " LIKES</span><span>"
		resp += strconv.Itoa(alldata[i].Dislikes)
		resp += "DISLIKES</span></div></div><div class='blog-post_info'><h1 class='blog-post_title'>"
		resp += alldata[i].Title
		resp += "</h1><h1 class='blog-post_text'>"
		resp += alldata[i].Body
		resp += "</h1><div class='comment'>Comments:</div>"
		for j := 0; j < len(alldata[i].Comments); j++ {
			resp += "<h2 class='blog-post_comment'>"
			resp += alldata[i].Comments[j].Opinion
			resp += "<div class='comment_like'>LIKES "
			resp += strconv.Itoa(alldata[i].Comments[j].Likes)
			resp += " DISLIKES "
			resp += strconv.Itoa(alldata[i].Comments[j].Dislikes)
			resp += "</div></h2>"
		}
		resp += "</div></div>"
	}
	return resp
}
