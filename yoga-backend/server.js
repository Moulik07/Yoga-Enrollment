const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://moulikarora07:helloworld@yogaenrollment.9rjt3ur.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.post('/submit-form', (req, res) => {
    const { name, age, batch } = req.body;
    const parsedAge = parseInt(age, 10); // Ensure age is an integer

    if (!name || isNaN(parsedAge) || parsedAge < 18 || parsedAge > 65 || !batch) {
        return res.status(400).send({ message: 'Invalid submission. Please check the data.' });
    }

    try {
        let db = JSON.parse(fs.readFileSync('db.json'));

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        // Check for duplicate enrollment (same name and age within the same month)
        const isDuplicateEnrollment = db.submissions.some(submission => {
            const submissionDate = new Date(submission.enrollmentDate);
            return submission.name === name && 
                   parseInt(submission.age, 10) === parsedAge &&
                   submissionDate.getFullYear() === currentYear && 
                   submissionDate.getMonth() === currentMonth;
        });

        if (alreadyEnrolledThisMonth) {
            // If duplicate found, send an error response
            return res.status(400).send({ message: 'User is already enrolled in a batch for this month.' });
        }

        // If no duplicate, add the new submission
        db.submissions.push({ ...req.body, enrollmentDate: currentDate.toISOString() });
        fs.writeFileSync('db.json', JSON.stringify(db));

        res.status(200).send({ message: 'Form submitted successfully', data: { name, age, batch } });
    } catch (error) {
        res.status(500).send({ message: 'Server error. Please try again later.' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
