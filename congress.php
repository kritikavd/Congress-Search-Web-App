<?php



   // $url ='http://congress.api.sunlightfoundation.com/legislators?&apikey=3311b6f938a540aea04bc27c05bac1d7&per_page=all';

 $url ='http://104.198.0.197:8080/legislators?&apikey=3311b6f938a540aea04bc27c05bac1d7&per_page=all';


    if(isset($_GET['bioguideId'])){
        
        $url ='http://104.198.0.197:8080/legislators?&apikey=3311b6f938a540aea04bc27c05bac1d7&per_page=all&bioguide_id='.$_GET['bioguideId'];

        
        /* $url ='http://congress.api.sunlightfoundation.com/legislators?&apikey=3311b6f938a540aea04bc27c05bac1d7&bioguide_id='.$_GET['bioguideId'];
        */
    } 
    $response = file_get_contents($url);
    //echo 'hello this is called';
    echo $response;
?>

