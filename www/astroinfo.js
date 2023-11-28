async function grabdata () {
    const response = await window.fetch('/scrape')
    const data = await response.json()
    console.log(data)
    document.getElementById('sundeg').textContent=data[0].degree
    document.getElementById('sunsign').textContent=data[0].sign
    document.getElementById('moondeg').textContent=data[1].degree
    document.getElementById('moonsign').textContent=data[1].sign
    document.getElementById('mercdeg').textContent=data[2].degree
    document.getElementById('mercsign').textContent=data[2].sign
    document.getElementById('venusdeg').textContent=data[3].degree
    document.getElementById('venussign').textContent=data[3].sign
    document.getElementById('marsdeg').textContent=data[4].degree
    document.getElementById('marssign').textContent=data[4].sign
    document.getElementById('jupiterdeg').textContent=data[5].degree
    document.getElementById('jupitersign').textContent=data[5].sign
    document.getElementById('saturndeg').textContent=data[6].degree
    document.getElementById('saturnsign').textContent=data[6].sign
    document.getElementById('uranusdeg').textContent=data[7].degree
    document.getElementById('uranussign').textContent=data[7].sign
    document.getElementById('neptunedeg').textContent=data[8].degree
    document.getElementById('neptunesign').textContent=data[8].sign
    document.getElementById('plutodeg').textContent=data[9].degree
    document.getElementById('plutosign').textContent=data[9].sign
}
window.addEventListener("load", grabdata)