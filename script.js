// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active navigation link on scroll
    const sections = document.querySelectorAll('.section');
    const navLinksArray = Array.from(navLinks);

    function highlightActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.clientHeight;
            if (sectionTop <= 150 && sectionTop + sectionHeight > 150) {
                current = section.getAttribute('id');
            }
        });

        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveLink);

    // Scroll to top button
    const scrollToTopButton = document.getElementById('scrollToTop');
    
    function toggleScrollToTopButton() {
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleScrollToTopButton);

    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add fade-in animation for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards
    const cards = document.querySelectorAll('.card, .weakness-card, .recommendation-card, .activity-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add click-to-copy functionality for the website URL
    const websiteUrl = 'ecoledujeunespectateur.com';
    const codeElements = document.querySelectorAll('code');
    
    codeElements.forEach(element => {
        if (element.textContent === websiteUrl) {
            element.style.cursor = 'pointer';
            element.title = 'Cliquer pour copier l\'URL';
            element.addEventListener('click', function() {
                navigator.clipboard.writeText('https://' + websiteUrl).then(function() {
                    // Show temporary feedback
                    const originalText = element.textContent;
                    element.textContent = 'Copié!';
                    element.style.color = '#38a169';
                    setTimeout(() => {
                        element.textContent = originalText;
                        element.style.color = '';
                    }, 1500);
                });
            });
        }
    });

    // Add print functionality
    const printButton = document.createElement('button');
    printButton.textContent = 'Imprimer le Rapport';
    printButton.className = 'print-button';
    printButton.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 30px;
        background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(56, 161, 105, 0.4);
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 0.9rem;
    `;
    
    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(56, 161, 105, 0.6)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(56, 161, 105, 0.4)';
    });
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    document.body.appendChild(printButton);

    // Add export to PDF functionality (simulated)
    const exportButton = document.createElement('button');
    exportButton.innerHTML = '<i class="fas fa-download"></i> Télécharger PDF';
    exportButton.className = 'export-button';
    exportButton.style.cssText = `
        position: fixed;
        bottom: 150px;
        right: 30px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    
    exportButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
    });
    
    exportButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
    });
    
    exportButton.addEventListener('click', function() {
        // Simulate PDF download
        alert('Fonctionnalité de téléchargement PDF : Utilisez Ctrl+P ou Cmd+P pour imprimer en PDF');
    });
    
    document.body.appendChild(exportButton);

    // Add severity level indicators animation
    const severityElements = document.querySelectorAll('.severity');
    severityElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const isPlus = finalValue.includes('+');
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                
                let currentValue = 0;
                const increment = Math.ceil(numericValue / 30);
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        currentValue = numericValue;
                        clearInterval(timer);
                    }
                    target.textContent = isPlus ? `${currentValue}+` : currentValue.toString();
                }, 50);
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Add typing effect for the greeting
    const greetingElement = document.querySelector('.greeting h3');
    if (greetingElement) {
        const originalText = greetingElement.textContent;
        greetingElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                greetingElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Add progress indicator for reading
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 1001;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    function updateProgressBar() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', updateProgressBar);
});

// Add CSS for additional elements
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @media print {
        .print-button, .export-button {
            display: none !important;
        }
    }
    
    @media (max-width: 768px) {
        .print-button, .export-button {
            right: 15px;
            padding: 10px 16px;
            font-size: 0.8rem;
        }
        
        .export-button {
            bottom: 120px;
        }
        
        .print-button {
            bottom: 70px;
        }
    }
`;
document.head.appendChild(additionalStyles);

