document.getElementById('about-heading').addEventListener('click', function() {
    const content = document.getElementById('about-content');
    
    if (content.style.maxHeight === '0px' || content.style.maxHeight === '') {
        content.style.maxHeight = content.scrollHeight + 'px';
    } else {
        content.style.maxHeight = '0px';
    }
});
