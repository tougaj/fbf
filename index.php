<?php
header('Cache-Control: public, max-age=900');
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="ua">
    <head>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-114710599-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-114710599-1');
        </script>
        
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Facebook Friends</title>


        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet"> 
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
		<link rel="stylesheet" href="css/fbf.css?ts=[[0000000000]]">
    </head>
    <body>
        <div id="app"></div>

        <!-- <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h3 class="text-center">Додайте html-код в текстову область та оберіть дію</h3>
                    <textarea name="ta" id="ta" class="form-control" rows="10" placeholder="html-код елементу, що містить записи про друзів (підписників)" autocomplete="off"></textarea>
                    <form name="fmGetFriends" id="fmGetFriends" action="getFriends.php" method="post" class="form-inline text-center" target="_blank">
                        <input type="hidden" name="smID" id="smID">
                        <div class="form-group">
                            <label class="control-label" for="fake_smID">Соціальна мережа</label>
                            <select name="fake_smID" id="fake_smID" class="form-control" autocomplete="off" readonly="readonly" disabled>
                                <option value="0" disabled selected>Не визначено</option>
                                <option value="1">Facebook</option>
                                <option value="2">Вконтакте</option>
                                <option value="3">Одноклассники</option>
                            </select>
                        </div>
                        <div class="form-group ml-2">
                            <label class="control-label" for="relationType">Тип відношень</label>
                            <select name="relationType" id="relationType" class="form-control" autocomplete="off">
                                <option value="0" disabled selected>Не визначено</option>
                                <option value="1">Друзі</option>
                                <option value="2">Підписники</option>
                            </select>
                        </div>
                        <div class="form-group ml-2">
                            <label class="control-label" for="filename">Ім'я вихідного файлу</label>
                            <input type="text" class="form-control" name="filename" id="filename" placeholder="Ім'я вихідного файлу" autocomplete="off">
                        </div>
                        <div class="checkbox">
                            <label>
                                <input name="withfaces" type="checkbox" checked autocomplete="off"> Додати до вихідного файлу зображення обліковок
                            </label>
                        </div>
                        <input type="hidden" name="data">
                        <input type="hidden" name="fileno" value="0">
                        <div class="btn-group btn-group-lg btn-group-justified" role="group">
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-default" id="btnFriends"><i class="fa fa-user fa-lg"></i> Показати обліковки <span></span></button>
                            </div>
                            <div class="btn-group" role="group">
                                <button type="submit" class="btn btn-primary" id="btnDownload"><i class="fa fa-download fa-lg"></i> Отримати файл</button>
                            </div>
                        </div>
                    </form>
                    <div class="row" id="divFriends"></div>
                </div>
            </div>
        </div> -->

<?php
include_once 'includes/symbol-defs.svg';
?>        
    <!-- <svg >
		<use xlink:href="#icon-download"></use>
	</svg> -->
        <!-- Load React. -->
        <script src="js/vendors~main.bundle.js?ts=[[0000000000]]"></script>
        <script src="js/main.bundle.js?ts=[[0000000000]]"></script>

    </body>
</html>