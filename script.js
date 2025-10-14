// Smooth scrolling para navegação
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para links de navegação
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animação de entrada para elementos
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

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.caracteristica-item, .localizacao-content, .apartamentos-content, .contato-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Formulário de contato
    const contactForm = document.querySelector('.contato-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Criar mensagem para WhatsApp
            const whatsappMessage = `Olá! Tenho interesse no One Home Club.

Nome: ${name}
Telefone: ${phone}
E-mail: ${email}
Mensagem: ${message}

Gostaria de receber mais informações sobre o empreendimento.`;

            // Abrir WhatsApp
            const whatsappUrl = `https://api.whatsapp.com/send/?phone=5511981743897&text=${encodeURIComponent(whatsappMessage)}&type=phone_number&app_absent=0`;
            window.open(whatsappUrl, '_blank');
            
            // Limpar formulário
            this.reset();
            
            // Mostrar mensagem de sucesso
            showNotification('Mensagem enviada! Você será redirecionado para o WhatsApp.', 'success');
        });
    }

    // Valores aparecem diretamente - sem animação

    // Lazy loading para imagens (apenas para imagens que não são logo)
    const images = document.querySelectorAll('img:not(.onehome-logo img)');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                // Garantir que a imagem já carregou
                if (img.complete) {
                    img.style.opacity = '1';
                } else {
                    img.onload = function() {
                        img.style.opacity = '1';
                    };
                }
                
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Função para scroll suave para mapa
function scrollToMapa() {
    const mapaSection = document.getElementById('mapa');
    if (mapaSection) {
        mapaSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Função para mostrar notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#007bff'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Função para abrir WhatsApp diretamente
function openWhatsApp(message = '') {
    const defaultMessage = 'Gostaria de mais informações';
    const finalMessage = message || defaultMessage;
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=5511981743897&text=${encodeURIComponent(finalMessage)}&type=phone_number&app_absent=0`;
    window.open(whatsappUrl, '_blank');
}

// Adicionar evento de clique para todos os botões CTA
document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.cta-button, .final-cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Se o botão não tem onclick específico, abrir WhatsApp
            if (!this.onclick) {
                e.preventDefault();
                openWhatsApp();
            }
        });
    });
});

// Efeito de hover nos cards de características
document.addEventListener('DOMContentLoaded', function() {
    const caracteristicaItems = document.querySelectorAll('.caracteristica-item');
    
    caracteristicaItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Validação de formulário em tempo real
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contato-form form');
    if (form) {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }
});

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remover classes de erro anteriores
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Validações específicas
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Por favor, insira um e-mail válido.';
        }
    }
    
    if (field.type === 'tel') {
        const phoneRegex = /^[\d\s\(\)\-\+]+$/;
        if (value && !phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Por favor, insira um telefone válido.';
        }
    }
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo é obrigatório.';
    }
    
    // Aplicar estilo de erro se necessário
    if (!isValid) {
        field.classList.add('error');
        field.style.borderColor = '#dc3545';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        errorDiv.style.cssText = `
            color: #dc3545;
            font-size: 14px;
            margin-top: 5px;
        `;
        
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    } else {
        field.style.borderColor = '#28a745';
    }
    
    return isValid;
}