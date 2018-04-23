<?php
header('Cache-Control: public, max-age=900');
header('Content-Type: text/html; charset=utf-8');
$nRevision = 2;
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

		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css">
		<link rel="stylesheet" href="fbf.css?rev=<?php echo $nRevision; ?>">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h3 class="text-center">Додайте html-код в текстову область та оберіть дію</h3>
                    <textarea name="ta" id="ta" class="form-control" rows="10" placeholder="html-код елементу, що містить записи про друзів (підписників)" autocomplete="off"></textarea>
                    <form name="fmGetFriends" id="fmGetFriends" action="getFriends.php" method="post" class="form-inline text-center" target="_blank">
                        <input type="hidden" name="smID" id="smID">
                        <div class="form-group">
                            <label for="fake_smID">Соціальна мережа</label>
                            <select name="fake_smID" id="fake_smID" class="form-control" autocomplete="off" readonly="readonly" disabled>
                                <option value="0" disabled selected>Не визначено</option>
                                <option value="1">Facebook</option>
                                <option value="2">Вконтакте</option>
                                <option value="3">Одноклассники</option>
                            </select>
                        </div>
                        <input type="hidden" name="relationType" id="relationType">
                        <div class="form-group ml-2">
                            <label for="fake_relationType">Тип відношень</label>
                            <select name="fake_relationType" id="fake_relationType" class="form-control" autocomplete="off" readonly="readonly" disabled>
                                <option value="0" disabled selected>Не визначено</option>
                                <option value="1">Друзі</option>
                                <option value="2">Підписники</option>
                            </select>
                        </div>
                        <div class="form-group ml-2">
                            <label for="filename">Ім'я вихідного файлу</label>
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
        </div>
        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<!--        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>-->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.5/lodash.min.js"></script>
        <!-- Include all compiled plugins (below), or include individual files as needed -->
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>		
        <script src="fbf.js?rev=<?php echo $nRevision; ?>"></script>

        <!-- Шаблон для отрисовки пользователя -->
        <script type="text/template" id="tmplUserAccount">
            <div class="col-md-4">
                <a target="_blank" href="<%-link%>">
                    <div class="media" data-id="<%-id%>">
                        <div class="media-left">
                            <img class="media-object img-thumbnail imf-rounded" src="<%-img%>">
                        </div>
                        <div class="media-body media-middle">
                            <h4><%-title%></h4>
                            <small>(ID: <%-id%>)</small>
                            <i class="fa fa-<%-icon%> fa-lg fa-fw"></i>
                        </div>
                    </div>
                </a>
            </div>
        </script>
    </body>
</html>