<?php

$service_url = 'http://192.168.99.100:8080/server/response.json';
$curl = curl_init($service_url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$curl_response = curl_exec($curl);
if ($curl_response === false) {
    $info = curl_getinfo($curl);
    curl_close($curl);
    die('error occured during curl exec. Additional info: ' . var_export($info));
} // CHANGE
curl_close($curl);

$results = json_decode($curl_response);

$allTitles = $results->atoz->tleo_titles;

foreach($allTitles as $title) {
  $titles[] = $title;
}

echo json_encode($titles);
?>
