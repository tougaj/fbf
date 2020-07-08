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

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'UA-114710599-1');
    </script>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Facebook Friends</title>

    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <link rel="stylesheet" href="css/fbf.css?ts=1594198637677">
</head>

<body>
    <div id="app"></div>

    <?php
    include_once 'includes/symbol-defs.svg';
    ?>
    <script src="js/vendors~main.bundle.js?ts=1594198637677"></script>
    <script src="js/main.bundle.js?ts=1594198637677"></script>

</body>

</html>