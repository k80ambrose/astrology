async function grabdata () {
    const response = await window.fetch('/scrape')
    const data = await response.json()
    console.log(data)
    document.getElementById('marsdegree').textContent=data[4].degree
    document.getElementById('marssign').textContent=data[4].sign
    document.getElementById('jupiterdegree').textContent=data[5].degree
    document.getElementById('jupitersign').textContent=data[5].sign
}
window.addEventListener("load", grabdata)