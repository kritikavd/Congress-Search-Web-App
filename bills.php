<?php


//$url ='http://104.198.0.197:8080/committees?apikey=3311b6f938a540aea04bc27c05bac1d7&per_page=all';
    $url ='http://104.198.0.197:8080/bills?apikey=3311b6f938a540aea04bc27c05bac1d7&per_page=50';
    //$url ='http://congress.api.sunlightfoundation.com/bills?apikey=3311b6f938a540aea04bc27c05bac1d7&per_page=50';

     if(isset($_GET['bioguideId'])){
         
         //http://congress.api.sunlightfoundation.com/bills?apikey=3311b6f938a540aea04bc27c05bac1d7&per_page=5&sponsor_id__in=A000371
         
         $url ='http://104.198.0.197:8080/bills?&apikey=3311b6f938a540aea04bc27c05bac1d7&per_page=5&sponsor_id__in='.$_GET['bioguideId'];
         
         /*$url ='http://congress.api.sunlightfoundation.com/bills?&apikey=3311b6f938a540aea04bc27c05bac1d7&per_page=5&sponsor_id__in='.$_GET['bioguideId'];
         */
    } 

    if(isset($_GET['bill_id'])){
         
         //http://congress.api.sunlightfoundation.com/bills?apikey=3311b6f938a540aea04bc27c05bac1d7&per_page=5&sponsor_id__in=A000371
         
         $url ='http://104.198.0.197:8080/bills?&apikey=3311b6f938a540aea04bc27c05bac1d7&per_page=5&bill_id='.$_GET['bill_id'];
         
         /*$url ='http://congress.api.sunlightfoundation.com/bills?&apikey=3311b6f938a540aea04bc27c05bac1d7&per_page=5&sponsor_id__in='.$_GET['bioguideId'];
         */
    } 

    $response = file_get_contents($url);
    //echo 'hello this is called';
    echo $response;

   
?>