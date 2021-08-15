function calcPrice() {
  let price = 0.0;
  let dOne = document.querySelector(".checkIn").value;
  let dTwo = document.querySelector(".checkOut").value;

  let dateOne = new Date(dOne);
  let dateTwo = new Date(dTwo);
  const oneDay = 1000 * 60 * 60 * 24;
  let timeInMs = dateTwo.getTime() - dateOne.getTime();
  const diffInDays = Math.round(timeInMs / oneDay);

  let base = document.querySelector(".subPrice").innerHTML;
  let basePrice = parseFloat(base.substr(1, base.length));
  let subtotal = document.querySelector(".subPrice");
  let taxes = document.querySelector(".taxes");
  let total = document.querySelector(".totalPrice");

  subtotal.textContent = basePrice;
  taxes.textContent = basePrice;
  total.textContent = diffInDays;
}
