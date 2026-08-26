import express, { Request, Response } from 'express';


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json()); //JSON形式のデータ をサーバー側で読み取れるようにする
app.use(express.static("./public")); //静的ファイルの指定


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express + TypeScript World!');
});


app.get('/test', (req: Request, res: Response) => {
  const data = {
    'title': 'タイトル',
    'lists': ['リスト1', 'リスト2', 'リスト2', 'リスト2']
  };

  res.render('test.ejs', data);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
