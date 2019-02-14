const port = process.env.PORT || 8082;
const reportGenerator = require('./controllers/reportGenerator');
const app = require('express')();
app.use(require('cors')());
app.use(require('body-parser').json());
app.use(require('morgan')());

app.get('/pdf', (req, res) => reportGenerator.handleReportGeneration(req, res));

app.listen(port, () => console.log(`Server running on port ${port}`));
