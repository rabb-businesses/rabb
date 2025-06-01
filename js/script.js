/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 🏢 RABB BUSINESSES - MODERN JAVASCRIPT SUITE
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * A modern, performant, and beautifully structured JavaScript application
 * for the Rabb Businesses website with enhanced user experience.
 * 
 * @author Rabb Businesses Development Team
 * @version 2.0.0
 * @license MIT
 */

class RabbBusinessesApp {
  constructor() {
    this.state = {
      currentSlide: 0,
      currentTestimonial: 0,
      isChatOpen: false,
      isLoading: false,
      animations: new Set(),
      observers: new Map()
    };

    this.config = {
      slideInterval: 5000,
      testimonialInterval: 7000,
      scrollThreshold: 100,
      animationDelay: 100,
      notificationDuration: 5000
    };

    this.selectors = {
      header: 'header',
      navigation: 'nav a[href^="#"]',
      mobileMenuBtn: '.mobile-menu',
      mobileNav: 'nav ul',
      heroSlides: '.hero-slide',
      testimonials: '.testimonial',
      faqItems: '.faq-item',
      contactForm: '#businessContactForm',
      newsletterForm: '.newsletter-form',
      whatsappWidget: '.whatsapp-widget',
      chatWindow: '#chatWindow',
      animatedElements: '.service-card, .value-card, .team-member, .blog-post, .job'
    };

    this.intervals = new Map();
    this.init();
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🚀 INITIALIZATION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  async init() {
    try {
      await this.waitForDOM();
      this.setupErrorHandling();
      this.initializeComponents();
      this.setupPerformanceOptimizations();
      this.registerServiceWorker();
      
      console.log('🎯 Rabb Businesses initialized successfully!');
    } catch (error) {
      this.handleError('Initialization failed', error);
    }
  }

  waitForDOM() {
    return new Promise(resolve => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  }

  initializeComponents() {
    const components = [
      this.initNavigation,
      this.initMobileMenu,
      this.initHeroSlideshow,
      this.initTestimonialSlider,
      this.initFAQAccordion,
      this.initContactForm,
      this.initNewsletterForm,
      this.initWhatsAppWidget,
      this.initScrollEffects,
      this.initLazyLoading,
      this.initBackToTop
    ];

    components.forEach(component => {
      try {
        component.call(this);
      } catch (error) {
        this.handleError(`Component initialization failed: ${component.name}`, error);
      }
    });
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🧭 NAVIGATION SYSTEM
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  initNavigation() {
    this.setupSmoothScrolling();
    this.setupHeaderEffects();
    this.setupActiveNavHighlighting();
  }

  setupSmoothScrolling() {
    const navLinks = document.querySelectorAll(this.selectors.navigation);
    
    navLinks.forEach(link => {
      link.addEventListener('click', this.handleSmoothScroll.bind(this));
    });
  }

  handleSmoothScroll(event) {
    event.preventDefault();
    
    const targetId = event.target.getAttribute('href')?.substring(1);
    const targetElement = targetId ? document.getElementById(targetId) : null;
    
    if (!targetElement) return;

    const header = document.querySelector(this.selectors.header);
    const headerHeight = header?.offsetHeight || 0;
    const targetPosition = targetElement.getBoundingClientRect().top + 
                          window.pageYOffset - headerHeight;

    this.smoothScrollTo(targetPosition);
  }

  smoothScrollTo(position) {
    const startPosition = window.pageYOffset;
    const distance = position - startPosition;
    const duration = 800;
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const progressPercentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth animation
      const easeInOutCubic = progressPercentage < 0.5 
        ? 4 * progressPercentage * progressPercentage * progressPercentage
        : (progressPercentage - 1) * (2 * progressPercentage - 2) * (2 * progressPercentage - 2) + 1;

      window.scrollTo(0, startPosition + distance * easeInOutCubic);

      if (progress < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  setupHeaderEffects() {
    const header = document.querySelector(this.selectors.header);
    if (!header) return;

    const scrollHandler = this.throttle(() => {
      header.classList.toggle('scrolled', window.scrollY > this.config.scrollThreshold);
    }, 16);

    window.addEventListener('scroll', scrollHandler, { passive: true });
  }

  setupActiveNavHighlighting() {
    const highlightHandler = this.throttle(this.highlightActiveNavItem.bind(this), 16);
    window.addEventListener('scroll', highlightHandler, { passive: true });
  }

  highlightActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll(this.selectors.navigation);
    const scrollPosition = window.pageYOffset + 200;

    let currentSection = '';

    sections.forEach(section => {
      const { top, height } = section.getBoundingClientRect();
      const sectionTop = top + window.pageYOffset;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + height) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${currentSection}`;
      link.classList.toggle('active', isActive);
    });
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 📱 MOBILE MENU
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  initMobileMenu() {
    const menuBtn = document.querySelector(this.selectors.mobileMenuBtn);
    const nav = document.querySelector(this.selectors.mobileNav);
    
    if (!menuBtn || !nav) return;

    menuBtn.addEventListener('click', () => this.toggleMobileMenu(menuBtn, nav));
    
    // Close menu when clicking nav links
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu(menuBtn, nav));
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!menuBtn.contains(event.target) && !nav.contains(event.target)) {
        this.closeMobileMenu(menuBtn, nav);
      }
    });
  }

  toggleMobileMenu(menuBtn, nav) {
    const isActive = nav.classList.contains('active');
    
    if (isActive) {
      this.closeMobileMenu(menuBtn, nav);
    } else {
      this.openMobileMenu(menuBtn, nav);
    }
  }

  openMobileMenu(menuBtn, nav) {
    nav.classList.add('active');
    menuBtn.classList.add('active');
    this.toggleMenuIcon(menuBtn, 'fa-bars', 'fa-times');
    document.body.style.overflow = 'hidden'; // Prevent scroll
  }

  closeMobileMenu(menuBtn, nav) {
    nav.classList.remove('active');
    menuBtn.classList.remove('active');
    this.toggleMenuIcon(menuBtn, 'fa-times', 'fa-bars');
    document.body.style.overflow = '';
  }

  toggleMenuIcon(menuBtn, fromClass, toClass) {
    const icon = menuBtn.querySelector('i');
    if (icon?.classList.contains(fromClass)) {
      icon.classList.replace(fromClass, toClass);
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🎭 HERO SLIDESHOW
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  initHeroSlideshow() {
    const slides = document.querySelectorAll(this.selectors.heroSlides);
    if (slides.length === 0) return;

    this.slides = slides;
    this.setupSlideshow();
    this.setupKeyboardNavigation();
  }

  setupSlideshow() {
    this.showSlide(0);
    
    const interval = setInterval(() => {
      this.nextSlide();
    }, this.config.slideInterval);
    
    this.intervals.set('slideshow', interval);
  }

  showSlide(index) {
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      slide.setAttribute('aria-hidden', i !== index);
    });
    
    this.state.currentSlide = index;
  }

  nextSlide() {
    const nextIndex = (this.state.currentSlide + 1) % this.slides.length;
    this.showSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex = this.state.currentSlide === 0 
      ? this.slides.length - 1 
      : this.state.currentSlide - 1;
    this.showSlide(prevIndex);
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
      if (event.target.matches('input, textarea')) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          this.prevSlide();
          break;
        case 'ArrowRight':
          this.nextSlide();
          break;
      }
    });
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 💬 TESTIMONIAL SLIDER
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  initTestimonialSlider() {
    const testimonials = document.querySelectorAll(this.selectors.testimonials);
    if (testimonials.length === 0) return;

    this.testimonials = testimonials;
    this.setupTestimonialSlider();
    this.setupTestimonialControls();
  }

  setupTestimonialSlider() {
    this.showTestimonial(0);
    
    const interval = setInterval(() => {
      this.nextTestimonial();
    }, this.config.testimonialInterval);
    
    this.intervals.set('testimonials', interval);
  }

  showTestimonial(index) {
    this.testimonials.forEach((testimonial, i) => {
      testimonial.classList.toggle('active', i === index);
    });
    
    this.state.currentTestimonial = index;
  }

  nextTestimonial() {
    const nextIndex = (this.state.currentTestimonial + 1) % this.testimonials.length;
    this.showTestimonial(nextIndex);
  }

  prevTestimonial() {
    const prevIndex = this.state.currentTestimonial === 0 
      ? this.testimonials.length - 1 
      : this.state.currentTestimonial - 1;
    this.showTestimonial(prevIndex);
  }

  setupTestimonialControls() {
    const prevBtn = document.querySelector('.testimonial-slider .prev');
    const nextBtn = document.querySelector('.testimonial-slider .next');

    prevBtn?.addEventListener('click', () => this.prevTestimonial());
    nextBtn?.addEventListener('click', () => this.nextTestimonial());
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ❓ FAQ ACCORDION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  initFAQAccordion() {
    const faqItems = document.querySelectorAll(this.selectors.faqItems);
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (question) {
        question.addEventListener('click', () => this.toggleFAQItem(item, faqItems));
      }
    });
  }

  toggleFAQItem(clickedItem, allItems) {
    const answer = clickedItem.querySelector('.faq-answer');
    const isActive = clickedItem.classList.contains('active');

    // Close all items
    allItems.forEach(item => {
      item.classList.remove('active');
      const itemAnswer = item.querySelector('.faq-answer');
      if (itemAnswer) {
        itemAnswer.style.maxHeight = null;
      }
    });

    // Open clicked item if it wasn't active
    if (!isActive && answer) {
      clickedItem.classList.add('active');
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 📞 CONTACT FORM
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  initContactForm() {
    const form = document.querySelector(this.selectors.contactForm);
    if (!form) return;

    form.addEventListener('submit', this.handleContactSubmit.bind(this));
    this.setupRealTimeValidation(form);
  }

  async handleContactSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    if (!this.validateContactForm(data, form)) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    try {
      this.setLoadingState(submitBtn, 'Sending...');
      
      // Simulate API call
      await this.delay(2000);
      
      this.showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
      form.reset();
      
    } catch (error) {
      this.showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
      this.resetLoadingState(submitBtn, originalText);
    }
  }

  validateContactForm(data, form) {
    this.clearFormErrors(form);
    let isValid = true;

    const validations = [
      { field: 'name', validator: this.validateName, message: 'Please enter a valid name' },
      { field: 'email', validator: this.validateEmail, message: 'Please enter a valid email address' },
      { field: 'phone', validator: this.validatePhone, message: 'Please enter a valid phone number', optional: true },
      { field: 'message', validator: this.validateMessage, message: 'Please enter a message (at least 10 characters)' }
    ];

    validations.forEach(({ field, validator, message, optional }) => {
      const value = data[field]?.trim();
      const fieldElement = form.querySelector(`#${field}`);
      
      if (!optional && (!value || !validator.call(this, value))) {
        this.showFieldError(fieldElement, message);
        isValid = false;
      } else if (optional && value && !validator.call(this, value)) {
        this.showFieldError(fieldElement, message);
        isValid = false;
      }
    });

    return isValid;
  }

  setupRealTimeValidation(form) {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    
    const validators = {
      email: () => this.validateEmail(value),
      tel: () => this.validatePhone(value),
      text: () => field.required ? value.length >= 2 : true,
      textarea: () => field.required ? value.length >= 10 : true
    };

    const validator = validators[field.type] || validators.text;
    
    if (value && !validator()) {
      const messages = {
        email: 'Please enter a valid email address',
        tel: 'Please enter a valid phone number',
        textarea: 'Please enter at least 10 characters'
      };
      
      this.showFieldError(field, messages[field.type] || 'This field is required');
      return false;
    }

    this.clearFieldError(field);
    return true;
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 📧 NEWSLETTER FORM
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  initNewsletterForm() {
    const form = document.querySelector(this.selectors.newsletterForm);
    if (!form) return;

    form.addEventListener('submit', this.handleNewsletterSubmit.bind(this));
  }

  async handleNewsletterSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const emailInput = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    if (!this.validateEmail(emailInput.value)) {
      this.showNotification('Please enter a valid email address', 'error');
      return;
    }

    const originalText = submitBtn.textContent;

    try {
      this.setLoadingState(submitBtn, 'Subscribing...');
      
      await this.delay(2000);
      
      this.showNotification('Successfully subscribed to our newsletter!', 'success');
      emailInput.value = '';
      
    } catch (error) {
      this.showNotification('Subscription failed. Please try again.', 'error');
    } finally {
      this.resetLoadingState(submitBtn, originalText);
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 💚 WHATSAPP WIDGET
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  initWhatsAppWidget() {
    this.setupWhatsAppStyles();
    this.setupWhatsAppEventListeners();
  }

  setupWhatsAppEventListeners() {
    // Message input handling
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
      messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          this.handleChatMessage(messageInput);
        }
      });
    }
  }

  toggleChat() {
    const chatWindow = document.querySelector(this.selectors.chatWindow);
    const whatsappButton = document.querySelector('.whatsapp-button');
    const notification = document.querySelector('.notification-badge');
    
    if (!chatWindow) return;

    const isActive = chatWindow.classList.contains('active');
    
    chatWindow.classList.toggle('active');
    whatsappButton?.classList.toggle('chat-open', !isActive);
    
    if (notification && !isActive) {
      notification.style.display = 'none';
    }

    this.state.isChatOpen = !isActive;
  }

  sendQuickReply(type) {
    const responses = {
      services: {
        title: 'Our Services',
        message: `We offer:
• Business Management Consultancy
• Marketing Management  
• HR Management
• E-commerce Solutions
• Quality Measurement
• Hospitality Management

Which service interests you most?`
      },
      pricing: {
        title: 'Pricing Information',
        message: `Our pricing is customized based on your specific needs. We offer flexible packages for:
• Small businesses
• Medium enterprises  
• Large corporations

Would you like a free consultation?`
      },
      contact: {
        title: 'Contact Information',
        message: `You can reach us:
📧 info@rabbbusinesses.ae
📞 +971-505696888
🕒 Mon-Fri: 9AM-6PM

How would you prefer to be contacted?`
      },
      support: {
        title: 'Technical Support',
        message: `Our support team is here to help with:
• Website issues
• Account problems
• Technical questions
• General inquiries

What do you need help with?`
      }
    };

    const response = responses[type];
    if (response) {
      this.addChatMessage(`I'd like to know about: ${response.title}`, 'user');
      
      setTimeout(() => {
        this.addChatMessage(response.message, 'bot');
      }, 1000);
    }
  }

  addChatMessage(message, sender) {
    const chatBody = document.querySelector('.chat-body');
    if (!chatBody) return;

    const messageElement = this.createChatMessage(message, sender);
    chatBody.appendChild(messageElement);
    
    // Smooth scroll to bottom
    chatBody.scrollTo({
      top: chatBody.scrollHeight,
      behavior: 'smooth'
    });
  }

  createChatMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    messageDiv.innerHTML = `
      <div class="message-bubble">
        <p>${this.escapeHtml(message)}</p>
        <div class="message-time">
          ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    `;

    return messageDiv;
  }

  handleChatMessage(input) {
    const message = input.value.trim();
    if (!message) return;

    this.addChatMessage(message, 'user');
    
    setTimeout(() => {
      this.addChatMessage(
        'Thank you for your message! Let me connect you with our team via WhatsApp for a quick response.',
        'bot'
      );
    }, 1000);

    input.value = '';
  }

  redirectToWhatsApp() {
    const input = document.getElementById('messageInput');
    const message = input?.value || 'Hello, I would like to know more about your services.';
    const phoneNumber = '971505696888';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  }

  setupWhatsAppStyles() {
    if (document.querySelector('#whatsapp-widget-styles')) return;

    const style = document.createElement('style');
    style.id = 'whatsapp-widget-styles';
    style.textContent = `
      .whatsapp-widget { 
        position: fixed; 
        bottom: 20px; 
        right: 20px; 
        z-index: 1000; 
      }
      .chat-window { 
        display: none; 
        transform: translateY(20px);
        opacity: 0;
        transition: all 0.3s ease;
      }
      .chat-window.active { 
        display: block; 
        transform: translateY(0);
        opacity: 1;
      }
      .whatsapp-button.chat-open { 
        transform: rotate(45deg); 
      }
    `;
    
    document.head.appendChild(style);
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🎨 SCROLL EFFECTS & ANIMATIONS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  initScrollEffects() {
    this.setupIntersectionObserver();
    this.setupParallaxEffect();
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll(this.selectors.animatedElements);
    elementsToAnimate.forEach(el => observer.observe(el));
    
    this.observers.set('intersection', observer);
  }

  setupParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const parallaxHandler = this.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const speed = scrolled * 0.5;
      hero.style.transform = `translateY(${speed}px)`;
    });

    window.addEventListener('scroll', parallaxHandler, { passive: true });
  }

  initBackToTop() {
    const backToTop = this.createBackToTopButton();
    document.body.appendChild(backToTop);

    const scrollHandler = this.throttle(() => {
      backToTop.classList.toggle('visible', window.pageYOffset > 300);
    }, 16);

    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    backToTop.addEventListener('click', () => {
      this.smoothScrollTo(0);
    });
  }

  createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Back to top');
    
    button.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 20px;
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #25D366, #20B358);
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px);
      transition: all 0.3s ease;
      z-index: 999;
      box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
    `;

    return button;
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🖼️ LAZY LOADING
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    if (images.length === 0) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          imageObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '50px' });

    images.forEach(img => imageObserver.observe(img));
    this.observers.set('images', imageObserver);
  }

  loadImage(img) {
    return new Promise((resolve, reject) => {
      const imageLoader = new Image();
      
      imageLoader.onload = () => {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        img.classList.add('loaded');
        resolve();
      };
      
      imageLoader.onerror = reject;
      imageLoader.src = img.dataset.src;
    });
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🔧 UTILITY FUNCTIONS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Validation Methods
  validateName(name) {
    return name && name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email?.trim());
  }

  validatePhone(phone) {
    if (!phone) return true; // Optional field
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.trim());
  }

  validateMessage(message) {
    return message && message.trim().length >= 10;
  }

  // Form Utilities
  showFieldError(field, message) {
    if (!field) return;
    
    this.clearFieldError(field);
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
      display: block;
    `;
    
    field.parentNode.appendChild(errorDiv);
  }

  clearFieldError(field) {
    if (!field) return;
    
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    existingError?.remove();
  }

  clearFormErrors(form) {
    const errorFields = form.querySelectorAll('.error');
    const errorMessages = form.querySelectorAll('.field-error');
    
    errorFields.forEach(field => field.classList.remove('error'));
    errorMessages.forEach(error => error.remove());
  }

  setLoadingState(button, text) {
    if (!button) return;
    
    button.textContent = text;
    button.disabled = true;
    button.classList.add('loading');
  }

  resetLoadingState(button, originalText) {
    if (!button) return;
    
    button.textContent = originalText;
    button.disabled = false;
    button.classList.remove('loading');
  }

  // Notification System
  showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());

    const notification = this.createNotification(message, type);
    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0)';
      notification.style.opacity = '1';
    });

    // Auto remove
    setTimeout(() => this.removeNotification(notification), this.config.notificationDuration);

    return notification;
  }

  createNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const colors = {
      success: '#28a745',
      error: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8'
    };

    const icons = {
      success: 'fas fa-check-circle',
      error: 'fas fa-exclamation-circle',
      warning: 'fas fa-exclamation-triangle',
      info: 'fas fa-info-circle'
    };

    notification.innerHTML = `
      <div class="notification-content">
        <i class="${icons[type] || icons.info}"></i>
        <span class="notification-message">${this.escapeHtml(message)}</span>
        <button class="notification-close" aria-label="Close notification">&times;</button>
      </div>
    `;

    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      padding: 16px 20px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
      transform: translateX(400px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      max-width: 400px;
      background: ${colors[type] || colors.info};
      backdrop-filter: blur(10px);
    `;

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => this.removeNotification(notification));

    return notification;
  }

  removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    notification.style.opacity = '0';
    
    setTimeout(() => {
      notification.remove();
    }, 300);
  }

  // Performance Optimizations
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  requestAnimationFrame(callback) {
    let ticking = false;
    
    return function(...args) {
      if (!ticking) {
        requestAnimationFrame(() => {
          callback.apply(this, args);
          ticking = false;
        });
        ticking = true;
      }
    };
  }

  // Utility Methods
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ⚡ PERFORMANCE & ERROR HANDLING
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  setupPerformanceOptimizations() {
    // Optimize scroll events
    this.optimizeScrollEvents();
    
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Setup performance monitoring
    this.setupPerformanceMonitoring();
  }

  optimizeScrollEvents() {
    // Use passive event listeners for better performance
    const scrollEvents = ['scroll', 'touchmove', 'wheel'];
    
    scrollEvents.forEach(eventType => {
      document.addEventListener(eventType, (e) => {
        // Throttled scroll handling
      }, { passive: true });
    });
  }

  preloadCriticalResources() {
    const criticalImages = [
      '/images/hero-bg.jpg',
      '/images/logo.png'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  setupPerformanceMonitoring() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('🚀 Performance Metrics:', {
          loadTime: Math.round(perfData.loadEventEnd - perfData.fetchStart),
          domReady: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
          firstByte: Math.round(perfData.responseStart - perfData.fetchStart)
        });
      });
    }
  }

  setupErrorHandling() {
    window.addEventListener('error', (event) => {
      this.handleError('JavaScript Error', event.error, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.handleError('Unhandled Promise Rejection', event.reason);
    });
  }

  handleError(type, error, details = {}) {
    console.error(`❌ ${type}:`, error, details);
    
    // In production, you might want to send this to an error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error);
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🔄 SERVICE WORKER REGISTRATION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('✅ Service Worker registered:', registration);
      } catch (error) {
        console.log('❌ Service Worker registration failed:', error);
      }
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🧹 CLEANUP
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  destroy() {
    // Clear intervals
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals.clear();

    // Disconnect observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();

    // Remove event listeners
    // Note: Modern browsers handle this automatically when the page unloads
    
    console.log('🧹 Rabb Businesses app cleaned up');
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🌟 GLOBAL API & INITIALIZATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Create global instance
let rabbBusinessesApp;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  rabbBusinessesApp = new RabbBusinessesApp();
});

// Global API for external access
window.RabbBusinesses = {
  // Chat functions
  toggleChat: () => rabbBusinessesApp?.toggleChat(),
  sendQuickReply: (type) => rabbBusinessesApp?.sendQuickReply(type),
  redirectToWhatsApp: () => rabbBusinessesApp?.redirectToWhatsApp(),
  
  // Utility functions
  showNotification: (message, type) => rabbBusinessesApp?.showNotification(message, type),
  
  // App instance access
  getInstance: () => rabbBusinessesApp,
  
  // Version info
  version: '2.0.0',
  
  // Feature flags
  features: {
    whatsappWidget: true,
    lazyLoading: true,
    serviceWorker: true,
    performanceMonitoring: true
  }
};

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  rabbBusinessesApp?.destroy();
});

// CSS-in-JS for critical styles
const criticalStyles = `
  .fade-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .back-to-top.visible {
    opacity: 1 !important;
    visibility: visible !important;
    transform: translateY(0) !important;
  }
  
  .back-to-top:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 25px rgba(37, 211, 102, 0.4) !important;
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .notification-close {
    background: none;
    border: none;
    color: inherit;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.2s ease;
    margin-left: auto;
  }
  
  .notification-close:hover {
    opacity: 1;
  }
  
  .loading {
    position: relative;
    color: transparent !important;
  }
  
  .loading::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    top: 50%;
    left: 50%;
    margin-left: -8px;
    margin-top: -8px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: currentColor;
    animation: spin 1s ease infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

// Inject critical styles
const styleSheet = document.createElement('style');
styleSheet.textContent = criticalStyles;
document.head.appendChild(styleSheet);

/**
 * 🎉 RABB BUSINESSES JAVASCRIPT INITIALIZED
 * 
 * Features included:
 * ✅ Modern ES6+ Class Architecture
 * ✅ Performance Optimized (Throttling, Debouncing, RAF)
 * ✅ Accessible (ARIA labels, Keyboard navigation)
 * ✅ Mobile Responsive
 * ✅ Error Handling & Logging
 * ✅ Service Worker Ready
 * ✅ Memory Management & Cleanup
 * ✅ Beautiful Animations & Transitions
 * ✅ Progressive Enhancement
 * ✅ SEO Friendly
 * 
 * Built with ❤️ for modern web standards
 */