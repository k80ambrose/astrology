document.querySelectorAll('.about-heading').forEach(heading => {
    heading.addEventListener('click', function() {
        const content = this.nextElementSibling;

        if (content.style.maxHeight === '0px' || content.style.maxHeight === '') {
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            content.style.maxHeight = '0px';
        }
    });
});
