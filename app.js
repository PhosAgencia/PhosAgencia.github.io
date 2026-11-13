import { content } from './content.js';
import { validEvent, calendarICS, googleCalendarURL } from './features.js';

// Descrições detalhadas apresentadas somente no diálogo de imagem.
const imageDescriptions = {
  './assets/ilustracao-01.jpeg': 'Ilustração em aquarela de duas pessoas se beijando. À esquerda, uma figura em azul, de cabelo curto, toca o pescoço da outra; à direita, uma figura em bege tem cabelo e barba curtos. Entre elas há um coração vermelho, sobre um fundo cinza-claro.',
  './assets/ilustracao-02.jpeg': 'Ilustração em aquarela de um homem em tons de azul reclinado sobre almofadas cinzas, com as mãos juntas à frente do corpo. Ele tem cabelo curto e barba; uma grande forma vermelha ocupa o primeiro plano à esquerda, sobre fundo branco.',
  './assets/ilustracao-03.jpeg': 'Ilustração em aquarela de duas pessoas muito próximas. Uma figura azul está deitada e olha para cima; uma figura bege de barba se inclina sobre ela e segura seu queixo firmemente. O fundo é cinza-claro, com contornos pretos.',
  './assets/ilustracao-04.jpeg': 'Ilustração em aquarela de um homem azul visto de baixo para cima. Ele está segurando um objeto com as mãos atrás da cabeça e possui manchas vermelhas no rosto, mãos e no objeto. Ele tem cabelo curto, bigode e cavanhaque; o fundo é cinza claro.',
  './assets/ilustracao-05.jpeg': 'Ilustração em aquarela de duas pessoas vistas de costas diante de uma janela. A figura em azul usa moletom com capuz e inclina a cabeça sobre o ombro da figura em bege, de cabelo bem curto. O ambiente ao redor é cinza.',
  './assets/ilustracao-06.jpeg': 'Ilustração em aquarela azul e cinza, em close, do rosto de uma pessoa de óculos. Os contornos pretos mostram a armação, um pequeno símbolo oval na haste, a orelha, o nariz e o bigode.',
  './assets/ilustracao-07.jpeg': 'Ilustração em aquarela azul de um rosto visto de frente, com cabelo de franja, olhos contornados, bigode e cavanhaque. Os ombros aparecem na parte inferior, diante de um fundo branco e cinza-claro.',

  './assets/cartaz-abertura.png': 'Cartaz vertical sobre fundo azul texturizado, com uma moldura fina azul-clara de cantos arredondados. No alto, em letras brancas grandes, lê-se “O FIM DE NÓS”; abaixo, em letras menores, “é o”, seguido por “COMEÇO DE MIM.”. Na metade inferior, duas pessoas aparecem próximas uma da outra, vistas de costas. A pessoa à esquerda tem cabelo curto descolorido, com raízes escuras, veste um moletom vermelho com capuz e apoia a cabeça no ombro da pessoa à direita. Esta tem cabelo escuro curto, um pequeno brinco e camiseta preta; parte do braço direito está visível. A figura de moletom ocupa a maior parte do primeiro plano. Sobre a parte inferior da imagem, em letras brancas manuscritas, está o título “Sinto sua falta”; logo abaixo, em letras espaçadas, aparece “11 de novembro”.', 
  './assets/logo-abertura.png': 'Logomarca do curta sobre fundo azul. Em letras manuscritas brancas, a palavra Sinto aparece no alto à esquerda, sua no centro e falta embaixo à direita.',
  './assets/logo.webp': 'Logomarca do curta em letras manuscritas. As palavras Sinto, sua e falta aparecem lado a lado, com traços finos e irregulares.',
  './assets/unicid.png': 'Logomarca da UNICID. À esquerda há uma estrela formada por linhas entrelaçadas; à direita, a palavra UNICID em letras maiúsculas e, abaixo, Universidade Cidade de S. Paulo.',
  './assets/oakley-transparente.png': 'Logomarca Oakley: um símbolo oval alongado sobre a palavra OAKLEY em letras maiúsculas espaçadas.',
  './assets/casio.png': 'Logomarca CASIO, escrita em letras maiúsculas largas e arredondadas.',
  './assets/reflexo-1440.webp': 'Fotografia horizontal e bastante escura. Uma pessoa aparece diante de um espelho, segurando uma câmera preta junto ao rosto, que fica quase todo encoberto pelo equipamento e pelas mãos. Seu cabelo ocupa a parte superior central da imagem. À direita, vê-se parcialmente a silhueta de outra pessoa; o fundo é discreto e pouco iluminado.',
  './assets/camera-1440.webp': 'Fotografia vertical, em iluminação muito baixa, feita diante de um espelho. Uma pessoa segura uma câmera preta à altura do rosto; o equipamento e as mãos cobrem a maior parte de suas feições. À direita, outra mão aparece próxima ao braço da pessoa, que usa uma pulseira. Um pedaço de rosto e cabelo aparece à esquerda, em meio às sombras.',
  './assets/retrato-1440.webp': 'Fotografia horizontal de um homem de cabelo curto e barba, usando camiseta preta. Ele sorri para a câmera, sentado à mesa de uma cozinha, com os braços apoiados à frente. Sobre a mesa há uma taça, um celular e um objeto retangular alaranjado. Ao fundo aparecem armários, um micro-ondas, louças, fogão e panelas.',
  './assets/cartaz-1.webp': 'Cartaz vertical do curta. Em primeiro plano, duas pessoas se beijam; uma mão repousa junto ao rosto da pessoa de barba, e um relógio digital aparece no pulso. Ao fundo, luzes desfocadas de uma cidade à noite. Sobre a imagem aparecem a frase “O fim do nós é o começo de mim”, como escrita no cartaz, e o título manuscrito “Sinto sua falta”. Na parte inferior estão os nomes Guilherme Lisboa, identificado como Pedro, e Lino Gallesco, como Fábio; seguem os créditos de direção, fotografia, edição e produção, e as marcas Oakley, Casio, UNICID e Agência Phos.',
  './assets/cartaz-2.webp': 'Cartaz vertical em tons quentes. Um homem de cabelo curto e barba, com brinco de argola e camiseta preta, aparece de perfil olhando para a direita. Atrás dele há um céu de nuvens iluminadas pelo sol. Na parte superior lê-se “O fim do nós é o começo de mim”, como escrito na arte, seguido do título manuscrito “Sinto sua falta”. Na base aparecem os nomes Guilherme Lisboa e Lino Gallesco, seus papéis, os créditos da equipe e as marcas Oakley, Casio, UNICID e Agência Phos.',
  './assets/cartaz-3.webp': 'Cartaz vertical em azul escuro. Uma pessoa de perfil, com cabelo claro na parte superior, laterais raspadas, brincos e cavanhaque, olha para cima e para a esquerda. Veste uma camiseta clara. Ao fundo há um céu noturno com nuvens e pontos luminosos, e luzes de cidade desfocadas na parte inferior. A composição traz a frase “O fim do nós é o começo de mim”, como escrita no cartaz, o título manuscrito “Sinto sua falta”, os nomes Guilherme Lisboa e Lino Gallesco com seus papéis, créditos da equipe e as marcas Oakley, Casio, UNICID e Agência Phos.',
  './assets/cartaz-4.webp': 'Peça vertical com duas fotografias em preto e branco e uma faixa azul ao centro. Nas fotografias, dois homens deitados lado a lado sorriem um para o outro; uma das imagens aparece invertida em relação à outra. Entre elas, a faixa azul com nuvens traz os créditos da equipe, a frase “O fim do nós é o começo de mim”, como escrita na peça, e o título manuscrito “Sinto sua falta”. A arte também traz os nomes Guilherme Lisboa e Vinicius Lima, conforme aparecem neste material, além das marcas Oakley, Casio, UNICID e Agência Phos.'
};

// Dialog nativo: foco contido, Escape e restauração do foco ao fechar.
const dialog = document.querySelector('#lightbox');
let opener;
for (const button of document.querySelectorAll('[data-image]')) {
  button.addEventListener('click', () => {
    opener = button;
    const image = document.querySelector('#lightbox-image');
    image.src = button.dataset.image;
    image.classList.toggle('lightbox-brand', /\/assets\/(unicid|oakley-transparente|casio)\.png$/.test(button.dataset.image));
    image.classList.remove('lightbox-oakley');
    image.alt = button.querySelector('img').alt;
    document.querySelector('#lightbox-caption').textContent = button.dataset.caption;
    document.querySelector('#lightbox-description').textContent = imageDescriptions[button.dataset.image] || image.alt;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  });
}
document.querySelector('#close-lightbox').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.style.overflow = ''; opener?.focus(); });

if (validEvent(content.event)) {
  const event = content.event;
  document.querySelector('#release-status').textContent = new Intl.DateTimeFormat('pt-BR', {dateStyle:'long',timeStyle:'short',timeZone:'America/Sao_Paulo'}).format(new Date(event.start)) + ' · horário de Brasília';
  document.querySelector('#event-description').textContent = `${event.title} · ${event.location}`;
  const container = document.querySelector('#calendar-actions');
  const google = document.createElement('a'); google.href = googleCalendarURL(event); google.className = 'button dark'; google.textContent = 'Salvar no Google Calendar ↗';
  const ics = document.createElement('button'); ics.className = 'button dark'; ics.textContent = 'Baixar evento (.ics)';
  ics.addEventListener('click', () => { const url = URL.createObjectURL(new Blob([calendarICS(event)], {type:'text/calendar;charset=utf-8'})); const link = document.createElement('a'); link.href = url; link.download = 'sinto-sua-falta.ics'; link.click(); setTimeout(()=>URL.revokeObjectURL(url),1000); });
  container.replaceChildren(google, ics);
}

// Só publica o vídeo quando também houver recursos textuais revisados.
if (content.teaser?.src?.startsWith('./assets/') && content.teaser?.captions?.startsWith('./assets/') && content.teaser?.transcript?.trim()) {
  const video = document.createElement('video'); video.controls = true; video.preload = 'none'; video.playsInline = true; video.setAttribute('aria-label','Teaser oficial de Sinto sua falta');
  video.src = content.teaser.src;
  const track = document.createElement('track'); track.kind = 'captions'; track.label = 'Português'; track.srclang = 'pt-BR'; track.src = content.teaser.captions; track.default = true; video.append(track);
  const container = document.querySelector('#teaser-container'); container.replaceChildren(video);
  document.querySelector('#transcript-text').textContent = content.teaser.transcript;
  video.addEventListener('error', () => { const error = document.createElement('p'); error.textContent='Não foi possível carregar o teaser. Tente novamente mais tarde ou leia a transcrição abaixo.'; error.setAttribute('role','status'); container.replaceChildren(error); });
}

// Dados verificados e referências editoriais em docs/ESTATISTICAS.md.
const supportForm = document.querySelector('#support-form');
const statistics = [
  ['26%', '26', 'dos homens gays', 'relataram estupro, violência física ou perseguição por parceiro íntimo ao longo da vida.', 'EUA · pesquisa de 2010'],
  ['37,3%', '37.3', 'dos homens bissexuais', 'relataram estupro, violência física ou perseguição por parceiro íntimo ao longo da vida.', 'EUA · pesquisa de 2010'],
  ['37,5%', '37.5', 'entre pessoas trans', 'Prevalência mediana de violência física por parceiro íntimo ao longo da vida nos estudos de uma revisão sistemática.', 'Revisão internacional · 2020'],
  ['43,8%', '43.8', 'das mulheres lésbicas', 'relataram estupro, violência física ou perseguição por parceiro íntimo ao longo da vida.', 'EUA · pesquisa de 2010'],
  ['25,8%', '25.8', 'das mulheres', 'De 15 a 49 anos que já tiveram um relacionamento: sofreram violência física ou sexual por parceiro homem, atual ou anterior, ao longo da vida.', 'Estimativa global · 2023']
];
let revealing = false;
supportForm.addEventListener('submit', event => {
  event.preventDefault();
  if (revealing || !supportForm.reportValidity()) return;
  revealing = true;
  const rows = [...supportForm.querySelectorAll('.poll-option')];
  supportForm.classList.add('is-transforming');
  supportForm.querySelector('button').disabled = true;
  const reveal = () => {
    document.querySelector('#enquete').classList.add('is-revealed');
    rows.forEach((row, index) => {
      const [percentage, width, group, description, context] = statistics[index];
      row.className = 'poll-option fact-option';
      row.style.setProperty('--fact-width', width + '%');
      row.style.setProperty('--fact-delay', index * 80 + 'ms');
      row.replaceChildren();
      const fill = document.createElement('span'); fill.className = 'fact-fill'; fill.setAttribute('aria-hidden', 'true');
      const box = document.createElement('div'); box.className = 'fact-box';
      const copy = document.createElement('span'); copy.className = 'fact-copy';
      const heading = document.createElement('strong'); heading.textContent = percentage + ' ' + group;
      const body = document.createElement('span'); body.textContent = description;
      const detail = document.createElement('small'); detail.textContent = context;
      box.append(fill, heading);
      copy.append(body, detail); row.append(box, copy);
    });
    supportForm.querySelector('button').hidden = true;
    supportForm.classList.remove('is-transforming');
    supportForm.classList.add('has-facts');
    const panel = document.querySelector('#reveal-content');
    document.querySelector('#support-resources').hidden = false;
    panel.hidden = false;
    supportForm.querySelector('legend').textContent = 'Violência em relacionamentos LGBTQIA+';
    rows[0].tabIndex = -1;
    rows[0].focus();
  };
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) reveal();
  else window.setTimeout(reveal, 220);
});



const fontButton = document.querySelector('#font-size');
fontButton.addEventListener('click',()=>{const active=document.documentElement.classList.toggle('large-text');fontButton.setAttribute('aria-pressed',String(active));fontButton.textContent=active?'Tamanho padrão A−':'Aumentar letras A+';});
const pendingCalendar=document.querySelector('#calendar-actions button');
if(pendingCalendar && !content.event){pendingCalendar.disabled=false;pendingCalendar.addEventListener('click',()=>{const data=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Sinto sua falta//PT-BR','BEGIN:VEVENT','UID:estreia-20261106@sinto-sua-falta','SEQUENCE:1',`DTSTAMP:${new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'')}`,'DTSTART:20261111T220000Z','SUMMARY:Estreia oficial — Sinto sua falta','LOCATION:UNICID','END:VEVENT','END:VCALENDAR'].join('\r\n')+'\r\n';const url=URL.createObjectURL(new Blob([data],{type:'text/calendar;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='estreia-sinto-sua-falta.ics';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});}
window.addEventListener('error',event=>{if(event.target instanceof HTMLImageElement){event.target.insertAdjacentText('afterend','Imagem indisponível. Recarregue a página ou tente novamente mais tarde.');}else{document.querySelector('#erro-site').hidden=false;}},true);
window.addEventListener('unhandledrejection',()=>{document.querySelector('#erro-site').hidden=false;});

const audioSite = document.querySelector('#musica-site');
const recordPlayer = document.querySelector('.record-player');
audioSite.addEventListener('playing', () => recordPlayer.classList.add('is-playing'));
for (const eventName of ['pause', 'ended', 'waiting', 'error']) audioSite.addEventListener(eventName, () => recordPlayer.classList.remove('is-playing'));
audioSite.addEventListener('error', () => { document.querySelector('#musica-erro').hidden = false; });

// Narração geral do site, iniciada somente a pedido do visitante.
const audioDescricao = document.querySelector('#audio-descricao');
const audioDescricaoStatus = document.querySelector('#audio-descricao-status');
let narrandoSite = false;
let narracaoAtual = null;
function pararAudiodescricao() {
  narrandoSite = false;
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  audioDescricao.setAttribute('aria-pressed', 'false');
  audioDescricao.textContent = 'Ouvir audiodescrição';
}
audioDescricao.addEventListener('click', () => {
  if (narrandoSite) { pararAudiodescricao(); audioDescricaoStatus.textContent = 'Audiodescrição encerrada.'; return; }
  if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
    audioDescricaoStatus.textContent = 'A audiodescrição por voz não está disponível neste navegador. Use um leitor de tela ou tente outro navegador.';
    return;
  }
  audioSite.pause();
  const texto = 'Bem-vinda, bem-vindo ao site do curta Sinto sua falta. A página usa azul-claro, preto e branco, com nuvens e letras que lembram uma máquina de escrever. No topo ficam a marca da Agência Phos, os links de navegação, os controles para aumentar as letras e ouvir esta audiodescrição. Na abertura, o título animado aparece ao lado de um cartaz com duas pessoas se beijando, diante de luzes noturnas. A frase diz: O fim de nós é o começo de mim. Abaixo, há um toca-discos com controle para ouvir a trilha sonora. Na seção O filme, você encontra a sinopse e as informações de acesso e conteúdo. Na seção Primeiro olhar está o teaser. Em Memórias em quadro, há um storyboard em faixa horizontal e cartazes; selecione cada imagem para ampliá-la e ler sua descrição. Em Quem conta a história estão os créditos, retratos da equipe, apoios e patrocínios. A seção Seu olhar apresenta uma pergunta sobre relacionamentos abusivos. Ao escolher uma resposta e enviar, aparecem informações e canais de apoio. No fim da página ficam os dados de estreia, o botão de calendário e o Instagram. Use a tecla Tab para percorrer os controles, Enter ou espaço para ativá-los e Escape para fechar uma imagem ampliada. Para encerrar esta narração, pressione novamente o botão de audiodescrição.';
  narracaoAtual = new SpeechSynthesisUtterance(texto);
  narracaoAtual.lang = 'pt-BR';
  const voz = window.speechSynthesis.getVoices().find(v => v.lang.toLowerCase() === 'pt-br');
  if (voz) narracaoAtual.voice = voz;
  narracaoAtual.onend = () => { narrandoSite = false; audioDescricao.setAttribute('aria-pressed', 'false'); audioDescricao.textContent = 'Ouvir audiodescrição'; audioDescricaoStatus.textContent = 'Audiodescrição concluída.'; };
  narracaoAtual.onerror = () => { if (!narrandoSite) return; narrandoSite = false; audioDescricao.setAttribute('aria-pressed', 'false'); audioDescricao.textContent = 'Ouvir audiodescrição'; audioDescricaoStatus.textContent = 'Não foi possível reproduzir a audiodescrição. Tente novamente ou use um leitor de tela.'; };
  narrandoSite = true;
  audioDescricao.setAttribute('aria-pressed', 'true');
  audioDescricao.textContent = 'Parar audiodescrição';
  audioDescricaoStatus.textContent = 'Audiodescrição iniciada. A trilha sonora foi pausada.';
  window.speechSynthesis.speak(narracaoAtual);
});
audioSite.addEventListener('play', () => { if (narrandoSite) { pararAudiodescricao(); audioDescricaoStatus.textContent = 'Audiodescrição encerrada para reproduzir a trilha.'; } });
window.addEventListener('pagehide', () => { if (narrandoSite) pararAudiodescricao(); });


const titleAnimation = document.querySelector('#assinatura-titulo');
const titleControl = document.querySelector('#assinatura-controle');
const titleMotionPreference = matchMedia('(prefers-reduced-motion: reduce)');

function updateTitleControl() {
  titleControl.textContent = titleAnimation.ended ? 'Repetir animação do título'
    : titleAnimation.paused ? 'Reproduzir animação do título' : 'Pausar animação do título';
}
for (const event of ['playing', 'pause', 'ended']) {
  titleAnimation.addEventListener(event, updateTitleControl);
}
titleControl.addEventListener('click', () => {
  if (titleAnimation.paused) titleAnimation.play().catch(updateTitleControl);
  else titleAnimation.pause();
});
titleMotionPreference.addEventListener('change', event => {
  if (event.matches) titleAnimation.pause();
});
titleControl.hidden = false;
if (!titleMotionPreference.matches) titleAnimation.play().catch(updateTitleControl);
