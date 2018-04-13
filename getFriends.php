<?php
header("Cache-control: no-cache, must-revalidate");
header("Content-type: text/json, charset=utf-8");
// В файле php.ini нужно установить параметр
// date.timezone = Europe/Kiev;
$sOutputFileName = filter_input(INPUT_POST, 'filename');
if (empty($sOutputFileName)) $sOutputFileName = date('Ymd_His');

// $nFileNo = filter_input(INPUT_POST, 'fileno', FILTER_VALIDATE_INT);
// $sOutputFileName .= '_' . $nFileNo . '.json';

$sOutputFileName .= '.json';

header('Content-Disposition: attachement; filename="' . $sOutputFileName . '";');

// $sData = filter_input(INPUT_GET, 'data', FILTER_DEFAULT);
// $data = json_decode($sData);
// echo json_encode($data);

$sWF = filter_input(INPUT_POST, 'withfaces');
$fWithFaces = (!empty($sWF) && $sWF);

$sData = urldecode(filter_input(INPUT_POST, 'data', FILTER_DEFAULT));
// $sData = iconv('UTF-8', 'windows-1251', filter_input(INPUT_POST, 'data', FILTER_DEFAULT));
// echo $sData;
// exit(0);
$data = json_decode($sData);

// Изображения
foreach ($data as $value) {
    $handle = $fWithFaces ? @fopen($value->face, 'rb') : null;
    $value->face = '';
    if ($handle){
        $buf = stream_get_contents($handle);
        fclose($handle);

        $value->face = base64_encode($buf);

        // $sFileName = 'c:\\Temp\\' . $value->fbID . '.jpeg';
        // $outFile = fopen($sFileName, 'wb');
        // fwrite($outFile, base64_decode($value->face));
        // fclose($outFile);
    }
    // usleep(10*1000);
}

echo json_encode($data);

?>