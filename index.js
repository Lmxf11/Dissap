// Smooth Scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animação de fade in para elementos quando aparecem na tela
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.produto, .plano, .membro').forEach((element) => {
    observer.observe(element);
});

// Navbar fixa com mudança de cor ao rolar
const navbar = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
        navbar.style.backgroundColor = currentScroll > 50 ? '#1a1b1e' : 'var(--secondary)';
    }

    lastScroll = currentScroll;
});

// Modal de contato
const contatoBtns = document.querySelectorAll('.btn-comprar');
const modal = document.createElement('div');
modal.className = 'modal';
modal.innerHTML = `
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Entre em Contato</h2>
        <p>Escolha uma opção de contato:</p>
        <div class="contact-options">
            <a href="https://discord.gg/4JY3mM3rvV" target="_blank" class="discord-btn">
                Discord Server
            </a>
            <button class="copy-btn" data-discord="miguelcp11#0001">
                Copiar Discord miguelcp11
            </button>
            <button class="copy-btn" data-discord="batatxz#0002">
                Copiar Discord batatxz
            </button>
        </div>
    </div>
`;

document.body.appendChild(modal);

contatoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
    });
});

modal.querySelector('.close').addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Copiar Discord para clipboard
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const discord = btn.dataset.discord;
        navigator.clipboard.writeText(discord).then(() => {
            const originalText = btn.textContent;
            btn.textContent = 'Copiado!';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        });
    });
});

// Contador de visualizações (simulado)
const viewCounter = document.createElement('div');
viewCounter.className = 'view-counter';
const randomViews = Math.floor(Math.random() * 1000) + 500;
viewCounter.textContent = `${randomViews} visualizações hoje`;
document.querySelector('header').appendChild(viewCounter);

// Preloader
window.addEventListener('load', () => {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(preloader);

    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1000);
});

// Adicionar estilos CSS necessários para o JS
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeIn 0.6s forwards;
    }

    .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.8);
    }

    .modal-content {
        background-color: var(--secondary);
        margin: 15% auto;
        padding: 20px;
        border-radius: 10px;
        width: 80%;
        max-width: 500px;
        position: relative;
    }

    .close {
        position: absolute;
        right: 20px;
        top: 10px;
        font-size: 28px;
        cursor: pointer;
    }

    .contact-options {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 20px;
    }

    .contact-options button,
    .contact-options a {
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: var(--primary);
        color: white;
        cursor: pointer;
        transition: background-color 0.3s;
        text-align: center;
        text-decoration: none;
    }

    .contact-options button:hover,
    .contact-options a:hover {
        background-color: var(--hover);
    }

    .view-counter {
        position: absolute;
        right: 20px;
        top: 20px;
        background-color: rgba(0,0,0,0.3);
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 0.9rem;
    }

    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--background);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s;
    }

    .loader {
        width: 50px;
        height: 50px;
        border: 5px solid var(--secondary);
        border-top: 5px solid var(--primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

document.head.appendChild(style);
