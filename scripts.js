/*
scripts.js
Author: Alexandros Kordatzakis
Created: 2024
*/
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                alert('Please fill out all fields before submitting.');
                return;
            }

            if (!validateEmail(emailInput.value)) {
                alert('Please enter a valid email address.');
                return;
            }

            if (!validateText(nameInput.value) || !validateText(messageInput.value)) {
                alert('Please avoid using special characters in your name and message.');
                return;
            }

            const sanitizedEmail = sanitize(emailInput.value);
            const sanitizedName = sanitize(nameInput.value);
            const sanitizedMessage = sanitize(messageInput.value);

            const mailtoLink = `mailto:edgeofmedicine.mag@gmail.com?subject=Contact Form Submission&body=Name: ${sanitizedName}%0D%0AEmail: ${sanitizedEmail}%0D%0AMessage: ${sanitizedMessage}`;
            window.location.href = mailtoLink;
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validateText(text) {
        const re = /^[a-zA-Z0-9\s.,'-]*$/;
        return re.test(String(text));
    }

    function sanitize(input) {
        const temp = document.createElement('div');
        temp.textContent = input;
        return temp.innerHTML;
    }

    const mysBtn = document.getElementById('scrollbuttonid');
    if (mysBtn) {
        window.addEventListener('scroll', function () {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 250) {
                mysBtn.style.display = 'block';
            } else {
                mysBtn.style.display = 'none';
            }
        });
        mysBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
        
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
    }

    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });

    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.classList.add('animate__animated', 'animate__fadeInDown');
    }

    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach(highlight => {
        highlight.addEventListener('mouseover', () => {
            highlight.classList.add('animate__animated', 'animate__pulse');
        });
        highlight.addEventListener('mouseout', () => {
            highlight.classList.remove('animate__animated', 'animate__pulse');
        });
    });

    // 404-Pet
    const leftEye = document.getElementById('left-eye');
    const rightEye = document.getElementById('right-eye');
    const leftPupil = document.getElementById('left-pupil');
    const rightPupil = document.getElementById('right-pupil');

    if (leftEye && rightEye && leftPupil && rightPupil) {
        document.addEventListener('mousemove', (event) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            const eyePosition = (eye, pupil) => {
                const rect = eye.getBoundingClientRect();
                const eyeX = rect.left + rect.width / 2;
                const eyeY = rect.top + rect.height / 2;

                const angle = Math.atan2(mouseY - eyeY, mouseX - eyeX);
                const distance = Math.min(15, Math.hypot(mouseX - eyeX, mouseY - eyeY) / 10);

                const pupilX = distance * Math.cos(angle);
                const pupilY = distance * Math.sin(angle);

                pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
            };

            eyePosition(leftEye, leftPupil);
            eyePosition(rightEye, rightPupil);
        });

        const blink = (eye) => {
            eye.classList.add('blinking');
            setTimeout(() => {
                eye.style.height = '10px';
                eye.querySelector('.pupil').style.opacity = '0';
            }, 100);
            setTimeout(() => {
                eye.style.height = '60px';
                eye.querySelector('.pupil').style.opacity = '1';
            }, 300);
            setTimeout(() => {
                eye.classList.remove('blinking');
            }, 500);
        };

        document.addEventListener('click', () => {
            const eyes = [leftEye, rightEye];
            const randomEye = eyes[Math.floor(Math.random() * eyes.length)];
            blink(randomEye);
        });

        // Random blinking every 3-5 seconds
        setInterval(() => {
            const eyes = [leftEye, rightEye];
            const randomEye = eyes[Math.floor(Math.random() * eyes.length)];
            blink(randomEye);
        }, Math.random() * 3000 + 2000); // Random interval between 3 and 5 seconds
    }
});
