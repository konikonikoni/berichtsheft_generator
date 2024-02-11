let currentStep = 1;
const totalSteps = 4; // Total number of steps

function nextStep() {
    const currentStepDiv = document.getElementById(`step${currentStep}`);
    currentStepDiv.classList.remove('active');
    currentStep++;

    // Update progress bar
    const progressBar = document.querySelector('.progress');
    const progress = (currentStep / totalSteps) * 100;
    progressBar.style.width = `${progress}%`;

    if (currentStep > totalSteps) {
        // Reached the last step, submit the form or do something else
        alert("Form submitted!");
        return;
    }

    const nextStepDiv = document.getElementById(`step${currentStep}`);
    nextStepDiv.classList.add('active');
}

function generateDays() {
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    const daysDifference = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

    const workDetailsDiv = document.getElementById('workDetails');
    workDetailsDiv.innerHTML = '';

    for (let i = 0; i <= daysDifference; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        const dateString = currentDate.toISOString().split('T')[0];
        const day = getDayOfWeek(currentDate.getDay());

        const textArea = document.createElement('textarea');
        textArea.placeholder = `${day}, ${dateString}: Enter work details`;
        textArea.name = `workDetails_${dateString}`;
        workDetailsDiv.appendChild(textArea);
    }

    nextStep();
}

function getDayOfWeek(dayIndex) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
}
