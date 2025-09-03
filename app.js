const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Beautiful Node App</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
            body { background-color: #f8f9fa; }
            .hero { background: linear-gradient(to right, #6a11cb, #2575fc); color: white; padding: 100px 0; text-align: center; }
        </style>
    </head>
    <body>
        <div class="hero">
            <h1 class="display-4">Welcome to My Beautiful App!</h1>
            <p class="lead">Deployed seamlessly with Docker and GitHub Actions on AWS EC2.</p>
            <button class="btn btn-light">Get Started</button>
        </div>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-4"><div class="card"><img src="https://via.placeholder.com/300x200" class="card-img-top"><div class="card-body"><h5 class="card-title">Feature 1</h5><p>Stunning visuals.</p></div></div></div>
                <div class="col-md-4"><div class="card"><img src="https://via.placeholder.com/300x200" class="card-img-top"><div class="card-body"><h5 class="card-title">Feature 2</h5><p>Responsive design.</p></div></div></div>
                <div class="col-md-4"><div class="card"><img src="https://via.placeholder.com/300x200" class="card-img-top"><div class="card-body"><h5 class="card-title">Feature 3</h5><p>Easy deployment.</p></div></div></div>
            </div>
        </div>
    </body>
    </html>
    `);
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});
