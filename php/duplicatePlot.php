<?php

error_reporting(0);

require '../class/db.class.php';
require '../class/conf.class.php';

require 'duplication.php';

setlocale(LC_ALL,"es_ES@euro","es_ES","esp");
date_default_timezone_set('Europe/Madrid');

$bd = Db::getInstance();

$id = $_REQUEST['id'];
$name = $_REQUEST['name'];
$description = $_REQUEST['description'];
$time = $_REQUEST['time'];
$type = $_REQUEST['type'];
$public = $_REQUEST['public'];
$userId = $_REQUEST['user_id'];
$userName = $_REQUEST['user_name'];

if($id != null){
	echo duplicatePlot($id, $name, $description, $time, $type, $public, $userId, $userName, $bd);
}
?>