class PostComments{constructor(t){this.postId=t,this.postContainer=$(`#post-${t}`),this.newCommentForm=$(`#post-${t}-comments-form`),this.createComment(t);let e=this;$(" .delete-comment-button",this.postContainer).each((function(){e.deleteComment($(this))}))}createComment(t){let e=this;this.newCommentForm.submit((function(n){n.preventDefault();$.ajax({type:"post",url:"/comments/create",data:$(this).serialize(),success:function(n){let o=e.newCommentDom(n.data.comment);$(`#post-comments-${t}`).prepend(o),e.deleteComment($(" .delete-comment-button",o)),new ToggleLike($(" .toggle-like-button",o)),new Noty({theme:"relax",text:"Comment published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})}))}newCommentDom(t){return $(`<li id="comment-${t._id}">\n                      <p>\n                      \x3c!-- deleting the comment   --\x3e\n                          <small>\n                              <a class="delete-comment-button" href="/comments/destroy/${t._id}">X</a>\n                          </small>\n                          \n                          ${t.content}\n                          <br>\n                          <small>\n                              ${t.user.name}\n                          </small>\n\n                        \n                          <small>\n\t\t\t\t\t\t                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${t._id}&type=Comment">\n\t\t\t\t\t\t\t                  0 Likes\n\t\t\t\t\t\t               </a>\n\t\t\t\t                </small>\n                      \n                      </p>    \n\n              </li>`)}deleteComment(t){$(t).click((function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(t){$(`#comment-${t.data.comment_id}`).remove(),new Noty({theme:"relax",text:"Comment Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})}))}}