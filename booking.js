
document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.querySelector(".booking-form");

  if (!bookingForm) return;

  const whatsappNumber = "9647730905001";

  const messages = {
    en: {
      incomplete:
        "Please select your check-in, check-out dates and number of guests.",
      invalidDates: "Check-out date must be after the check-in date.",
      whatsapp:
        `Hello Luna Hotel,\n\n` +
        `I would like to check availability.\n\n` +
        `Check-in: {checkIn}\n` +
        `Check-out: {checkOut}\n` +
        `Guests: {guests}\n\n` +
        `Please let me know which rooms are available and the price.\n\n` +
        `Thank you.`
    },

    ku: {
      incomplete:
        "تکایە بەرواری هاتن، بەرواری ڕۆشتن و ژمارەی میوانەکان دیاری بکە.",
      invalidDates:
        "بەرواری ڕۆشتن دەبێت دوای بەرواری هاتن بێت.",
      whatsapp:
        `سڵاو لونا هۆتێل،\n\n` +
        `دەمەوێت بەردەستبوونی ژوورەکان بپشکنم.\n\n` +
        `بەرواری هاتن: {checkIn}\n` +
        `بەرواری ڕۆشتن: {checkOut}\n` +
        `ژمارەی میوان: {guests}\n\n` +
        `تکایە پێم بڵێن کام ژوور بەردەستە و نرخەکەی چەندە.\n\n` +
        `سوپاس.`
    },

    ar: {
      incomplete:
        "يرجى اختيار تاريخ تسجيل الوصول وتاريخ تسجيل المغادرة وعدد الضيوف.",
      invalidDates:
        "يجب أن يكون تاريخ تسجيل المغادرة بعد تاريخ تسجيل الوصول.",
      whatsapp:
        `مرحباً فندق لونا،\n\n` +
        `أود التحقق من توفر الغرف.\n\n` +
        `تسجيل الوصول: {checkIn}\n` +
        `تسجيل المغادرة: {checkOut}\n` +
        `عدد الضيوف: {guests}\n\n` +
        `يرجى إخباري بالغرف المتاحة وأسعارها.\n\n` +
        `شكراً لكم.`
    }
  };

  function getCurrentLanguage() {
    return localStorage.getItem("lunaHotelLanguage") || "en";
  }

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const language = getCurrentLanguage();
    const text = messages[language] || messages.en;

    const checkIn = document.querySelector("#check-in")?.value;
    const checkOut = document.querySelector("#check-out")?.value;
    const guests = document.querySelector("#guests")?.value;

    // Check required fields
    if (!checkIn || !checkOut || !guests) {
      alert(text.incomplete);
      return;
    }

    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      alert(text.invalidDates);
      return;
    }

    // Create WhatsApp message
    const whatsappMessage = text.whatsapp
      .replace("{checkIn}", checkIn)
      .replace("{checkOut}", checkOut)
      .replace("{guests}", guests);

    const whatsappURL =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`;

    window.open(whatsappURL, "_blank");
  });
});
