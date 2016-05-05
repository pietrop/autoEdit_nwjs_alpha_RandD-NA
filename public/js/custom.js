/*
autoEdit, paperEditing D&D from transcript to paperEdit.
Two lists multiSelectable, sortable, draggable.
Using unstyled list, with non draggable Questions, and Headings in the lists.
https://github.com/shvetsgroup/jquery.multisortable

Should be changed from ul li to p span tags, to allow for HTML5 compatibility
*/
jQuery(function ($) {
    var papercuts = document.getElementById("transcription1").getElementsByClassName("child");
    //initialise multisortable lists, for transcriptions and paperedit list
    // $('article.sortable#transcription2,article.sortable#transcription1,article.sortable#paperedit').multisortable({
    //     //excluding Question and Heading section from d&d
    //     items: "span:not(.question,.heading)",
    //     //selectedClass: "child",
    //     //click: function(e){ console.log("I'm selected."); },
    //     stop: function (e) {
    //         //console.log("I've been sorted.");
    //         //make ajax call to save paperCuts server side.
    //         //on drop in paperEdit, an ajax request needs to update the papercuts on the server side.
    //         //in order to do do that it needs to get paperCuts elements from paperEdit list
    //         //with an on drop event listener to save list everytime things moved about in paper edit.
    //         console.log(papercuts);
    //     }
    // });

    //connecting multiple of transcriptions to the paperEdit.
    $('article#transcription1').sortable('option', 'connectWith', 'article#paperedit');
    $('article#transcription2').sortable('option', 'connectWith', 'article#paperedit');
    $('article#paperedit').sortable('option', 'connectWith', 'article#paperedit');
    
 
    
    //keyboard shortcut using mouse trap to make selection transcript to paperEdit
    //select words shift+click to select multiple faster. 
    //cmd+right, be default they are dropped, at end of Main heading
    //https://craig.is/killing/mice
 //    Mousetrap.bind('command+right', function (e) {
 //        //need to select transcript in focus for shortcut to work properly
 //        //encapsulate keybind in function and pass transcript to it?
 //        var transcriptSelection = document.getElementById("transcription1");
 //        var selection = transcriptSelection.getElementsByClassName("selected");
 //        var paperedit = document.getElementById("paperedit");
 //        //append words in transcript selection to paperEdit
 //        var nodesToMove = [];
 //        for (var i = 0; i <= selection.length; i++) {
 //            nodesToMove.push(selection[i]);
 //        }
 //        for (var i = 0; i <= nodesToMove.length; i++) {
 //            $(nodesToMove[i]).insertBefore("#concl");
 //            //paperedit.appendChild(nodesToMove[i]);
 //        }
 //        //make ajax call
 //        //console.log(papercuts);
 //        return false;
	// });

/* *
* HyperTranscript Search function
* Word accurate, highlights the line in yellow, and makes matched word bold.
* It does so by switching CSS classes.
* */
/////////////////////////// word accurate search///////////////////////////////////
    // $("#search-criteria").keypress(function(){
    //     var txt = $('#search-criteria').val();
    //     console.log(txt);
    //     if (txt == ""){
    //         $( '.child' ).css( "background-color", "" );
    //         $( '.child' ).css( "background-color", "" );
    //         $( '.child' ).css( "font-weight", "" );
    //     }else {
    //         $( '.child' ).css( "background-color", "" );
    //         $( '.child' ).css( "background-color", "" );
    //         $( '.child' ).css( "font-weight", "" );
    //         $( '.child:contains("'+txt+'")' ).css( "background-color", "yellow" );
    //         $( '.child:contains("'+txt+'")' ).css( "font-weight", "bold" );
    //     }
    // });
    // $("#search-criteria").keyup(function(){
    //     var txt = $('#search-criteria').val();
    //     console.log(txt);
    //     if (txt === ""){
    //         $( '.child' ).css( "background-color", "" );
    //         $( '.child' ).css( "background-color", "" );
    //         $( '.child' ).css( "font-weight", "" );
    //     }else {
    //         $( '.child' ).css( "background-color", "" );
    //         $( '.child' ).css( "background-color", "" );
    //         $( '.child' ).css( "font-weight", "" );
    //         $( '.child:contains("'+txt+'")' ).css( "background-color", "yellow" );
    //         $( '.child:contains("'+txt+'")' ).css( "font-weight", "bold" );
    //     }
    // });
/////////////////////end  word accurate search///////////////////////////////////

});