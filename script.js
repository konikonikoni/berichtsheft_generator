let currentStep = 1;
let totalSteps = 4;
const progressBar = document.getElementById('progress');
const container = document.querySelector('.container');

function nextStep() {
    // Increment currentStep
    currentStep++;

    // Show the next step
    showStep(currentStep);

    // Update progress bar
    updateProgressBar(currentStep);
}

function prevStep() {
    currentStep--;
    showStep(currentStep);
}

function showStep(step) {
    const steps = document.querySelectorAll('.container > div');
    steps.forEach((stepElement, index) => {
        if (index + 1 === step) {
            stepElement.style.display = 'block';
        } else {
            stepElement.style.display = 'none';
        }
    });

    updateProgressBar(step);
}

function updateProgressBar(step) {
    const progress = (step / (totalSteps+1)) * 100;
    progressBar.style.width = progress + '%';
}

function generateDays() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
            const day = getDayOfWeek(currentDate.getDay());

            // Convert the date to German date format
            const dateString = currentDate.toLocaleDateString('de-DE');

            const stepDiv = document.createElement('div');
            const stepHeader = document.createElement('h2');
            stepHeader.textContent = `${day}, ${dateString}`;
            const textArea = document.createElement('textarea');
            textArea.placeholder = `Themen des Unterrichts`;
            textArea.name = `workDetails_${dateString}`;

            // Set the size of the textarea
            textArea.style.width = '300px'; // Set the width
            textArea.style.height = '150px'; // Set the height

            // Create a line break element
            const lineBreak = document.createElement('br');

            const prevButton = document.createElement('button');
            prevButton.textContent = 'Back';
            prevButton.onclick = prevStep;

            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.onclick = nextStep;

            stepDiv.appendChild(stepHeader);
            stepDiv.appendChild(textArea);
            
            // Append line break after textarea
            stepDiv.appendChild(lineBreak);

            stepDiv.appendChild(prevButton);
            stepDiv.appendChild(nextButton);
            container.insertBefore(stepDiv, document.getElementById('submitButton'));
            totalSteps++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }

    nextStep();
}

function getDayOfWeek(dayIndex) {
    const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    return days[dayIndex];
}

function showOverview() {
    // Get input values
    const name = document.getElementById('name').value;
    const className = document.getElementById('className').value;
    const lernfeld = document.getElementById('lernfeld').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    // Generate overview
    let overview = `
    <strong>Name:</strong> ${name}<br>
    <strong>Class Name:</strong> ${className}<br>
    <strong>Lernfeld:</strong> ${lernfeld}<br>
    <strong>Start Date:</strong> ${startDate}<br>
    <strong>End Date:</strong> ${endDate}<br>
    <strong>Work Details:</strong><br>
    `;

    // Loop through dynamically generated textareas to get work details
    const workDetails = document.querySelectorAll('textarea');
    workDetails.forEach((textArea, index) => {
        const day = getDayOfWeek(index % 5 + 1); // Modulo 5 to handle weekends
        const date = new Date(startDate);
        date.setDate(date.getDate() + index);
        const dateString = date.toLocaleDateString('de-DE');
        overview += `<strong>${day}, ${dateString}:</strong> ${textArea.value}<br>`;
    });

    // Display the overview
    document.getElementById('overviewContent').innerHTML = overview;
    document.getElementById('overviewSection').style.display = 'block';
}

function submitForm() {
    alert('Berichtsheft wird heruntergeladen!');
    // You can submit the form here
}
