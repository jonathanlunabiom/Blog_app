document.querySelector(".btn").addEventListener("click", async (e) => {
  newDescription = document.querySelector("#post").value;
  id = e.target.getAttribute("id");
  const res = await fetch(`/api/post/${id}`, {
    method: "PUT",
    body: JSON.stringify({ newDescription }),
    headers: { "Content-Type": "application/json" },
  });
  res.ok ? document.location.replace("/") : alert("Failed to edit post");
});
