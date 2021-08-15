function calcPrice() {
  let dOne = document.querySelector(".checkIn").value;
  let dTwo = document.querySelector(".checkOut").value;

  let dateOne = new Date(dOne);
  let dateTwo = new Date(dTwo);
  const oneDay = 1000 * 60 * 60 * 24;
  let timeInMs = dateTwo.getTime() - dateOne.getTime();
  let diffInDays = parseFloat(Math.round(timeInMs / oneDay));
  let base = document.querySelector(".subPrice").value;
  let basePrice = parseFloat(base.replace("$", ""));
  let subtotal = document.querySelector(".subPrice");
  let sbtotal = document.querySelector(".sbtotal");
  let taxes = document.querySelector(".taxes");
  let total = document.querySelector(".totalPrice");

  let price = basePrice * diffInDays;
  let tx = basePrice * 0.13 * diffInDays;
  let ttl = basePrice * 0.13 * diffInDays + basePrice * diffInDays;
  if (dOne && dTwo) {
    sbtotal.value = "$" + price.toFixed(2);
    taxes.value = "$" + tx.toFixed(2);
    total.value = "$" + ttl.toFixed(2);
  }
}
