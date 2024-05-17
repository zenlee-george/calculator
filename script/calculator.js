document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('input[type="button"]');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.value;

            if (value === '=') {
                try {
                    display.value = evaluateExpression(display.value);
                } catch {
                    display.value = 'Error';
                }
            } else if (value === 'C') {
                display.value = '';
            } else if (value === '⌫') {
                display.value = display.value.slice(0, -1);
            } else {
                display.value += value;
            }
        });
    });

    function evaluateExpression(expr) {
        // Replace special symbols with JavaScript operators
        expr = expr.replace(/x/g, '*').replace(/,/g, '');

        // Handle factorial separately
        expr = expr.replace(/(\d+)!/g, (match, p1) => factorial(parseInt(p1)));

        // Evaluate trigonometric and logarithmic functions
        expr = expr.replace(/cos\(([^)]+)\)/g, (match, p1) => Math.cos(toRadians(eval(p1))));
        expr = expr.replace(/sin\(([^)]+)\)/g, (match, p1) => Math.sin(toRadians(eval(p1))));
        expr = expr.replace(/tan\(([^)]+)\)/g, (match, p1) => Math.tan(toRadians(eval(p1))));
        expr = expr.replace(/log\(([^)]+)\)/g, (match, p1) => Math.log10(eval(p1)));
        expr = expr.replace(/log10\(([^)]+)\)/g, (match, p1) => Math.log10(eval(p1)));
        expr = expr.replace(/ln2/g, Math.LN2);
        expr = expr.replace(/l2e/g, Math.LOG2E);
        expr = expr.replace(/l10e/g, Math.LOG10E);
        expr = expr.replace(/exp\(([^)]+)\)/g, (match, p1) => Math.exp(eval(p1)));
        expr = expr.replace(/sqrt\(([^)]+)\)/g, (match, p1) => Math.sqrt(eval(p1)));
        expr = expr.replace(/π/g, Math.PI);
        expr = expr.replace(/E/g, Math.E);

        return eval(expr);
    }

    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    function factorial(n) {
        if (n === 0 || n === 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }
});
