(function(){
    const form = document.getElementById('reservation-form');
    const datetimeInput = document.getElementById('res-datetime');
    const messageEl = document.getElementById('reservation-message');
    const NAME_MIN_CHAR = 2;

    if(!form || !datetimeInput || !messageEl) return;

    function toLocalDatetimeString(date) {
        const pad = (v) => v.toString().padStart(2, '0');
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hour = pad(date.getHours());
        const minute = pad(date.getMinutes());
        return `${year}-${month}-${day}T${hour}:${minute}`;
    }

    function setMinDatetime() {
        const now = new Date();
        // add 1 minute to avoid selecting an already-passed minute
        now.setMinutes(now.getMinutes() + 1);
        datetimeInput.min = toLocalDatetimeString(now);
    }

    // Validate time range: 11:00 to 23:00 inclusive (23:00 allowed only at 00 minutes)
    function isValidTimeRange(date) {
        const h = date.getHours();
        const m = date.getMinutes();
        if(h < 11) return false;
        if(h > 23) return false;
        // If hour is 23, only allow minute == 0 (23:00)
        if(h === 23 && m > 0) return false;
        return true;
    }

    // Validate function returns {ok, message}
    function validate() {
        const name = document.getElementById('res-name').value.trim();
        const email = document.getElementById('res-email').value.trim();
        const phone = document.getElementById('res-phone').value.trim();
        const value = datetimeInput.value;

        if(name.length < NAME_MIN_CHAR) return { ok: false, message: 'Por favor, digite seu nome completo.' };
        if(!email || !/.+@.+\..+/.test(email)) return { ok: false, message: 'Por favor, forneça um e-mail válido.' };
        if(!phone) return { ok: false, message: 'Por favor, forneça um telefone de contato.' };
        if(!value) return { ok: false, message: 'Por favor, selecione data e hora para a reserva.' };

        const selected = new Date(value);
        const now = new Date();
        if(selected <= now) return { ok: false, message: 'Por favor, escolha uma data no futuro.' };
        if(!isValidTimeRange(selected)) return { ok: false, message: 'Horários permitidos: das 11:00 até às 23:00 (último horário 23:00).'};

        return { ok: true };
    }

    function showMessage(text, isError=false) {
        messageEl.textContent = text;
        messageEl.hidden = false;
        messageEl.classList.toggle('error', isError);
        // Auto-hide after 7 seconds
        setTimeout(() => { messageEl.hidden = true; }, 7000);
    }

    // On submission: validate, show message, and reset or not
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const v = validate();
        if(!v.ok) { showMessage(v.message, true); return; }

        // If valid, show success message and clear the form
        const name = document.getElementById('res-name').value.trim();
        const selectedDate = new Date(datetimeInput.value);
        const fmt = selectedDate.toLocaleString();
        showMessage(`Obrigado ${name}! Sua reserva em ${fmt} está em processamento. A Equipe Cozinha de Histórias fará a confirmação através do E-mail e Whatsapp.`);

        form.reset();
        setMinDatetime(); // reset min to current time
    });

    // Set min at load
    setMinDatetime();
    // If user opens the page for long, keep min updated every 30s
    setInterval(setMinDatetime, 30 * 1000);
})();
