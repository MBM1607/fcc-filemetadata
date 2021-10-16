import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config()

const app = express();
const upload = multer({ dest: 'uploads/'})

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
	res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
	console.log(req.file);
	res.json({
		name: req.file.originalname,
		type: req.file.mimetype,
		size: req.file.size,
	});
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log('Your app is listening on port ' + port)
});
