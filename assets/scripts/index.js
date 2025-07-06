document.addEventListener('DOMContentLoaded', () => {
  initPopupOverlay();
  initKnowYourselfAI();
  initCustomDropdown();
});

/** === POPUP OVERLAY === */
function initPopupOverlay() {
  const closeBtn = document.getElementById('popup-close-btn');
  const overlay = document.getElementById('popup-overlay');
  const hasDismissed = localStorage.getItem('popupDismissed');

  if (overlay) {
    overlay.style.display = hasDismissed ? 'none' : 'flex';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      overlay.style.display = 'none';
      localStorage.setItem('popupDismissed', 'true');
    });
  }
}

/** === KNOW YOURSELF AI CHAT === */
function initKnowYourselfAI() {
  const chatWindow = document.getElementById('chat-window');
  const form = document.querySelector('form');
  const input = document.getElementById('user-input');
  const presetButtons = document.querySelectorAll('[data-preset]');

  if (!chatWindow || !form || !input) return;

  window.handleUserInput = (event) => {
    event.preventDefault();
    processUserInput(form, input, chatWindow);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    processUserInput(form, input, chatWindow);
  });

  presetButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-preset');
      if (text) {
        input.value = text;
        form.requestSubmit();
      }
    });
  });
}

async function processUserInput(form, input, chatWindow) {
  const question = input.value.trim();
  if (!question) return;

  input.disabled = true;
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;

  appendMessage('user', question, chatWindow);
  input.value = '';

  const typing = document.createElement('div');
  typing.className = 'chat-bubble ai typing';
  typing.innerText = 'Typing...';
  Object.assign(typing.style, {
    padding: '0.75rem',
    borderRadius: '10px',
    whiteSpace: 'pre-wrap',
    maxWidth: '75%',
    alignSelf: 'flex-start',
    backgroundColor: 'var(--surface-dark)',
    color: 'white',
    fontStyle: 'italic',
    opacity: 0.7,
  });
  chatWindow.appendChild(typing);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  try {
    const aiReply = await generateAIResponse(question);
    if(aiReply.error){
      appendMessage('ai', "⚠️ Something went wrong. Try again later.", chatWindow);  
    }
    typing.remove(); // Remove only after getting the reply
    appendMessage('ai', aiReply, chatWindow);
  } catch (err) {
    typing.remove();
    console.log(err)
    appendMessage('ai', "⚠️ Something went wrong. Try again later.", chatWindow);
  }

  input.disabled = false;
  submitBtn.disabled = false;
  input.focus();
  chatWindow.scrollTop = chatWindow.scrollHeight;
}


function appendMessage(role, text, container) {
  const msg = document.createElement('div');
  msg.className = `chat-bubble ${role}`;
  msg.innerText = text;
  Object.assign(msg.style, {
    padding: '0.75rem',
    borderRadius: '10px',
    whiteSpace: 'pre-wrap',
    maxWidth: '75%',
    alignSelf: role === 'user' ? 'flex-end' : 'flex-start',
    backgroundColor: role === 'user' ? 'var(--primary)' : 'var(--surface-dark)',
    color: 'white',
  });
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}

async function generateAIResponse(input) {
  const apiUrl = 'https://proxy-backend-portfolio.onrender.com/chat'
  const frontendSecret = 'wardhasanSecret@123HELLOBOYS';

  const messages = [
    {
      role: 'system',
      content: 'You are a thoughtful, reflective assistant helping users explore their emotions, thoughts, and self-understanding.',
    },
    {
      role: 'user',
      content: input,
    }
  ];

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Frontend-Secret': frontendSecret
      },
      body: JSON.stringify({ messages }),
    });

    const data = await response.json();
    console.log(data)
    if (data.reply) {
      return data.reply.trim();
    } else if (data.error) {
      return `⚠️ Error: ${data.error || 'Unknown error'}`;
    } else {
      return "🤔 Hmm, I didn't get a clear answer. Try again?";
    }
  } catch (error) {
    console.error('Backend Proxy Error:', error);
    return "❌ Couldn’t connect to the server. Try again later.";
  }
}



/** === SHARE HANDLER === */
function handleShareOption(option) {
  const messages = document.querySelectorAll('#chat-window .chat-bubble');
  if (!messages.length) {
    showToast("No reflection yet to share.");
    return;
  }

  let text = '';
  messages.forEach((msg) => {
    const role = msg.classList.contains('user') ? 'You' : 'AI';
    text += `${role}: ${msg.innerText.trim()}\n\n`;
  });

  switch (option) {
    case 'copy':
      navigator.clipboard.writeText(text).then(() => showToast("Reflection copied to clipboard!"));
      break;
    case 'download':
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'my-reflection.txt';
      a.click();
      URL.revokeObjectURL(url);
      showToast("Reflection saved as text file!");
      break;
    case 'email':
      const emailLink = `mailto:?subject=My Reflection from Know Yourself AI&body=${encodeURIComponent(text)}`;
      window.open(emailLink, '_blank');
      showToast("Opening email client...");
      break;
    case 'whatsapp':
      const whatsappURL = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(whatsappURL, '_blank');
      showToast("Opening WhatsApp...");
      break;
  }
}
window.handleShareOption = handleShareOption;

/** === CUSTOM DROPDOWN FOR SHARE === */
function initCustomDropdown() {
  const toggle = document.getElementById('dropdown-toggle');
  const menu = document.getElementById('dropdown-menu');
  const arrow = toggle?.querySelector('.arrow');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('visible');
    toggle.classList.toggle('open');
    if (arrow) {
      arrow.classList.toggle('rotated');
    }
  });

  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('visible');
      toggle.classList.remove('open');
      if (arrow) {
        arrow.classList.remove('rotated');
      }
    }
  });

  menu.querySelectorAll('[data-value]').forEach(item => {
    item.addEventListener('click', () => {
      const value = item.getAttribute('data-value');
      handleShareOption(value);
      menu.classList.remove('visible');
      toggle.classList.remove('open');
      if (arrow) {
        arrow.classList.remove('rotated');
      }
    });
  });
}

/** === TOAST HANDLER === */
function showToast(message = 'Success') {
  const toast = document.getElementById('reflection-toast');
  const msgSpan = document.getElementById('reflection-toast-message');
  if (!toast || !msgSpan) return;

  msgSpan.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
  }, 2500);
}
window.showToast = showToast;
