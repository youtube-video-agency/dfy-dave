function isValidCardNumber (number)
{

    // Remove all non-digit characters from the input
    number = number.replace(/\D/g, '');

    // Check if the input is empty or contains non-digit characters
    if (!number) return false;

    let sum = 0;
    let shouldDouble = false;

    // Iterate through the credit card number from right to left
    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number.charAt(i));

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    // A valid credit card number will have a sum that is a multiple of 10
    return (sum % 10) === 0;
}

function isExpiryDate(dateStr) {
    const [month, year] = dateStr.split("/");

    const monthNumber = parseInt(month, 10);
    const yearNumber = parseInt(year, 10);
    // console.log(monthNumber);
    // console.log(yearNumber);
	let today = new Date();
	let expiry = new Date(yearNumber+2000, monthNumber);
	if (today.getTime() > expiry.getTime())	return false;
	else return true;
	}
function isNum(argvalue) {
	argvalue = argvalue.toString();
	
	if (argvalue.length == 0)
	return false;
	
	for (var n = 0; n < argvalue.length; n++)
	if (argvalue.substring(n, n+1) < "0" || argvalue.substring(n, n+1) > "9")
	return false;
	
	return true;
	}

function isDigit (c)
{
   var strAllowed = "1234567890";
   return (strAllowed.indexOf (c) != -1);
}

function isCardTypeCorrect (strNum, type)
{
   var nLen = 0;
   for (n = 0; n < strNum.length; n++)
   {
      if (isDigit (strNum.substring (n,n+1)))
         ++nLen;
   }
   
   if (type == 'V')
      return ((parseInt(strNum.substring(0, 1)) == 4) && (nLen == 13 || nLen == 16 || nLen == 19));
   else if (type == 'A')
      return ((parseInt(strNum.substring(0, 2)) == 34 || parseInt(strNum.substring(0, 2)) == 37) 
            && nLen == 15);
   else if (type == 'M')
      return (((parseInt(strNum.substring(0, 4)) >= 2221 && parseInt(strNum.substring(0, 4)) <= 2720)
            || (parseInt(strNum.substring(0, 2)) >= 51 && parseInt(strNum.substring(0, 2)) <= 55)) 
            && nLen == 16);
	else if (type == 'D') //discover
      return ( ((parseInt(strNum.substring(0, 4)) == 6011) 
            || (parseInt(strNum.substring(0, 3)) >= 644 && parseInt(strNum.substring(0, 3)) <= 649) 
            || (parseInt(strNum.substring(0, 2)) == 65)) 
            && nLen == 16);
   else if(type == 'DI') //diners
      return (((parseInt(strNum.substring(0, 3)) >= 300 && parseInt(strNum.substring(0, 3)) <= 305) 
            || (parseInt(strNum.substring(0, 3)) == 309)
            || (parseInt(strNum.substring(0, 2)) == 36 || parseInt(strNum.substring(0, 2)) == 38 || parseInt(strNum.substring(0, 2)) == 39)) 
            && nLen == 14);
   else if (type == 'J')
        return (parseInt(strNum.substring(0, 4)) == 35 && nLen == 16);
    else
      return false;

}

function highlightCard(strNum){

    if((parseInt(strNum.substring(0, 1)) == 4)){
        return "V";
    } else if((parseInt(strNum.substring(0, 2)) == 34 || parseInt(strNum.substring(0, 2)) == 37)){
        return "A";
    } else if(((parseInt(strNum.substring(0, 4)) >= 2221 && parseInt(strNum.substring(0, 4)) <= 2720)
            || (parseInt(strNum.substring(0, 2)) >= 51 && parseInt(strNum.substring(0, 2)) <= 55))){
        return "M";
    } else if(((parseInt(strNum.substring(0, 4)) == 6011) 
            || (parseInt(strNum.substring(0, 3)) >= 644 && parseInt(strNum.substring(0, 3)) <= 649) 
            || (parseInt(strNum.substring(0, 2)) == 65))){
        return "D";
    } else if(((parseInt(strNum.substring(0, 3)) >= 300 && parseInt(strNum.substring(0, 3)) <= 305) 
        || (parseInt(strNum.substring(0, 3)) == 309)
        || (parseInt(strNum.substring(0, 2)) == 36 || parseInt(strNum.substring(0, 2)) == 38 || parseInt(strNum.substring(0, 2)) == 39))){
        return "DI";
    } else  if (parseInt(strNum.substring(0, 2)) == 35) {
        return "J";
    } else {
        return false;
    }
}

function resetCCHightlight(){
    selectedCard = "";
}

function previewCCResult(strNum){
    if(isValidCardNumber(strNum) && strNum.length>13){
        $(".ccresult").html("");
    } else {
        $(".ccresult").html("<span class='error'>Invalid Number</span>");
    }
}