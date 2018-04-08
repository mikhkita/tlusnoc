$(document).ready(function(){	

    var isDesktop = false,
        isTablet = false,
        isMobile = false,
        isRetina = retina();

    function resize(){
       if( typeof( window.innerWidth ) == 'number' ) {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || 
        document.documentElement.clientHeight ) ) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }

        if( myWidth > 1179 ){
            isDesktop = true;
            isTablet = false;
            isMobile = false;
        }else if( myWidth > 767 && myWidth < 1180 ){
            isDesktop = false;
            isTablet = true;
            isMobile = false;
        }else{
            isDesktop = false;
            isTablet = false;
            isMobile = true;
        }
    }
    $(window).resize(resize);
    resize();

    function retina(){
        var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
            (min--moz-device-pixel-ratio: 1.5),\
            (-o-min-device-pixel-ratio: 3/2),\
            (min-resolution: 1.5dppx)";
        if (window.devicePixelRatio > 1)
            return true;
        if (window.matchMedia && window.matchMedia(mediaQuery).matches)
            return true;
        return false;
    }

    $.fn.placeholder = function() {
        if(typeof document.createElement("input").placeholder == 'undefined') {
            $('[placeholder]').focus(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function() {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur().parents('form').submit(function() {
                $(this).find('[placeholder]').each(function() {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });
            });
        }
    }

    $.fn.placeholder();

    if(isRetina){
        $("*[data-retina]").each(function(){
            var $this = $(this),
                img = new Image(),
                src = $this.attr("data-retina");

            img.onload = function(){
                $this.attr("src", $this.attr("data-retina"));
            };
            img.src = src;
        });
    }

    function WhiteBlockHeight(){

        $(".white-block").removeAttr( 'style' );

        var maxHeight = $(".white-block").height();
 
        $(".white-block").each(function(){
          if ( $(this).height() > maxHeight ) 
          { 
            maxHeight = $(this).height();
          }
        });
         
        $(".white-block").height(maxHeight);

    }

    function ServiceItemBlockHeight(){

        $(".item-service").css("height","");

        var maxHeight = $(".item-service").height();
 
        $(".item-service").each(function(){
          if ( $(this).height() > maxHeight ) 
          { 
            maxHeight = $(this).height();
          }
        });
         
        $(".item-service").height(maxHeight);
    }
    function AboutItemBlockHeight(){

        $(".b-about-blocks-item").css("height","");

        var maxHeight = $(".b-about-blocks-item").height();
 
        $(".b-about-blocks-item").each(function(){
          if ( $(this).height() > maxHeight ) 
          { 
            maxHeight = $(this).height();
          }
        });
         
        $(".b-about-blocks-item").height(maxHeight);
    }
    function BankInfoBlockHeight(){

        var imgHeight = $('.b-top-bank img').height();
        $(".b-bank-info").css("min-height",imgHeight);
    
    }

    window.onload = function() {
        if(!isMobile) {
            WhiteBlockHeight();
            ServiceItemBlockHeight();
            AboutItemBlockHeight();
            BankInfoBlockHeight();
        }
    };
    $( window ).resize(function() {
        if (!isMobile) {
            WhiteBlockHeight();
            ServiceItemBlockHeight();
            AboutItemBlockHeight();
        }
    });
    

    $('.cabinet').on('click', function(event){
        $('.cabinet-bubble').toggleClass("bubble-active");
        event.stopPropagation();
    });
    $('.fancy').on('click', function(){
        if($(this).attr("data-goal")){
            $('#b-popup-app').find("form").attr("data-goal", $(this).attr("data-goal"));
        }
    });

    var slideout = new Slideout({
        'panel': document.getElementById('panel-page'),
        'menu': document.getElementById('mobile-menu'),
        'side': 'right',
        'padding': 256,
        'touch': false
    });

    $('.mobile-menu').removeClass("hide")

    $('.burger-menu').click(function() {
        slideout.open();
        $(".b-menu-overlay").show();
        return false;
    });
    $('.b-menu-overlay').click(function() {
        slideout.close();
        $('.b-menu-overlay').hide();
        return false;
    });

    slideout.on('open', function() {
        $('.burger-menu').addClass("menu-on");
        $(".b-menu-overlay").show();
    });

    slideout.on('close', function() {
        $('.burger-menu').removeClass("menu-on");
        setTimeout(function(){
            $("body").unbind("touchmove");
            $(".b-menu-overlay").hide();
        },100);
    });

    var e = $('.b-menu-overlay, .mobile-menu');

    e.touch();

    e.on('swipeRight', function(event) {
        slideout.close();
    });

    $('.b-services .choice-block a').click(function(e) {
        e.preventDefault();
        if ($(this).hasClass('deactive')) {

        }
        else{
            $('.b-services .choice-block .active').removeClass('active');
            $(this).addClass('active');
            var tab = $(this).attr('href');
            $('.b-choice-item').removeClass('hide');

            $('.b-choice-item').not(tab).addClass('hide');
            $(tab).fadeIn(400);
        }
        return false;
    });
    
    $('.b-calc .choice-block a').click(function(e) {
        e.preventDefault();
        if ($(this).hasClass('deactive')) {

        }
        else{
            $('.b-calc .choice-block .active').removeClass('active');
            $(this).addClass('active');
        }
        return false;
    });
    $('.b-calc-item select').styler();
    

    // function toggleBlock($this){
    //     $this.siblings(".choice-item").each(function(){
    //         var block = $(this).attr("data-block");
    //         $('.'+block).addClass("hide");
    //         $(this).removeClass("active");
    //     });
    //     var block = $this.attr("data-block");
    //     $('.'+block).removeClass("hide");
    //     $this.addClass("active");
    //     if(!!$this.attr("id") && $this.attr("data-hash") === "true"){
    //         if(history.pushState) {
    //             history.pushState(null, null, "#"+$this.attr("id"));
    //         }else{
    //             location.hash = "#"+$this.attr("id");
    //         } 
    //     }
        
    // }

    $('.b-slider').slick({
        dots: false,
        arrows: true,
        nextArrow: '<div class="b-block"><div class="icon-arrow-right b-slider-arrows" aria-hidden="true"></div></div>',
        prevArrow: '<div class="b-block"><div class="icon-arrow-left b-slider-arrows" aria-hidden="true"></div></div>',
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 600,
        autoplay: true,
        autoplaySpeed: 3000,
    });

    $('.b-top-bank-slider').slick({
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 600,
        autoplay: false,
        asNavFor: '.b-bank-slider',
    });
    $('.b-bank-slider').slick({
        dots: false,
        arrows: true,
        nextArrow: '<div class="icon-arrow-right b-bank-arrows" aria-hidden="true"></div>',
        prevArrow: '<div class="icon-arrow-left b-bank-arrows" aria-hidden="true"></div>',
        infinite: true,
        asNavFor: '.b-top-bank-slider',
        focusOnSelect: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        speed: 600,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
              breakpoint: 1100,
              settings: {
                slidesToShow: 4
              }
            },
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 1
              }
            },
        ]
    });

     periodInDays = 30;

     $('.period-items a').on('click', function(event){
            $('.period-items a').each(function() {
                $(this).removeClass("period-active");
            });
            $(this).addClass("period-active");
            if($(this).hasClass("days")){
                $('input[name="period"]').val(30).removeClass("hide");
                $('.period-slider').removeClass("hide");
                $('.period-datepicker').addClass("hide");
                $('.period-start').val("");
                $('.period-finish').val("");
                calcDays(1);
                calcPrice();
            }else if($(this).hasClass("months")){
                $('input[name="period"]').val(1).removeClass("hide");
                $('.period-slider').removeClass("hide");
                $('.period-datepicker').addClass("hide");
                $('.period-start').val("");
                $('.period-finish').val("");
                calcDays(1);
                calcPrice();
            }else{
                //скрыть инпкут и слайдер
                $('input[name="period"]').val("1").addClass("hide");
                $('.period-slider').addClass("hide");
                $('.period-datepicker').removeClass("hide");

                calcDays(0);
                calcPrice();
            }
        });
     var dataSum = [
[1,50000],
[50000,100000],
[100001,200000],
[200001,300000],
[300001,400000],
[400001,500000],
[500001,600000],
[600001,700000],
[700001,800000],
[800001,900000],
[900001,1000000],
[1000001,1500000],
[1500001,2000000],
[2000001,2500000],
[2500001,3000000],
[3000001,3500000],
[3500001,4000000],
[4000001,4500000],
[4500001,5000000],
[5000001,5500000],
[5500001,6000000],
[6000001,6500000],
[6500001,7000000],
[7000001,7500000],
[7500001,8000000],
[8000001,8500000],
[8500001,9000000],
[9000001,9500000],
[9500001,10000000],
[10000001,11000000],
[11000001,12000000],
[12000001,13000000],
[13000001,14000000],
[14000001,15000000],
[15000001,600000000]];

var dataPeriod = [[1,29],[30,59],[60,89],[90,119],[120,149],[150,179],[180,209],[210,239],[240,269],[270,299],[300,329],[330,366],[367,389],[390,419],[420,449],[450,479],[480,509],[510,539],[540,569],[570,599],[600,629],[630,659],[660,689],[690,720]];

    var data = [[3000,3000,3000,3000,3000,3000,3000,3000,3500,4000,4500,4700,5000,9000,9000,9000,9000,9000,9000,9000,9000,9000,9000,9000],
[6500,6500,6500,6500,6500,6500,6500,6500,6500,6500,6500,6500,6500,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000,10000],
[9000,9000,9000,9000,9000,9000,9000,9000,9000,9000,9000,9500,10200,11000,11700,12500,13300,14000,14700,15500,16300,17100,17800,18900],
[15000,15000,15000,15000,15000,15000,15000,15000,15000,15000,15000,15500,16800,18100,19300,20600,21900,23100,24400,25700,26900,28200,29500,31200],
[17700,17800,17800,17800,17800,17800,17800,17800,17800,17800,19500,21200,23000,24700,26500,26500,28100,31600,33500,35100,36900,38600,40300,42700],
[20500,20500,20500,20500,21000,21500,21500,21500,21500,21500,23000,25000,27000,29000,31200,33500,35500,37500,39500,41500,43500,45300,47500,50500],
[21300,21300,21300,21500,21700,21900,21900,21900,22000,24000,26500,29000,31000,34000,36000,39000,41000,44000,46000,49000,51500,54000,56500,58000],
[24000,24000,24000,24200,25000,25500,25500,25500,26000,28500,31500,34500,37000,40000,43000,45000,48500,51500,54500,57500,60000,62000,63500,67000],
[27100,27100,27100,27100,27800,28300,28700,28700,29500,32800,36000,39300,42600,45800,49100,52400,55700,59000,62300,65200,66200,69400,72500,76000],
[29500,29500,29500,29600,30500,30900,32300,32300,33200,37000,40600,44300,48000,51500,55200,58000,62500,66200,68500,71000,74500,78000,81500,86500],
[31700,31700,31700,31700,32600,33100,34400,34500,35300,39200,42800,46900,50800,54700,58700,62600,66500,70500,74100,75000,78700,82500,86200,94500],
[2,2,2.00,2.00,2.00,2.00,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.60,10],
[2,2,2.00,2.00,2.00,2.00,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.60,10],
[2,2,2.00,2.00,2.00,2.00,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.00,2.00,2.00,2.00,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.00,2.00,2.00,2.00,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.69,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.69,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.69,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.69,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.69,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.69,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.69,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.69,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.69,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.72,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.74,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.77,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[2,2,2.82,3.5,3.5,3.5,3.75,4,4.1,4.2,4.3,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[1,1.5,2.5,3,3.1,3.3,3.5,3.7,3.9,4.1,4.34,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[1,1.5,2.5,3,3.1,3.3,3.5,3.7,3.9,4.1,4.34,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[1,1.5,2.5,3,3.1,3.3,3.5,3.7,3.9,4.1,4.34,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[1,1.5,2.5,3,3.1,3.3,3.5,3.7,3.9,4.1,4.34,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[1,1.5,2.5,3,3.1,3.3,3.5,3.7,3.9,4.1,4.34,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10],
[1,1.5,2.50,3,3.1,3.3,3.5,3.7,3.9,4.1,4.34,4.9,5.2,5.4,5.6,5.8,7.14,7.55,7.96,8.37,8.78,9.19,9.6,10]];

     function calcPrice(){
        var row,
            column,
            res = 0,
            sum = $('input[name="sum"]').val();
        //найти столбец (сумма)
        dataSum.forEach(function(item, i, arr){
            if(item[0] <= sum && item[1] >= sum){
                row = i;
            }
        });
        //найти столбец (дни)
        dataPeriod.forEach(function(item, i, arr){
            if(item[0] <= periodInDays && item[1] >= periodInDays){
                column = i;
            }
        });
        if(row === undefined || column === undefined){
            res = 0;
        }else{
            //если это проценты
            if(data[row][column] < 20)
                res = sum * (data[row][column]/100);
            else
                res = data[row][column];
        }
        maxres = res*1.3;
        res = String(parseInt(res).toFixed(0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
        maxres = String(parseInt(maxres).toFixed(0)).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
        $('.calc-result-min').text(res);
        $('.calc-result-max').text(maxres);
    }
    function calcDays (value) {
        if($('.period-active').hasClass("days")){
            periodInDays = value;
        }else if($('.period-active').hasClass("months")){
            periodInDays = value * 30;
        }else{
            periodInDays = value;
        }
    }

    $('input[name="sum"]').on('change input', function(){
        calcPrice($(this).val());
    });

    $('input[name="period"]').on('change input', function(){
        var value = parseInt($(this).val());
        calcDays(value);
        calcPrice($('input[name="sum"]'));
    });




    $.datepicker.regional['ru'] = {
            closeText: 'Готово', // set a close button text
            currentText: 'Сегодня', // set today text
            monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'], // set month names
            monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'], // set short month names
            dayNames: ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'], // set days names
            dayNamesShort: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'], // set short day names
            dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'], // set more short days names
            dateFormat: 'dd.mm.yy', // set format date
            firstDay: 1
        };        
    $.datepicker.setDefaults($.datepicker.regional["ru"]);

    var dayStart,
        dayFinish,
        dayInterval = 0,
        from, to;
    var day = 24*60*60*1000;
    $( function() {
        var dateFormat = "dd.mm.yy";
          from = $( ".period-start" )
            .datepicker({
              changeMonth: true,
              minDate: 0
            })
            .on( "change", function() {
              to.datepicker( "option", "minDate", getDate( this ) );
              dayStart = getDate( this ).getTime();
              if(!!to.val()){
                dayInterval = Math.round(Math.abs(dayStart - dayFinish)/day);
              }else{
                dayInterval = 0;
              }
              calcDays(dayInterval);
              calcPrice();
              //console.log("periodInDays = "+periodInDays, "dayInterval = "+dayInterval, "dayStart = "+dayStart, "dayFinish = "+dayFinish);
            });
          to = $( ".period-finish" ).datepicker({
            changeMonth: true,
            minDate: 0
          })
          .on( "change", function() {
            from.datepicker( "option", "maxDate", getDate( this ) );
            dayFinish = getDate( this ).getTime();
            if(!!to.val()){
              dayInterval = Math.round(Math.abs(dayStart - dayFinish)/day);
            }else{
              dayInterval = 0;
            }
            calcDays(dayInterval);
            calcPrice();
            //console.log("periodInDays = "+periodInDays,"dayInterval = "+dayInterval, "dayStart = "+dayStart, "dayFinish = "+dayFinish);
          });
     
        function getDate( element ) {
          var date;
          try {
            date = $.datepicker.parseDate( dateFormat, element.value );
          } catch( error ) {
            date = null;
          }
     
          return date;
        }
    });

    $('input[name="dates"]').on('change input', function(){
        //рассчет по датам
        if($(this).prop('checked')){
            $('.period-datepicker').removeClass("hide");
            $('input[name="period"]').parent().addClass("hide");
            $('.period-start').val("");
            $('.period-finish').val("");
            $('.cost-result').text(0);
        }else{// по количеству дней
            $('.period-datepicker').addClass("hide");
            $('input[name="period"]').val(30).parent().removeClass("hide");
            $('.period-start').val("");
            $('.period-finish').val("");
            calcDays(30);
            calcPrice();
        }
    });




    

    $(document).on('click', function(event){
        var container = $('.cabinet-bubble');
        if ($(event.target).closest(".cabinet-bubble").length) 
            return;
        container.removeClass("bubble-active");
        event.stopPropagation();
    });
	// var myPlace = new google.maps.LatLng(55.754407, 37.625151);
 //    var myOptions = {
 //        zoom: 16,
 //        center: myPlace,
 //        mapTypeId: google.maps.MapTypeId.ROADMAP,
 //        disableDefaultUI: true,
 //        scrollwheel: false,
 //        zoomControl: true
 //    }
 //    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 

 //    var marker = new google.maps.Marker({
	//     position: myPlace,
	//     map: map,
	//     title: "Ярмарка вакансий и стажировок"
	// });

    //  var options = {
    //     $AutoPlay: true,                                
    //     $SlideDuration: 500,                            

    //     $BulletNavigatorOptions: {                      
    //         $Class: $JssorBulletNavigator$,             
    //         $ChanceToShow: 2,                           
    //         $AutoCenter: 1,                            
    //         $Steps: 1,                                  
    //         $Lanes: 1,                                  
    //         $SpacingX: 10,                              
    //         $SpacingY: 10,                              
    //         $Orientation: 1                             
    //     }
    // };

    // var jssor_slider1 = new $JssorSlider$("slider1_container", options);

});

