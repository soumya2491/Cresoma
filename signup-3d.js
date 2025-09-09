// // 3D Interactive Effects for Signup Page - Performance Optimized
// document.addEventListener('DOMContentLoaded', function() {
//     const signupCard = document.querySelector('.signup-card');
//     const container = document.querySelector('.container');
    
//     // Performance optimization variables
//     let isCardAnimating = false;
//     let cardAnimationId;
    
//     // Optimized mouse tracking for 3D card effect with cosmic theme
//     container.addEventListener('mousemove', function(e) {
//         if (!isCardAnimating) {
//             isCardAnimating = true;
            
//             cardAnimationId = requestAnimationFrame(() => {
//                 const rect = container.getBoundingClientRect();
//                 const x = e.clientX - rect.left;
//                 const y = e.clientY - rect.top;
                
//                 const centerX = rect.width / 2;
//                 const centerY = rect.height / 2;
                
//                 const rotateX = (y - centerY) / centerY * -8;
//                 const rotateY = (x - centerX) / centerX * 8;
//                 const translateZ = (Math.abs(rotateX) + Math.abs(rotateY)) * 0.8;
                
//                 signupCard.style.transform = `
//                     perspective(1200px) 
//                     rotateX(${rotateX}deg) 
//                     rotateY(${rotateY}deg) 
//                     translateZ(${translateZ}px)
//                     scale(1.005)
//                 `;
                
//                 // Optimized cosmic glow effect
//                 const glowIntensity = (Math.abs(rotateX) + Math.abs(rotateY)) / 25;
//                 signupCard.style.boxShadow = `
//                     0 ${20 + translateZ}px ${40 + translateZ}px rgba(0, 0, 0, 0.3),
//                     0 0 0 1px rgba(138, 43, 226, ${0.2 + glowIntensity * 0.5}),
//                     0 0 ${25 + glowIntensity * 15}px rgba(138, 43, 226, ${0.1 + glowIntensity * 0.3})
//                 `;
                
//                 isCardAnimating = false;
//             });
//         }
//     });
    
//     // Reset card position when mouse leaves with smooth transition
//     container.addEventListener('mouseleave', function() {
//         cancelAnimationFrame(cardAnimationId);
//         requestAnimationFrame(() => {
//             signupCard.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
//             signupCard.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(138, 43, 226, 0.2)';
//         });
//     });
    
//     // Enhanced floating elements with optimized cosmic 3D movement
//     const floatingElements = document.querySelectorAll('.floating-element');
//     floatingElements.forEach((element, index) => {
//         element.addEventListener('mouseenter', function() {
//             requestAnimationFrame(() => {
//                 this.style.transform = `
//                     translateY(-30px) 
//                     translateZ(40px) 
//                     rotate(${180 + index * 45}deg) 
//                     scale(1.2)
//                 `;
//                 this.style.color = 'rgba(138, 43, 226, 0.9)';
//                 this.style.textShadow = '0 0 15px rgba(138, 43, 226, 0.6)';
//             });
//         });
        
//         element.addEventListener('mouseleave', function() {
//             requestAnimationFrame(() => {
//                 this.style.transform = 'translateY(0px) translateZ(0px) rotate(0deg) scale(1)';
//                 this.style.color = 'rgba(255, 255, 255, 0.3)';
//                 this.style.textShadow = 'none';
//             });
//         });
//     });
    
//     // Optimized 3D cosmic particle system with throttling
//     const cosmicParticles = document.querySelectorAll('.cosmic-particle');
//     let particleAnimating = false;
    
//     // Throttled mouse interaction for cosmic particles
//     document.addEventListener('mousemove', function(e) {
//         if (!particleAnimating) {
//             particleAnimating = true;
//             requestAnimationFrame(() => {
//                 cosmicParticles.forEach((particle, index) => {
//                     const speed = (index + 1) * 0.2;
//                     const x = (e.clientX * speed) / 200;
//                     const y = (e.clientY * speed) / 200;
//                     const z = Math.sin(Date.now() * 0.0005 + index) * 10;
                    
//                     particle.style.transform = `
//                         translate3d(${x}px, ${y}px, ${z}px) 
//                         rotate(${(x + y) * 0.5}deg)
//                     `;
//                 });
//                 particleAnimating = false;
//             });
//         }
//     });
    
//     // Optimized input field 3D effects with cosmic theme
//     const inputs = document.querySelectorAll('input');
//     inputs.forEach(input => {
//         input.addEventListener('focus', function() {
//             requestAnimationFrame(() => {
//                 this.parentElement.style.transform = 'translateY(-3px) translateZ(10px) rotateX(-1deg)';
//                 this.parentElement.style.boxShadow = `
//                     0 15px 30px rgba(0, 0, 0, 0.3),
//                     0 0 15px rgba(138, 43, 226, 0.2)
//                 `;
//             });
//         });
        
//         input.addEventListener('blur', function() {
//             requestAnimationFrame(() => {
//                 this.parentElement.style.transform = 'translateY(0px) translateZ(0px) rotateX(0deg)';
//                 this.parentElement.style.boxShadow = 'none';
//             });
//         });
//     });
    
//     // Optimized 3D button effects with cosmic energy
//     const buttons = document.querySelectorAll('button');
//     buttons.forEach(button => {
//         button.addEventListener('mouseenter', function() {
//             requestAnimationFrame(() => {
//                 this.style.transform = 'translateY(-2px) translateZ(8px) scale(1.01)';
//             });
//         });
        
//         button.addEventListener('mouseleave', function() {
//             requestAnimationFrame(() => {
//                 this.style.transform = 'translateY(0px) translateZ(0px) scale(1)';
//             });
//         });
        
//         button.addEventListener('mousedown', function() {
//             requestAnimationFrame(() => {
//                 this.style.transform = 'translateY(-1px) translateZ(4px) scale(0.99)';
//                 this.style.boxShadow = '0 3px 10px rgba(138, 43, 226, 0.3)';
//             });
//         });
        
//         button.addEventListener('mouseup', function() {
//             requestAnimationFrame(() => {
//                 this.style.transform = 'translateY(-2px) translateZ(8px) scale(1.01)';
//                 this.style.boxShadow = '';
//             });
//         });
//     });
    
//     // Optimized nebula effect interaction with throttling
//     const nebulas = document.querySelectorAll('.nebula');
//     let nebulaAnimating = false;
    
//     document.addEventListener('mousemove', function(e) {
//         if (!nebulaAnimating) {
//             nebulaAnimating = true;
//             requestAnimationFrame(() => {
//                 nebulas.forEach((nebula, index) => {
//                     const speed = 0.05 + index * 0.02;
//                     const x = e.clientX * speed;
//                     const y = e.clientY * speed;
                    
//                     nebula.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.05}deg)`;
//                 });
//                 nebulaAnimating = false;
//             });
//         }
//     });
    
//     // Add parallax effect to cosmic background elements
//     window.addEventListener('scroll', function() {
//         const scrolled = window.pageYOffset;
//         const stars = document.querySelector('.stars');
//         const twinkling = document.querySelector('.twinkling');
        
//         if (stars) {
//             stars.style.transform = `translateY(${scrolled * 0.1}px)`;
//         }
//         if (twinkling) {
//             twinkling.style.transform = `translateY(${scrolled * 0.2}px)`;
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.signup-card'); // target your signup card
    let time = 0;

    function animate() {
        time += 0.01; // rotation speed
        const angleX = Math.sin(time) * 8; // rotate along X-axis
        const angleY = Math.cos(time / 2) * 8; // rotate along Y-axis
        card.style.transform = `perspective(1000px) translateZ(0px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        requestAnimationFrame(animate);
    }

    animate();
});
