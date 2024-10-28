const express = require('express');
const db = require('./db');
const app = express();

const bosyParser = require('body-parser');
app.use(bodyParser.json());

const Person = require('./models/Person');

app.get('/', (req, res) => {
    res.send("Welcome")
})

app.post('/person', async (req, res) => {
    try {
        const data = req.body

        // Create a new Person decument using the Mongoose model
        const newPerson = new Person(data);

        // Save the new person in database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server Error' });

    }

})

app.get('/person', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server Error' });

    }
})

app.put('/person/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updateData = req.body;

        // Find and update the person by ID
        const updatedPerson = await Person.findOneAndUpdate(
            { _id: personId },           // Filter to find the document
            { $set: updateData },         // Data to update
            { new: true }                 // Return the updated document
        );

        if (!updatedPerson) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Data updated');
        res.status(200).json(updatedPerson);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server Error' });
    }
});

app.listen(3000, () => {
    console.log('listening on port 3000');
})