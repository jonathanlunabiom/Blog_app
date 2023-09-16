const delButton = async (e) => {
  btnID = e.target.getAttribute("id");
  if (btnID) {
    const res = await fetch(`/api/post/${btnID}`, {
      method: "DELETE",
    });

    if (res.ok) {
      document.location.reload();
    } else {
      alert("Failed to delete post");
    }
    res.ok ? alert("Post deleted") : alert("Failed to delete post");
  }
};

document.querySelector(".mainpageposts").addEventListener("click", delButton);
