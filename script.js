 function selectPanel(e) {
      const el = e.currentTarget || e.target.closest('.win-item');
      if(!el) return;
      const panelId = el.dataset.panel;
      document.querySelectorAll('.win-item').forEach(item => item.classList.remove('active'));
      el.classList.add('active');
      document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
      const target = document.getElementById(panelId);
      if(target) {
        target.classList.add('active');
        
        if(window.innerWidth < 980) {
          target.scrollIntoView({behavior:'smooth', block:'start'});
        }
      }
    }

    
    function openPanel(id) {
      const item = Array.from(document.querySelectorAll('.win-item')).find(x => x.dataset.panel === id);
      if(item) item.click();
    }

    
    let testiIndex = 0;
    const slides = document.querySelectorAll('.testi-slide');
    const dots = document.querySelectorAll('.dot');

    function showTesti(i) {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      slides[i].classList.add('active');
      dots[i].classList.add('active');
    }

    function slideNext() {
      testiIndex = (testiIndex + 1) % slides.length;
      showTesti(testiIndex);
    }
    function slidePrev() {
      testiIndex = (testiIndex - 1 + slides.length) % slides.length;
      showTesti(testiIndex);
    }
    function goToSlide(i) {
      testiIndex = i;
      showTesti(testiIndex);
    }

    
    let testiTimer = setInterval(slideNext, 4500);
   
    const testiWrap = document.getElementById('testiSlider');
    if(testiWrap){
      testiWrap.addEventListener('mouseenter', () => clearInterval(testiTimer));
      testiWrap.addEventListener('mouseleave', () => testiTimer = setInterval(slideNext, 4500));
    }

   
    function setEco(mode) {
      const orgSection = document.getElementById('eco-org');
      const noorgSection = document.getElementById('eco-noorg');

      const orgBtn = document.querySelector('.eco-switch .org');
      const noorgBtn = document.querySelector('.eco-switch .noorg');

      if(mode === 'org') {
        orgSection.style.display = 'block';
        noorgSection.style.display = 'none';
        orgBtn.setAttribute('aria-pressed','true');
        noorgBtn.setAttribute('aria-pressed','false');
      } else {
        orgSection.style.display = 'none';
        noorgSection.style.display = 'block';
        orgBtn.setAttribute('aria-pressed','false');
        noorgBtn.setAttribute('aria-pressed','true');
      }
      
      document.querySelectorAll('.eco-detail').forEach(d => d.classList.remove('active'));
    }


    function selectEcoCard(cardEl, id) {
     
      const details = {
        'org-frutas': {
          title: 'Frutas y verduras orgánicas',
          body: 'Cultivadas sin pesticidas sintéticos. Más nutrientes, mejor sabor y menor exposición a químicos. Apoyan a agricultores locales que usan prácticas sostenibles.'
        },
        'org-semillas': {
          title: 'Semillas orgánicas',
          body: 'Semillas no modificadas que conservan la diversidad genética y ayudan a los cultivos locales a adaptarse al clima.'
        },
        'org-compost': {
          title: 'Compostaje',
          body: 'Proceso natural que transforma residuos orgánicos en abono —mejora la estructura del suelo y reduce basura que va a rellenos.'
        },
        'noorg-plastico': {
          title: 'Envases de plástico desechable',
          body: 'Generan residuos persistentes que tardan siglos en degradarse. Reducir, reutilizar y elegir alternativas sostenibles disminuye el impacto.'
        },
        'noorg-eWaste': {
          title: 'Basura electrónica',
          body: 'Contiene metales pesados y componentes tóxicos. Es vital el reciclaje especializado y la extendida responsabilidad de productores.'
        },
        'noorg-fert': {
          title: 'Fertilizantes y pesticidas químicos',
          body: 'Pueden contaminar cuerpos de agua y afectar la fauna del suelo; prácticas orgánicas y rotación de cultivos son alternativas.'
        }
      };

      const data = details[id];
      if(!data) return;

      
      const orgDetail = document.getElementById('eco-detail-org');
      const noorgDetail = document.getElementById('eco-detail-noorg');
// show appropriate detail panel
      if(id.startsWith('org-')) {
        orgDetail.querySelector('#eco-detail-title').textContent = data.title;
        orgDetail.querySelector('#eco-detail-body').textContent = data.body;
        document.querySelectorAll('.eco-detail').forEach(d => d.classList.remove('active'));
        orgDetail.classList.add('active');

        setEco('org');
        
        setTimeout(() => orgDetail.scrollIntoView({behavior:'smooth', block:'center'}), 180);
      } else {
        noorgDetail.querySelector('#eco-detail-title-noorg').textContent = data.title;
        noorgDetail.querySelector('#eco-detail-body-noorg').textContent = data.body;
        document.querySelectorAll('.eco-detail').forEach(d => d.classList.remove('active'));
        noorgDetail.classList.add('active');
        setEco('noorg');
        setTimeout(() => noorgDetail.scrollIntoView({behavior:'smooth', block:'center'}), 180);
      }
    }

    function handleSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if(!name || !email || !message) {
        alert('Por favor completa todos los campos.');
        return;
      }


      const btn = document.querySelector('#contacto .btn-primary');
      const original = btn.textContent;
      btn.textContent = 'Enviando...';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        alert('¡Gracias! Tu mensaje fue enviado. Nos pondremos en contacto pronto. 💚');
       
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
      }, 900);
    }

   
    document.addEventListener('DOMContentLoaded', () => {
      
      setEco('org');

      document.querySelectorAll('.win-item').forEach(item => {
        item.tabIndex = 0;
        item.addEventListener('keypress', (e) => {
          if(e.key === 'Enter' || e.key === ' ') item.click();
        });
      });

    });
