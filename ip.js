const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.ipify.org?format=json');
xhr.responseType = 'json'

xhr.onload = () => {
    const placeForIp = document.querySelector('.placeForIp')

    let key;
    for (key in xhr.response) {
        placeForIp.innerHTML = `<div class="ip">User's IP: ${xhr.response[key]}</div>`
    }
}
xhr.send()