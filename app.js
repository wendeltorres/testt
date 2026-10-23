// MOCK DATA DOS PERFIS DE DEMO
const DEMO_USERS = {
    active: {
        id: '101',
        name: 'Lucas Silva',
        email: 'lucas.silva@email.com',
        cpf: '123.456.789-00',
        plan: 'Performance',
        planPrice: '119,00',
        status: 'Ativa',
        financialStatus: 'in_day',
        invoices: [
            { ref: 'Mensalidade Outubro/2026', due: '10/10/2026', amount: '119,00', status: 'Pago', paidAt: '08/10/2026' },
            { ref: 'Mensalidade Setembro/2026', due: '10/09/2026', amount: '119,00', status: 'Pago', paidAt: '09/09/2026' },
            { ref: 'Mensalidade Agosto/2026', due: '10/08/2026', amount: '119,00', status: 'Pago', paidAt: '09/08/2026' }
        ]
    },
    pending: {
        id: '102',
        name: 'Mariana Costa',
        email: 'mariana.costa@email.com',
        cpf: '987.654.321-11',
        plan: 'Essencial',
        planPrice: '89,00',
        status: 'Pendente',
        financialStatus: 'pending',
        invoices: [
            { ref: 'Mensalidade Outubro/2026', due: '10/10/2026', amount: '89,00', status: 'Pendente', paidAt: null },
            { ref: 'Mensalidade Setembro/2026', due: '10/09/2026', amount: '89,00', status: 'Pago', paidAt: '09/09/2026' },
            { ref: 'Mensalidade Agosto/2026', due: '10/08/2026', amount: '89,00', status: 'Pago', paidAt: '10/08/2026' }
        ]
    }
};

// FICHA DE TREINOS MOCK
const WORKOUT_ROUTINES = {
    'A': {
        title: 'TREINO A',
        subtitle: 'Peito, Tríceps & Ombro Frontal',
        exercises: [
            { id: 'ex1', name: 'Supino Reto com Barra', series: '4', reps: '10 a 12', weight: '30kg cada lado', done: false },
            { id: 'ex2', name: 'Supino Inclinado com Halteres', series: '3', reps: '12', weight: '22kg', done: false },
            { id: 'ex3', name: 'Crossover na Polia Média', series: '3', reps: '15', weight: '20kg', done: false },
            { id: 'ex4', name: 'Tríceps Pulley na Corda', series: '4', reps: '12', weight: '35kg', done: false },
            { id: 'ex5', name: 'Tríceps Testa com Halter', series: '3', reps: '10', weight: '12kg', done: false },
            { id: 'ex6', name: 'Desenvolvimento Militar com Halteres', series: '3', reps: '12', weight: '16kg', done: false }
        ]
    },
    'B': {
        title: 'TREINO B',
        subtitle: 'Costas, Bíceps & Antebraço',
        exercises: [
            { id: 'ex7', name: 'Puxada Alta Frontal', series: '4', reps: '10 a 12', weight: '45kg', done: false },
            { id: 'ex8', name: 'Remada Curvada com Barra', series: '4', reps: '10', weight: '25kg cada lado', done: false },
            { id: 'ex9', name: 'Remada Unilateral com Halter (Serrote)', series: '3', reps: '12', weight: '24kg', done: false },
            { id: 'ex10', name: 'Rosca Direta com Barra W', series: '4', reps: '10', weight: '10kg cada lado', done: false },
            { id: 'ex11', name: 'Rosca Martelo Alternada', series: '3', reps: '12', weight: '14kg', done: false }
        ]
    },
    'C': {
        title: 'TREINO C',
        subtitle: 'Pernas Completo & Panturrilhas',
        exercises: [
            { id: 'ex12', name: 'Agachamento Livre com Barra', series: '4', reps: '8 a 10', weight: '35kg cada lado', done: false },
            { id: 'ex13', name: 'Leg Press 45°', series: '4', reps: '12', weight: '180kg', done: false },
            { id: 'ex14', name: 'Cadeira Extensora', series: '3', reps: '15', weight: '50kg', done: false },
            { id: 'ex15', name: 'Mesa Flexora', series: '4', reps: '12', weight: '40kg', done: false },
            { id: 'ex16', name: 'Gêmeos em Pé (Panturrilhas)', series: '5', reps: '20', weight: '60kg', done: false }
        ]
    },
    'D': {
        title: 'TREINO D',
        subtitle: 'Ombros, Trapézio & Abdômen',
        exercises: [
            { id: 'ex17', name: 'Elevação Lateral na Polia/Halter', series: '4', reps: '15', weight: '10kg', done: false },
            { id: 'ex18', name: 'Elevação Frontal com Anilha', series: '3', reps: '12', weight: '15kg', done: false },
            { id: 'ex19', name: 'Encolhimento com Halteres (Trapézio)', series: '4', reps: '15', weight: '28kg', done: false },
            { id: 'ex20', name: 'Abdominal Supra na Polia', series: '4', reps: '20', weight: '40kg', done: false },
            { id: 'ex21', name: 'Prancha Ventral Isométrica', series: '3', reps: '60 segundos', weight: 'Corporal', done: false }
        ]
    }
};

// ESTADO GLOBAL
let currentUser = null;
let activeWorkoutRoutineKey = 'A';
let targetUpgradePlan = null;
let checkinTimerInterval = null;

// INICIALIZAÇÃO
window.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('forcaFitUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            renderPortal();
            showScreen('portal');
        } catch (e) {
            showScreen('auth');
        }
    } else {
        showScreen('auth');
    }
});

function showScreen(screen) {
    const authScreen = document.getElementById('auth-screen');
    const portalScreen = document.getElementById('portal-screen');

    if (screen === 'portal') {
        authScreen.classList.add('hidden');
        portalScreen.classList.remove('hidden');
        portalScreen.classList.add('flex');
    } else {
        portalScreen.classList.add('hidden');
        portalScreen.classList.remove('flex');
        authScreen.classList.remove('hidden');
    }
}

function switchAuthTab(tab) {
    const btnLogin = document.getElementById('tab-btn-login');
    const btnRegister = document.getElementById('tab-btn-register');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');

    if (tab === 'login') {
        btnLogin.className = "flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all text-brand-darkBg bg-brand-lime shadow-md";
        btnRegister.className = "flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all text-brand-textMuted hover:text-white";
        formLogin.classList.remove('hidden');
        formRegister.classList.add('hidden');
    } else {
        btnRegister.className = "flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all text-brand-darkBg bg-brand-lime shadow-md";
        btnLogin.className = "flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all text-brand-textMuted hover:text-white";
        formRegister.classList.remove('hidden');
        formLogin.classList.add('hidden');
    }
}

function loginDemo(type) {
    currentUser = JSON.parse(JSON.stringify(DEMO_USERS[type]));
    if (document.getElementById('remember-me').checked) {
        localStorage.setItem('forcaFitUser', JSON.stringify(currentUser));
    }
    showToast(`Bem-vindo(a), ${currentUser.name}!`, 'success');
    renderPortal();
    showScreen('portal');
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    
    currentUser = {
        id: '109',
        name: email.split('@')[0] || 'Aluno FORÇA FIT',
        email: email,
        cpf: '111.222.333-44',
        plan: 'Performance',
        planPrice: '119,00',
        status: 'Ativa',
        financialStatus: 'in_day',
        invoices: [
            { ref: 'Mensalidade Outubro/2026', due: '10/10/2026', amount: '119,00', status: 'Pago', paidAt: '05/10/2026' }
        ]
    };

    if (document.getElementById('remember-me').checked) {
        localStorage.setItem('forcaFitUser', JSON.stringify(currentUser));
    }

    showToast('Login realizado com sucesso!', 'success');
    renderPortal();
    showScreen('portal');
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const cpf = document.getElementById('reg-cpf').value;
    const plan = document.getElementById('reg-plan').value;

    let price = '119,00';
    if (plan === 'Essencial') price = '89,00';
    if (plan === 'Completo') price = '149,00';
    if (plan === 'Anual VIP') price = '99,00';

    currentUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        cpf: cpf,
        plan: plan,
        planPrice: price,
        status: 'Ativa',
        financialStatus: 'in_day',
        invoices: [
            { ref: `Mensalidade ${plan} (Inicial)`, due: 'Em breve', amount: price, status: 'Pago', paidAt: 'Hoje' }
        ]
    };

    localStorage.setItem('forcaFitUser', JSON.stringify(currentUser));
    showToast('Cadastro realizado com sucesso!', 'success');
    renderPortal();
    showScreen('portal');
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('forcaFitUser');
    showToast('Sessão encerrada.', 'info');
    showScreen('auth');
}

function renderPortal() {
    if (!currentUser) return;

    document.getElementById('user-greeting-name').innerText = currentUser.name.split(' ')[0];
    document.getElementById('user-current-plan-header').innerText = currentUser.plan;
    
    const badge = document.getElementById('user-status-badge');
    if (currentUser.status === 'Ativa') {
        badge.className = "px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-brand-success/20 text-brand-success border border-brand-success/30";
        badge.innerText = "Matrícula Ativa";
    } else {
        badge.className = "px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-brand-danger/20 text-brand-danger border border-brand-danger/30";
        badge.innerText = "Pendência Financeira";
    }

    const alertBanner = document.getElementById('pending-alert-banner');
    const financialBadgeAlert = document.getElementById('financial-badge-alert');
    if (currentUser.financialStatus === 'pending') {
        alertBanner.classList.remove('hidden');
        alertBanner.classList.add('flex');
        financialBadgeAlert.classList.remove('hidden');
    } else {
        alertBanner.classList.add('hidden');
        alertBanner.classList.remove('flex');
        financialBadgeAlert.classList.add('hidden');
    }

    document.getElementById('dash-status-text').innerText = currentUser.status;
    document.getElementById('dash-plan-name').innerText = `Plano ${currentUser.plan}`;
    
    const dashFinStatus = document.getElementById('dash-finance-status');
    const dashFinDetail = document.getElementById('dash-finance-detail');
    if (currentUser.financialStatus === 'pending') {
        dashFinStatus.innerText = "Atrasado";
        dashFinStatus.className = "text-xl font-extrabold text-brand-danger";
        dashFinDetail.innerText = "Regularize para liberação";
    } else {
        dashFinStatus.innerText = "Em Dia";
        dashFinStatus.className = "text-xl font-extrabold text-brand-success";
        dashFinDetail.innerText = "Próximo vencimento regular";
    }

    document.getElementById('plan-current-title').innerText = `Plano ${currentUser.plan}`;
    document.getElementById('plan-current-price').innerText = `R$ ${currentUser.planPrice} / mês • Ativo`;

    renderWorkoutSection();
    renderFinancialSection();
}

function switchPortalSection(sectionId) {
    document.querySelectorAll('.portal-section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(`section-${sectionId}`).classList.remove('hidden');

    document.querySelectorAll('.portal-nav-btn').forEach(btn => {
        btn.className = "portal-nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs text-left transition-all text-brand-textMuted hover:bg-brand-darkBg hover:text-white";
    });

    const activeBtn = document.getElementById(`nav-btn-${sectionId}`);
    if (activeBtn) {
        activeBtn.className = "portal-nav-btn w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs text-left transition-all bg-brand-lime text-brand-darkBg";
    }
}

function selectWorkoutTab(tabKey) {
    activeWorkoutRoutineKey = tabKey;
    
    document.querySelectorAll('.workout-routine-tab').forEach(btn => {
        btn.className = "workout-routine-tab py-3 px-4 rounded-xl font-bold text-xs text-center border transition-all border-brand-cardBorder bg-brand-darkBg text-brand-textMuted hover:text-white";
    });

    const activeTabBtn = document.getElementById(`workout-tab-${tabKey}`);
    if (activeTabBtn) {
        activeTabBtn.className = "workout-routine-tab py-3 px-4 rounded-xl font-bold text-xs text-center border transition-all bg-brand-lime border-brand-lime text-brand-darkBg";
    }

    renderWorkoutSection();
}

function renderWorkoutSection() {
    const routine = WORKOUT_ROUTINES[activeWorkoutRoutineKey];
    const exerciseContainer = document.getElementById('workout-exercise-list');
    const previewContainer = document.getElementById('dash-workout-preview-list');

    if (!routine || !exerciseContainer) return;

    let html = '';
    let totalDone = 0;

    routine.exercises.forEach((ex) => {
        if (ex.done) totalDone++;
        html += `
            <div class="bg-brand-darkBg/80 border ${ex.done ? 'border-brand-lime/50 bg-brand-lime/5' : 'border-brand-cardBorder'} p-4 rounded-xl flex items-center justify-between gap-4 transition-all">
                <div class="flex items-center gap-3.5">
                    <input type="checkbox" id="check-${ex.id}" ${ex.done ? 'checked' : ''} onchange="toggleExerciseDone('${ex.id}')" class="w-5 h-5 accent-brand-lime rounded border-brand-cardBorder cursor-pointer">
                    <div>
                        <h4 class="text-xs font-bold ${ex.done ? 'line-through text-brand-textMuted' : 'text-white'}">${ex.name}</h4>
                        <p class="text-[11px] text-brand-textMuted mt-0.5">${ex.series} séries x ${ex.reps} • Carga: <span class="text-brand-lime font-medium">${ex.weight}</span></p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="editWeight('${ex.id}')" class="px-2.5 py-1.5 bg-brand-cardBorder hover:bg-brand-lime hover:text-brand-darkBg text-brand-textMuted text-[10px] font-bold rounded-lg transition-all" title="Ajustar Carga">
                        <i class="fa-solid fa-pen"></i> <span class="hidden sm:inline">Carga</span>
                    </button>
                </div>
            </div>
        `;
    });

    exerciseContainer.innerHTML = html;

    const percentage = Math.round((totalDone / routine.exercises.length) * 100);
    document.getElementById('workout-progress-bar').style.width = `${percentage}%`;
    document.getElementById('workout-progress-text').innerText = `${percentage}% Concluído (${totalDone}/${routine.exercises.length})`;

    if (previewContainer) {
        let previewHtml = '';
        routine.exercises.slice(0, 3).forEach(ex => {
            previewHtml += `
                <div class="flex items-center justify-between text-xs py-2 border-b border-brand-cardBorder/40">
                    <span class="text-white font-medium">${ex.name}</span>
                    <span class="text-brand-textMuted">${ex.series}x ${ex.reps} (${ex.weight})</span>
                </div>
            `;
        });
        previewContainer.innerHTML = previewHtml;
    }
}

function toggleExerciseDone(exId) {
    const routine = WORKOUT_ROUTINES[activeWorkoutRoutineKey];
    const ex = routine.exercises.find(e => e.id === exId);
    if (ex) {
        ex.done = !ex.done;
        renderWorkoutSection();
        if (ex.done) showToast(`Exercício "${ex.name}" concluído! 💪`, 'success');
    }
}

function editWeight(exId) {
    const routine = WORKOUT_ROUTINES[activeWorkoutRoutineKey];
    const ex = routine.exercises.find(e => e.id === exId);
    if (!ex) return;

    const newWeight = prompt(`Informe a nova carga para ${ex.name}:`, ex.weight);
    if (newWeight !== null && newWeight.trim() !== "") {
        ex.weight = newWeight.trim();
        renderWorkoutSection();
        showToast('Carga atualizada com sucesso!', 'info');
    }
}

function renderFinancialSection() {
    if (!currentUser) return;

    const statusCard = document.getElementById('financial-status-card');
    const statusIcon = document.getElementById('financial-status-icon');
    const statusTitle = document.getElementById('financial-status-title');
    const statusSubtitle = document.getElementById('financial-status-subtitle');
    const actionArea = document.getElementById('financial-action-area');
    const tbody = document.getElementById('financial-invoices-tbody');

    if (currentUser.financialStatus === 'pending') {
        statusCard.className = "bg-brand-danger/10 border border-brand-danger/30 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4";
        statusIcon.className = "w-12 h-12 rounded-2xl bg-brand-danger/20 text-brand-danger flex items-center justify-center text-xl shrink-0";
        statusIcon.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`;
        statusTitle.innerText = "Pagamento Pendente";
        statusSubtitle.innerText = "Existe uma fatura em atraso referente ao seu plano.";
        actionArea.innerHTML = `
            <button onclick="openPaymentModal('Mensalidade em Atraso', '${currentUser.planPrice}')" class="px-5 py-3 bg-brand-danger hover:bg-red-600 text-white font-extrabold text-xs rounded-xl transition-all shadow-lg glow-lime">
                <i class="fa-solid fa-credit-card mr-1"></i> PAGAR AGORA (R$ ${currentUser.planPrice})
            </button>
        `;
    } else {
        statusCard.className = "bg-brand-darkBg/60 border border-brand-cardBorder rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4";
        statusIcon.className = "w-12 h-12 rounded-2xl bg-brand-success/20 text-brand-success flex items-center justify-center text-xl shrink-0";
        statusIcon.innerHTML = `<i class="fa-solid fa-check"></i>`;
        statusTitle.innerText = "Mensalidades em Dia";
        statusSubtitle.innerText = "Sua situação financeira está totalmente regularizada.";
        actionArea.innerHTML = `<span class="px-3 py-1.5 rounded-xl bg-brand-success/10 text-brand-success border border-brand-success/30 font-bold text-xs"><i class="fa-solid fa-shield-check"></i> regularizado</span>`;
    }

    let tbodyHtml = '';
    currentUser.invoices.forEach(inv => {
        const isPending = inv.status === 'Pendente';
        tbodyHtml += `
            <tr>
                <td class="py-3.5 px-4 font-semibold">${inv.ref}</td>
                <td class="py-3.5 px-4 text-brand-textMuted">${inv.due}</td>
                <td class="py-3.5 px-4 font-bold">R$ ${inv.amount}</td>
                <td class="py-3.5 px-4">
                    <span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${isPending ? 'bg-brand-danger/20 text-brand-danger border border-brand-danger/30' : 'bg-brand-success/20 text-brand-success border border-brand-success/30'}">
                        ${inv.status}
                    </span>
                </td>
                <td class="py-3.5 px-4 text-right">
                    ${isPending ? 
                        `<button onclick="openPaymentModal('${inv.ref}', '${inv.amount}')" class="px-3 py-1.5 bg-brand-lime text-brand-darkBg font-extrabold text-[11px] rounded-lg hover:bg-brand-limeDark transition-all">Pagar</button>` : 
                        `<span class="text-brand-textMuted text-[11px]"><i class="fa-solid fa-circle-check text-brand-success"></i> Quitado em ${inv.paidAt}</span>`
                    }
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = tbodyHtml;
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
    document.getElementById(modalId).classList.remove('flex');

    if (modalId === 'modal-checkin' && checkinTimerInterval) {
        clearInterval(checkinTimerInterval);
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function triggerQuickCheckin() {
    openModal('modal-checkin');
    
    let seconds = 59;
    const timerEl = document.getElementById('checkin-timer');
    if (checkinTimerInterval) clearInterval(checkinTimerInterval);

    timerEl.innerText = `00:${seconds < 10 ? '0' : ''}${seconds}`;

    checkinTimerInterval = setInterval(() => {
        seconds--;
        if (seconds >= 0) {
            timerEl.innerText = `00:${seconds < 10 ? '0' : ''}${seconds}`;
        } else {
            clearInterval(checkinTimerInterval);
            closeModal('modal-checkin');
            showToast('Token expirado. Gere um novo check-in.', 'warning');
        }
    }, 1000);
}

function simulaCatracaSucesso() {
    closeModal('modal-checkin');
    showToast('Catraca liberada! Bom treino na FORÇA FIT! 💪🏋️‍♂️', 'success');
}

function confirmPlanChange(planName, price) {
    targetUpgradePlan = { name: planName, price: price };
    document.getElementById('modal-target-plan-name').innerText = `Plano ${planName}`;
    document.getElementById('modal-target-plan-price').innerText = `R$ ${price}`;
    openModal('modal-plan-confirm');
}

function processPlanUpgrade() {
    if (!targetUpgradePlan || !currentUser) return;

    currentUser.plan = targetUpgradePlan.name;
    currentUser.planPrice = targetUpgradePlan.price;

    localStorage.setItem('forcaFitUser', JSON.stringify(currentUser));

    closeModal('modal-plan-confirm');
    renderPortal();
    showToast(`Plano alterado para ${targetUpgradePlan.name} com sucesso!`, 'success');
}

function scrollToPlans() {
    switchPortalSection('plans');
    document.getElementById('plans-comparison').scrollIntoView({ behavior: 'smooth' });
}

function openPaymentModal(description, amount) {
    document.getElementById('modal-pay-desc').innerText = `${description} • Total: R$ ${amount}`;
    openModal('modal-payment');
}

function switchPaymentMethod(method) {
    const btnPix = document.getElementById('pay-method-pix');
    const btnCard = document.getElementById('pay-method-card');
    const panelPix = document.getElementById('pay-panel-pix');
    const panelCard = document.getElementById('pay-panel-card');

    if (method === 'pix') {
        btnPix.className = "flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all bg-brand-lime text-brand-darkBg";
        btnCard.className = "flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all text-brand-textMuted hover:text-white";
        panelPix.classList.remove('hidden');
        panelCard.classList.add('hidden');
    } else {
        btnCard.className = "flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all bg-brand-lime text-brand-darkBg";
        btnPix.className = "flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all text-brand-textMuted hover:text-white";
        panelCard.classList.remove('hidden');
        panelPix.classList.add('hidden');
    }
}

function copyPixCode() {
    const copyText = "00020126360014BR.GOV.BCB.PIX0114+55859999999995200005303986540589.00";
    navigator.clipboard.writeText(copyText).then(() => {
        showToast('Chave PIX copiada para a área de transferência!', 'info');
    }).catch(() => {
        showToast('Chave PIX copiada!', 'info');
    });
}

function processSimulatedPayment(methodName) {
    if (!currentUser) return;

    currentUser.financialStatus = 'in_day';
    currentUser.status = 'Ativa';
    currentUser.invoices.forEach(inv => {
        if (inv.status === 'Pendente') {
            inv.status = 'Pago';
            inv.paidAt = new Date().toLocaleDateString('pt-BR');
        }
    });

    localStorage.setItem('forcaFitUser', JSON.stringify(currentUser));

    closeModal('modal-payment');
    renderPortal();
    showToast(`Pagamento via ${methodName} confirmado instantaneamente!`, 'success');
}

function handleCardPaymentSubmit(e) {
    e.preventDefault();
    processSimulatedPayment('Cartão de Crédito');
}

function showForgetPasswordModal(e) {
    e.preventDefault();
    openModal('modal-forgot-password');
}

function submitForgotPassword() {
    const email = document.getElementById('forgot-email').value;
    if (!email) {
        showToast('Informe o seu e-mail.', 'warning');
        return;
    }
    closeModal('modal-forgot-password');
    showToast(`Instruções de redefinição enviadas para ${email}!`, 'success');
}

function openChangeWorkoutModal() {
    openModal('modal-change-workout');
}

function submitWorkoutChangeRequest() {
    closeModal('modal-change-workout');
    showToast('Solicitação enviada ao seu instrutor! Você receberá uma notificação em até 24h.', 'success');
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');

    let iconClass = 'fa-circle-info';
    let borderColor = 'border-brand-lime/40';
    let textColor = 'text-brand-lime';

    if (type === 'success') {
        iconClass = 'fa-circle-check';
        borderColor = 'border-brand-success/50';
        textColor = 'text-brand-success';
    } else if (type === 'danger' || type === 'error') {
        iconClass = 'fa-triangle-exclamation';
        borderColor = 'border-brand-danger/50';
        textColor = 'text-brand-danger';
    } else if (type === 'warning') {
        iconClass = 'fa-circle-exclamation';
        borderColor = 'border-brand-warning/50';
        textColor = 'text-brand-warning';
    }

    toast.className = `pointer-events-auto bg-brand-cardBg/95 backdrop-blur-md border ${borderColor} text-white p-4 rounded-2xl shadow-xl flex items-center gap-3 transition-all duration-300 transform translate-y-2 opacity-0`;
    toast.innerHTML = `
        <i class="fa-solid ${iconClass} ${textColor} text-lg"></i>
        <span class="text-xs font-semibold leading-snug flex-1">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('opacity-0', '-translate-y-2');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}