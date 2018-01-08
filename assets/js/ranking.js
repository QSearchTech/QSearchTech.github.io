const containers = document.querySelectorAll('.ranking-content-inner');
Array.prototype.forEach.call(containers, (container) => {  
    var p = container.querySelector('a');
    var divh = container.clientHeight;
    while (p.offsetHeight > (divh-20)) {
        p.textContent = p.textContent.replace(/\W*\s(\S)*$/, '...');
    }
})