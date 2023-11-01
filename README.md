# jumper-transration-template-message

このプログラムは、Jumper.aiのテンプレートメッセージとボタンタイトルを日本語化するためのものです。

## インストール

```sh
git clone https://github.com/mobilebiz/jumper-transration-template-message.git
cd jumper-transration-template-message
yarn install
```

## 翻訳エンジンの準備

今プログラムは、DeepLのフリーAPIを利用しています。  
登録は[こちら](https://www.deepl.com/ja/pro-api?cta=header-pro-api)から行えます。  
フリープランでは、1ヶ月50,000文字まで翻訳が可能です。  
アカウントが作成されたら、認証キーを取得してください。

## 環境設定

環境設定ファイル`.env.sample`を`.env`に名前を変えます。  
`.env`ファイルに書かれている`DEEPL_API_KEY`に取得した認証キーを設定します。

## テンプレートファイルの取得

Jumper.aiの管理コンソールにログインし、**Automations** > **Default templates** の **Conversations** タブを開きます。  
左側のdefault checkout messagesの方のCSVファイル`jumper-default-checkout-template-messages.csv`と、右側のthe buttons inside the default checkout journeyのCSVファイル`jumper-default-checkout-template-buttons.csv`の両方をダウンロードし、`csv`フォルダに格納してください。

## プログラムの実行

`node index.js`

プログラムの実行には数分かかりますので、そのままお待ち下さい。  
翻訳済みのファイルは、`messages-transrated.csv`と`buttons-transrated.csv`いう名前でcsvフォルダに格納されます。

ただし、翻訳結果はそのままでは日本語がおかしいので、csvを編集する必要があります。  
編集後のファイルをJumperに再度読み込ませれば完了です。
