<?php

  //  $url ='http://congress.api.sunlightfoundation.com/committees?apikey=3311b6f938a540aea04bc27c05bac1d7&per_page=all';

 $url ='http://104.198.0.197:8080/committees?apikey=3311b6f938a540aea04bc27c05bac1d7&per_page=all';

     if(isset($_GET['bioguideId'])){
         
         //http://congress.api.sunlightfoundation.com/bills?apikey=3311b6f938a540aea04bc27c05bac1d7&per_page=5&sponsor_id__in=A000371
         
         $url ='http://104.198.0.197:8080/committees?&apikey=3311b6f938a540aea04bc27c05bac1d7&per_page=5&member_ids='.$_GET['bioguideId'];
         
      /*   $url ='http://congress.api.sunlightfoundation.com/committees?&apikey=3311b6f938a540aea04bc27c05bac1d7&per_page=5&member_ids='.$_GET['bioguideId']; */
    } 

    $response = file_get_contents($url);
    //echo 'hello this is called';
    echo $response;

   
?>