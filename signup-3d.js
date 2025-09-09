
document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.signup-card');
    let time = 0;

    function animate() {
        time += 0.01;
        const angleX = Math.sin(time) * 8;
        const angleY = Math.cos(time / 2) * 8; 
        card.style.transform = `perspective(1000px) translateZ(0px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        requestAnimationFrame(animate);
    }

    animate();
});
