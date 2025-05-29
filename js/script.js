document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Mobile Menu Toggle
    // ======================
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('show');
            
            // Animate menu items with stagger effect
            const menuItems = navMenu.querySelectorAll('li');
            menuItems.forEach((item, index) => {
                if (navMenu.classList.contains('show')) {
                    item.style.animation = `slideInLeft 0.6s ease-out ${index * 0.1}s both`;
                } else {
                    item.style.animation = `slideOutLeft 0.4s ease-in ${(menuItems.length - index - 1) * 0.05}s both`;
                }
            });
        });
        
        // Close menu when clicking a nav link
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('show')) {
                    mobileMenuBtn.classList.remove('active');
                    navMenu.classList.remove('show');
                }
            });
        });
    }

    // ======================
    // Hero Slideshow
    // ======================
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 0) {
        let currentSlide = 0;
        let slideInterval;
        
        function showSlide(index) {
            heroSlides.forEach(slide => slide.classList.remove('active'));
            heroSlides[index].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % heroSlides.length;
            showSlide(currentSlide);
        }
        
        function startSlideshow() {
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        // Initialize
        showSlide(0);
        startSlideshow();
        
        // Pause on hover
        const slideshow = document.querySelector('.hero-slideshow');
        if (slideshow) {
            slideshow.addEventListener('mouseenter', () => clearInterval(slideInterval));
            slideshow.addEventListener('mouseleave', startSlideshow);
        }
    }

    // ======================
    // Testimonial Slider
    // ======================
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length > 0) {
        let currentTestimonial = 0;
        let isTransitioning = false;
        let testimonialInterval;
        
        function showTestimonial(index, direction = 'next') {
            if (isTransitioning) return;
            isTransitioning = true;
            
            const currentSlide = testimonials[currentTestimonial];
            const nextSlide = testimonials[index];
            
            // Add transition classes
            if (direction === 'next') {
                currentSlide.classList.add('slide-out-left');
                nextSlide.classList.add('slide-in-right');
            } else {
                currentSlide.classList.add('slide-out-right');
                nextSlide.classList.add('slide-in-left');
            }
            
            nextSlide.classList.add('active');
            
            // Clean up after animation
            setTimeout(() => {
                testimonials.forEach(t => {
                    t.classList.remove('active', 'slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right');
                });
                nextSlide.classList.add('active');
                currentTestimonial = index;
                isTransitioning = false;
            }, 600);
        }
        
        // Navigation controls
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', function() {
                clearInterval(testimonialInterval);
                let newIndex = currentTestimonial - 1;
                if (newIndex < 0) newIndex = testimonials.length - 1;
                showTestimonial(newIndex, 'prev');
                testimonialInterval = setInterval(() => showTestimonial((currentTestimonial + 1) % testimonials.length), 5000);
            });
            
            nextBtn.addEventListener('click', function() {
                clearInterval(testimonialInterval);
                let newIndex = currentTestimonial + 1;
                if (newIndex >= testimonials.length) newIndex = 0;
                showTestimonial(newIndex, 'next');
                testimonialInterval = setInterval(() => showTestimonial((currentTestimonial + 1) % testimonials.length), 5000);
            });
        }
        
        // Auto-rotate
        testimonialInterval = setInterval(() => {
            showTestimonial((currentTestimonial + 1) % testimonials.length);
        }, 5000);
        
        // Pause on hover
        const testimonialSlider = document.querySelector('.testimonial-slider');
        if (testimonialSlider) {
            testimonialSlider.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
            testimonialSlider.addEventListener('mouseleave', () => {
                testimonialInterval = setInterval(() => {
                    showTestimonial((currentTestimonial + 1) % testimonials.length);
                }, 5000);
            });
        }
    }

    // ======================
    // FAQ Accordion
    // ======================
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all other FAQs
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.classList.remove('active');
                    q.nextElementSibling.style.maxHeight = '0';
                    q.nextElementSibling.style.opacity = '0';
                }
            });
            
            // Toggle current FAQ
            this.classList.toggle('active');
            
            if (!isActive) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
            } else {
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
            }
        });
    });

    // ======================
    // Smooth Scrolling
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ======================
    // Contact Form
    // ======================
    const contactForm = document.getElementById('businessContactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
            
            // Simulate form submission
            setTimeout(() => {
                // Show success state
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                
                // Show success message
                alert('Thank you for your message! We will contact you soon.');
                
                // Reset form after delay
                setTimeout(() => {
                    this.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 2000);
            }, 1500);
        });
    }

    // ======================
    // Scroll Animations
    // ======================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right').forEach(el => {
        observer.observe(el);
    });
});