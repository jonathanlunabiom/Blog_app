const sendBlog_btn = document.querySelector('.btnpost');


const fetchInfo = async (e) => {
    e.preventDefault();

    const description = document.querySelector('#post').value.trim();
    console.log('description', description)
    const res = await fetch('/dashboard',{
        method: 'POST',
        body: JSON.stringify({description}),
        headers: { 'Content-Type': 'application/json' },
    })
    console.log(res)
    res.ok ? alert('Done!') : alert('Failed to log in')
};

sendBlog_btn.addEventListener('click',fetchInfo)