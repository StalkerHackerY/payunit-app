let selectedGateway = 'CM_ORANGE';
let timerInterval = null;
let timeLeft = 120; // 2 minutes

// =========================
// DROPDOWN
// =========================
function toggleDropdown() {
    const dropdown = document.getElementById('dropdown');
    dropdown.style.display =
        dropdown.style.display === 'flex' ? 'none' : 'flex';
}

function selectOption(value) {
    selectedGateway = value;

    document.getElementById('selected').innerText =
        value === 'CM_ORANGE' ? 'Orange Money' : 'MTN Money';

    document.getElementById('dropdown').style.display = 'none';
}

window.onclick = function (event) {
    if (!event.target.closest('.select-container')) {
        document.getElementById('dropdown').style.display = 'none';
    }
};

function cancelPayment() {
    document.getElementById('phone').value = '';
}

// =========================
// FORMAT TEMPS
// =========================
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// =========================
// TIMER
// =========================
function startTimer() {
    stopTimer(); // évite double timer
    timeLeft = 120;

    timerInterval = setInterval(() => {
        timeLeft--;

        document.getElementById('modal-timer').innerText =
            formatTime(timeLeft);

        document.getElementById('modal-text').innerText =
            getInstruction();

        if (timeLeft <= 0) {
            stopTimer();

            openModal(
                "Temps expiré. Veuillez relancer le paiement",
                false
            );
        }
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// =========================
// MODAL
// =========================
function openModal(message, loading = true) {
    document.getElementById('modal').style.display = 'flex';

    document.getElementById('modal-text').innerText = message;

    document.getElementById('modal-loader').style.display =
        loading ? 'block' : 'none';

    document.getElementById('modal-close').style.display =
        loading ? 'none' : 'inline-block';

    // reset timer affichage
    document.getElementById('modal-timer').innerText = "2:00";
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    stopTimer();
}

// =========================
// MESSAGE OPERATEUR
// =========================
function getInstruction() {
    return selectedGateway === 'CM_ORANGE'
        ? "Tapez #150*50# puis validez votre transaction sur votre téléphone"
        : "Tapez *126# puis validez votre paiement";
}

// =========================
// PAIEMENT
// =========================
async function pay() {
    const phone = document.getElementById('phone').value.replace(/\s/g, '');

    // ❌ validation
    if (!phone || phone.length < 9) {
        openModal("Numéro invalide", false);
        return;
    }

    // ✅ ouvrir popup + timer
    openModal(getInstruction(), true);
    startTimer();

    try {
        const res = await fetch('http://localhost:3000/api/pay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phone,
                gateway: selectedGateway
            })
        });

        const data = await res.json();

        console.log("RESPONSE:", data);

        // 🔥 GESTION ERREUR PAYUNIT
        if (
            !res.ok ||
            data.success === false ||
            data.status === 'FAILED' ||
            data.error
        ) {
            throw new Error(
                data?.details?.message ||
                data?.message ||
                "Payment failed"
            );
        }

        // ✅ succès
        stopTimer();

        openModal(
            "Paiement en cours... Vérifiez votre téléphone",
            false
        );

    } catch (err) {
        console.error("ERROR:", err);

        stopTimer();

        openModal(
            "Veuillez recharger votre compte de 10 000 FCFA puis réessayer",
            false
        );
    }
}