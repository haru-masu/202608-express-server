import express, { Request, Response } from 'express';

const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('./public'));
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));

// JSONデータのファイルパス
const USER_DATA_PATH =
  path.join(__dirname, '..', 'data', 'users.json');

const QUESTIONNAIRE_DATA_PATH =
  path.join(__dirname, '..', 'data', 'questionnaires.json');


// testページ
app.get('/test', (req: Request, res: Response) => {

  const data = {
    title: 'タイトル',
    lists: [
      'リスト1',
      'リスト2',
      'リスト2',
      'リスト2'
    ]
  };

  res.render('test.ejs', data);
});


// ログインページ
app.get('/login', (req: Request, res: Response) => {

  res.render('login.ejs');

});


// ログインPOST
app.post('/login', async (req: Request, res: Response) => {

  const data = {
    userId: req.body.userId,
    userPassword: req.body.userPassword
  };

  try {

    const rawData =
      await fs.readFile(USER_DATA_PATH, 'utf-8');

    const users =
      JSON.parse(rawData);

    users.push(data);

    const saveData =
      JSON.stringify(users, null, 2);

    await fs.writeFile(
      USER_DATA_PATH,
      saveData,
      'utf-8'
    );

  } catch (error) {

    console.error(
      '登録エラー:',
      error
    );

    res.status(500).send(
      'サーバーエラーが発生しました'
    );

    return;
  }

  res.render(
    'mypage.ejs',
    data
  );
});


// アンケートページ
app.get(
  '/questionnaire',
  (req: Request, res: Response) => {

    res.render(
      'questionnaire.ejs'
    );

  }
);


// アンケートPOST
app.post(
  '/questionnaire',
  async (req: Request, res: Response) => {

    const data = {

      name:
        req.body.name,

      satisfaction:
        req.body.satisfaction,

      comment:
        req.body.comment
    };

    try {

      const rawData =
        await fs.readFile(
          QUESTIONNAIRE_DATA_PATH,
          'utf-8'
        );

      const questionnaires =
        JSON.parse(rawData);

      questionnaires.push(data);

      const saveData =
        JSON.stringify(
          questionnaires,
          null,
          2
        );

      await fs.writeFile(
        QUESTIONNAIRE_DATA_PATH,
        saveData,
        'utf-8'
      );

    } catch (error) {

      console.error(
        'アンケート保存エラー:',
        error
      );

      res.status(500).send(
        'サーバーエラーが発生しました'
      );

      return;
    }

    res.render(
      'thanks.ejs',
      data
    );
  }
);


// サーバー起動
app.listen(PORT, () => {

  console.log(
    `Server is running on http://localhost:${PORT}`
  );

});