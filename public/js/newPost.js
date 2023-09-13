const sendBlog_btn = document.querySelector('.btnpost');


const fetchInfo = async (e) => {
    e.preventDefault();

    const description = document.querySelector('#post').value.trim();

    const res = await fetch('api/post',{
        method: 'POST',
        body: JSON.stringify({description}),
        headers: { 'Content-Type': 'application/json' },
    })
    res.ok ? alert('Done!') : alert('Failed to log in')
};

sendBlog_btn.addEventListener('click',fetchInfo)