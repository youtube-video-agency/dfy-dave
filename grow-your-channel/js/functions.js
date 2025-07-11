$(document).ready(function(){

    $("#discount-code").on('click',function (){
        $("#discount-badge").hide();
        $("#coupon_code").val('');
        $('#couponMessage').hide();
        $('#couponSMessage').hide();
    })

    $("#amount").on('keyup',function (){
        $(".sub-total").html($(this).val());
        $("#new_amount").html($(this).val());
    })

    $(":radio[name=cctype]").click(function(){
        resetCCHightlight();
    });

    const tabCreditCard = document.getElementById('tab-credit-card');
    const tabPayPal = document.getElementById('tab-paypal');
    const creditCardBlock = document.getElementById('credit-card-block');
    const payPalBlock = document.getElementById('paypal-block');
    const cardTypes = document.getElementById('card-types');

    if(tabCreditCard && tabPayPal){
        tabCreditCard.addEventListener('click', function () {
            tabCreditCard.classList.add('active');
            tabPayPal.classList.remove('active');
            creditCardBlock.style.display = 'block';
            payPalBlock.style.display = 'none';
            $(":radio[value=PP]").prop("checked", false); // Uncheck PayPal radio button
        });

        tabPayPal.addEventListener('click', function () {
            tabCreditCard.classList.remove('active');
            tabPayPal.classList.add('active');
            creditCardBlock.style.display = 'none';
            payPalBlock.style.display = 'block';
            $(":radio[value=PP]").prop("checked", true); // Check PayPal radio button
        });
    }



    var cardExp = new Cleave('.cardExp', {
        date: true,
        datePattern: ['m', 'y']
    });


    $("#service").on('change',function (){
        let selected = $(this).find('option:selected')
        // console.log(selected.val());
        if(selected.val() !=''){
            $(".sub-total").html(selected.data('amount'));
            $("#new_amount").html(selected.data('amount'));
            checkCoupon(true);
        }
    })
    $("#remove_coupon").on('click',function (){
        $('#couponMessage').hide();
        $('#couponSMessage').hide();
        $("#coupon_code").val('');
        $("#discount-badge").hide();
        $("#service").trigger('change');
    })

    $("#service").trigger('change')
    // Initialize Cleave.js for the credit card input field
    var cleave = new Cleave('#ccn', {
        creditCard: true,
        onCreditCardTypeChanged: function (type) {
            // console.log(type);
            // Update the icon based on the card type
            const icon = document.querySelector('.cc-icon');
            icon.className = 'cc-icon'; // Reset the icon class

            switch (type) {
                case 'visa':
                    icon.classList.add('icon-cc-visa');
                    $(":radio[value=" + "V" + "]").prop("checked", true);
                    break;
                case 'mastercard':
                    icon.classList.add('icon-cc-mastercard');
                    $(":radio[value=" + "M" + "]").prop("checked", true);
                    break;
                case 'amex':
                    icon.classList.add('icon-cc-amex');
                    $(":radio[value=" + "A" + "]").prop("checked", true);
                    break;
                case 'discover':
                    icon.classList.add('icon-cc-discover');
                    $(":radio[value=" + "D" + "]").prop("checked", true);
                    break;
                case 'diners':
                    icon.classList.add('icon-cc-diners-club');
                    $(":radio[value=" + "DI" + "]").prop("checked", true);
                    break;
                case 'jcb':
                    icon.classList.add('icon-cc-jcb');
                    $(":radio[value=" + "J" + "]").prop("checked", true);
                    break;
                default:
                    // Default icon or none
                    icon.classList.add('icon-credit-card-alt');
                    $(":radio[name=cctype]").prop("checked", false);
                    break;
            }
        }
    });
});