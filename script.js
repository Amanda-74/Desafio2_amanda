document.addEventListener('DOMContentLoaded', function () {
    let totalIncome = 800;
    let totalExpense = 300;
    let incomeTransactions = 2; // numero inicial de transacciones
    let expenseTransactions = 0;

    // Actualizar
    function updateUI() {
        document.getElementById('balance').textContent = `+${(totalIncome - totalExpense).toFixed(2)}`;
        document.getElementById('income-value').textContent = `+${totalIncome.toFixed(2)} (${incomeTransactions} transacciones)`;
        document.getElementById('expense-value').textContent = `-${totalExpense.toFixed(2)} (${expenseTransactions} transacciones)`;
        const percentage = totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 0;
        document.getElementById('expense-percentage').textContent = `${percentage.toFixed(2)}%`;
    }

    // Agregar una nueva transaccion
    function addTransaction() {
        const type = document.getElementById('transaction-type').value;
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);

        if (!description || isNaN(amount) || amount <= 0) {
            alert('Por favor ingresa una descripción válida y un monto positivo.');
            return;
        }

        const transactionList = document.getElementById(`${type}-transactions`);
        const transactionDiv = document.createElement('div');
        transactionDiv.classList.add('transaction');
        
        if (type === 'expense') {
            transactionDiv.classList.add('expense');
            const expensePercentage = (amount / totalIncome) * 100;
            transactionDiv.innerHTML = `<span>${description}</span><span class="amount">-${amount.toFixed(2)}</span><span class="percentage">(${expensePercentage.toFixed(2)}%)</span>`;
            expenseTransactions++;
        } else {
            transactionDiv.innerHTML = `<span>${description}</span><span class="amount">+${amount.toFixed(2)}</span>`;
            incomeTransactions++;
        }

        transactionList.appendChild(transactionDiv);

        if (type === 'income') {
            totalIncome += amount;
        } else {
            totalExpense += amount;
        }

        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';

        updateUI();
    }

    // Mostrar transacciones (ingresos o egresos)
    function showTransactions(type) {
        const incomeTab = document.getElementById('income-transactions');
        const expenseTab = document.getElementById('expense-transactions');

        if (type === 'income') {
            incomeTab.style.display = 'block';
            expenseTab.style.display = 'none';
        } else {
            incomeTab.style.display = 'none';
            expenseTab.style.display = 'block';
        }

        document.querySelectorAll('.tab button').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.tab button[onclick="showTransactions('${type}')"]`).classList.add('active');
    }

    //showTransactions
    window.showTransactions = showTransactions;

    // Agregar transacciones
    document.getElementById('add-transaction').addEventListener('click', addTransaction);

    // Ingresos
    showTransactions('income');

    // Actualizar UI
    updateUI();
});
