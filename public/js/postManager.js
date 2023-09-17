const delButton = async (e) => {
  const btnID = e.target.getAttribute("id");
  typeBtn = e.target.innerText;
  if (btnID) {
    if (typeBtn == "delete") {
      const res = await fetch(`/api/post/${btnID}`, {
        method: "DELETE",
      });

      if (res.ok) {
        document.location.reload();
      } else {
        alert("Failed to delete post");
      }
      res.ok ? alert("Post deleted") : alert("Failed to delete post");
    } else {
      document.location.replace(`/edit/${btnID}`);
    }
  }
};

document.querySelector(".mainpageposts").addEventListener("click", delButton);
