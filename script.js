let currentStep = 1;
const totalSteps = 7; // Total number of steps

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